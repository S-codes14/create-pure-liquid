#!/usr/bin/env node
const figlet = require('figlet');
const emojiRegex = require('emoji-regex');
const chalk = require("chalk");
const {execSync} = require('child_process');

const myOriginalLibrary = (emoji) => {
  const message = 'Pure Liquid';
  const isEmoji = emojiRegex().exec(emoji);

  if (isEmoji) {
    const decoration = emoji.repeat(30);

    figlet(message, (_, result) => {
      console.log(decoration);
      console.log(result);
      console.log(decoration);
      console.log(chalk.blue("\nYou are ready to develop! Follow thw following commands to start.\n"));
      console.log(chalk.green(`cd ${projectName} && yarn start\n`));
    });

    return 'OK';
  }

  throw new Error(`
    ❌ Please pass emoji as argument
    👉 ex) myOriginalLibrary('💧');
  `);
};

const runCommand = command => {
  try {
    execSync(`${command}`, {stdio: 'inherit'});
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
}

const projectName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/Kazuki-tam/pure-liquid.git ${projectName}`;
const installCommand = `cd ${projectName} && yarn install`;

console.log(`Cloning the repository with name ${projectName}`);

const checkOut = runCommand(gitCheckoutCommand);
if (!checkOut) process.exit(code,-1);

console.log(`Installing dependencies for ${projectName}`);
const installedDeps = runCommand(installCommand);
if (!installedDeps) process.exit(code,-1);

myOriginalLibrary('💧');
