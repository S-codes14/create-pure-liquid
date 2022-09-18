#!/usr/bin/env node
import { execSync } from 'child_process';
import { showSuccessMessage } from './helper/showSuccessMessage';

const runCommand = (command: string) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};

const projectName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/Kazuki-tam/pure-liquid.git ${projectName}`;
const installCommand = `cd ${projectName} && yarn install`;

console.log(`Cloning the repository with name ${projectName}`);

const checkOut = runCommand(gitCheckoutCommand);
if (!checkOut) process.exit();

console.log(`Installing dependencies for ${projectName}`);
const installedDeps = runCommand(installCommand);
if (!installedDeps) process.exit();

showSuccessMessage('💧', projectName);
