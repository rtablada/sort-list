import { clear } from 'console';
import { readFile as readFileNative, writeFile as writeFileNative } from 'fs';
import { promisify } from 'util';
import inquirer from 'inquirer';

export const readFile = promisify(readFileNative);
const writeFile = promisify(writeFileNative);

export async function readData() {
  const str = await readFile('./data.json');

  return JSON.parse(str);
}

export async function writeData(data) {
  await writeFile('./data.json', JSON.stringify(data, null, 2));
}

export async function promptPause() {
  await inquirer.prompt({
    name: 'continue',
    message: 'Press enter to continue...',
    type: 'input',
  });
  clear();
}
