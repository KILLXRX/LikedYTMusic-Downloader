const BROWSERS = require('./browsers.json')
const Registry = require('winreg');
const puppeteer = require('puppeteer');

function find_browser(progid){
    BROWSERS.forEach((browser) => {
        if(browser.progid == progid){
            return browser
        }
    })
    return null
}

function getProgId(){
    const key = new Registry({
        hive: Registry.HKCU, // HKEY_CURRENT_USER
        key: '\\Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice',
    });
    if(key == null){return null}
    progid = key.get("ProgId", (err, item) => {
        if (err) {
          console.error(err);
          return null
        } else {
          return item.value
        }
    });
}

function get_default_browser(){
    const progid = getProgId()
    let browser = (progid != null) ? find_browser(progid.split(".")[0]) : null
    const key = (progid != null) ? new Registry({
        hive: Registry.HKCR,
        key: `\\${progid}`,
    }) : null
    if(progid == null){throw "Can't find default browser"}
    if(browser == null){throw "Unsupported Browser!"}
    if(key == null){throw "Can't find browser command"}
    
    browser["path"] = key.get("ApplicationIcon", (err, item) => {
        if (err) {
          console.error(err);
          return null
        } else {
          return item.value.split(',')[0]
        }
    });
    return browser
}
