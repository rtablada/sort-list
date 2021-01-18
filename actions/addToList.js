import inquirer from 'inquirer';
import { readData, writeData } from '../utils';

export default async function addToList() {
  const { itemName } = await inquirer.prompt({
    name: 'itemName',
    message: 'What do you want to add to the list?',
    type: 'input',
  });

  const data = await readData();

  data.unsorted = [...data.unsorted, itemName];
  await writeData(data);
}
