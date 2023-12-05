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
