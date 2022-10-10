import figlet from 'figlet';
import emojiRegex from 'emoji-regex';
import chalk from 'chalk';

export const showSuccessMessage = (
  emoji: string,
  projectName: string,
  packageManager: string
) => {
  const message = 'Pure Liquid';
  const isEmoji = emojiRegex().exec(emoji);

  if (!isEmoji || !projectName) {
    throw new Error('Please pass emoji and projectName as argument');
  }
  const decoration = emoji.repeat(30);
  figlet(message, (_, result) => {
    console.log(decoration);
    console.log(result);
    console.log(decoration);
    console.log(
      chalk.blue(
        '\nYou are ready to develop! Follow the following commands to start.\n'
      )
    );
    console.log(
      chalk.green(
        `cd ${projectName} && ${packageManager} run build && ${packageManager} run start\n`
      )
    );
  });
  return true;
};
