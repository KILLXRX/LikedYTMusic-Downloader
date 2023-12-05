const puppeteer = require('puppeteer');
const utilities = require('./functions/utilities')

if (process.platform === 'win32') {
    console.log('Running on Windows');
  } else {
    process.exit(0)
}

