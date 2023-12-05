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


