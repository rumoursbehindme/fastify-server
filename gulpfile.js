const { src, dest, series, task } = require('gulp');
const { existsSync } = require('fs');
const { rimraf } = require('rimraf');
const { exec } = require('node:child_process');
const { once } = require('events');
const util = require('node:util');
const execAsync = util.promisify(exec);
const JavaScriptObfuscator = require('javascript-obfuscator');
const normalizePath = require('normalize-path');
const glob = require('fast-glob');
const path = require('path');
const { readFile, writeFile } = require('node:fs/promises');

const destination = './dest';

const generateLog = (msg) => {
    console.log(msg);
};

async function doSrcToDest(from, to) {
    const stream = src(from).pipe(dest(to));
    await once(stream, 'end');
}

const removeFolder = async (folderPath) => {
    generateLog(`Deleting the contents of ${folderPath} folder`);
    if (existsSync(folderPath)) {
        await rimraf(folderPath);
    }
};

task('removing-dist-folder', async () => {
    await removeFolder(destination);
});

task('remove-build-folder', async () => {
    await removeFolder('./build')
})

task('transpiling-src', (cb) => {
    generateLog('Transpiling Source code');
    exec('yarn tsc', (err, stdout) => {
        console.log(stdout);
        cb(err);
    });
});

task('obfuscation', async () => {
    const buildFiles = await glob(normalizePath(path.join(process.cwd(), 'build/**/*.js')))

    const promiseArray = buildFiles.map(async (filePath) => {
        const originalCode = await readFile(filePath, 'utf-8');
        const obfuscatedCode = JavaScriptObfuscator.obfuscate(originalCode, {
            compact: true, // Make the obfuscated code more compact
            controlFlowFlattening: true, // Enable control flow flattening
            controlFlowFlatteningThreshold: 0.75, // Adjust the control flow flattening threshold
            stringArray: true, // Enable string array obfuscation
            // stringArrayEncoding: 'base64', // Use base64 encoding for string array
            rotateStringArray: true, // Enable string array rotation
            identifierNamesGenerator: 'hexadecimal' // Use hexadecimal names for identifiers
        });
        generateLog(`Obfuscated ${filePath} file`);
        return writeFile(filePath, obfuscatedCode.getObfuscatedCode(), 'utf8');
    });
    await Promise.all(promiseArray);
});

task('install-node-modules-production', async () => {
    generateLog('installing node modules in production mode');

    await doSrcToDest(['package.json', 'yarn.lock'], destination);

    const { err, stdout } = await execAsync('yarn --production', { cwd: destination });
    console.log(stdout);
    if (err) {
        throw err;
    }
});

task('copying-config-files', async () => {
    generateLog('Copying the config files');
    await doSrcToDest(['./config/**'], destination + '/config');
});

task('copying-public-files', async () => {
    generateLog('Copying the public files');
    await doSrcToDest('./public/**', destination + '/public');
});

task('copying-obfuscated-build-files', async () => {
    generateLog('Copying the build files');
    await doSrcToDest('./build/**', destination + '/build');
});

task('clean-up', async () => {
    await removeFolder(destination + '/.yarn');
    await removeFolder(destination + '/package.json');
    await removeFolder(destination + '/yarn.lock');
});

exports.default = series(
    'removing-dist-folder',
    'remove-build-folder',
    'transpiling-src',
    'obfuscation',
    'install-node-modules-production',
    'copying-config-files',
    'copying-public-files',
    'copying-obfuscated-build-files',
    'clean-up'
)
