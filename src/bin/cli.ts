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
//solution 1 is to have another argument e.g
// packageManager = process.argv[3]   // where users type in npm or yarn or pnpm but the default will be yarn
// solution 2 is to actually ask the user what package manager they want to use where users type in npm or yarn or pnpm but the default will be yarn e.g
// const packageManager = prompt("What package manager do you want to use? ");

const gitCheckoutCommand = `git clone --depth 1 https://github.com/Kazuki-tam/pure-liquid.git ${projectName}`;

const installCommand = `cd ${projectName} && yarn install`;
// const installCommand = `cd ${projectName} && rm -rf yarn.lock && ${packageManager} install`;



console.log(`Cloning the repository with name ${projectName}`);

const checkOut = runCommand(gitCheckoutCommand);
if (!checkOut) process.exit();

console.log(`Installing dependencies for ${projectName}`);
const installedDeps = runCommand(installCommand);
if (!installedDeps) process.exit();

showSuccessMessage('💧', projectName);
