const cprocess = require('child_process');
const cosmos = require('cosmos-lib');
const fs = require('fs');
const path = require('path');
const util = require('util');
const os = require('os');
const logger = require('../common/logger');
const config = require('./config');

function resolveTilde (filePath) {
    if (!filePath || typeof (filePath) !== 'string') {
        return '';
    }
    // '~/folder/path' or '~'
    if (filePath[0] === '~' && (filePath[1] === '/' || filePath.length === 1)) {
        return filePath.replace('~', os.homedir());
    }
    return filePath;
}

const processSpawn = util.promisify(cprocess.exec);

async function sleep (time) {
    await new Promise((resolve) => {
        setTimeout(() => resolve(true), time);
    });
}

/**
 * @returns string
 */
async function executeCommand (cmd, toJson = true) {
    // todo timeout

    const addJsonOutput = toJson ? ' --output json' : '';

    logger.info(`Executing cmd : ${cmd}${addJsonOutput}"`);
    const result = await processSpawn(`${cmd}${addJsonOutput}"`);
    return result.stdout;
}

const promiseReadFile = util.promisify(fs.readFile);
const promiseWriteFile = util.promisify(fs.writeFile);

async function writeFile (filePath, data) {
    return promiseWriteFile(resolveTilde(filePath), data);

    // yield promiseReadFile(filePath);
}

async function readFile (filePath) {
    return promiseReadFile(resolveTilde(filePath));
}

/**
 * Checksum the recipient address.
 */
function isValidCosmosAddress (recipient) {
    if (!recipient || !recipient.startsWith(config.bech32prefix)) {
        return false;
    }
    try {
        cosmos.address.getBytes32(recipient);
        return true;
    } catch (error) {
        logger.error(error);
    }
    return false;
}

module.exports = {
    executeCommand, sleep, readFile, writeFile, isValidCosmosAddress
};
