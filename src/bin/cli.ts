#!/usr/bin/env node
import { execSync } from 'child_process';
import { showSuccessMessage } from './helper/showSuccessMessage';
import * as readline from 'readline';

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
let packageManager = 'yarn';
const gitCheckoutCommand = `git clone --depth 1 https://github.com/Kazuki-tam/pure-liquid.git ${projectName}`;

console.log(`Cloning the repository with name ${projectName}`);

const checkOut = runCommand(gitCheckoutCommand);
if (!checkOut) process.exit();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'What package manager do you want to use?(type: npm or yarn or pnpm) ',
  (input) => {
    if (
      input.toLocaleLowerCase() == 'npm' ||
      input.toLocaleLowerCase() == 'pnpm'
    )
      packageManager = input.toLocaleLowerCase();
    console.log(
      `Installing dependencies for ${projectName} using ${packageManager}`
    );
    const installCommand = `cd ${projectName} && rm -rf yarn.lock && ${packageManager} install`;
    const installedDeps = runCommand(installCommand);
    if (!installedDeps) process.exit();
    rl.close();
  }
);
rl.on('close', () => {
  showSuccessMessage('💧', projectName, packageManager);
});
