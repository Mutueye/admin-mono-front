/* eslint-disable @typescript-eslint/no-var-requires */
const tarball = require('@qst-admin/tarball');
const packageJson = require('./package.json');

const version = packageJson.version;
const appName = packageJson.name;

tarball({ appName, version, fileList: [`./dist`], targetDir: '../../' });
