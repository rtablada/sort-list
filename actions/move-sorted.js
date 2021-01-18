import { clear } from 'console';
import inquirer from 'inquirer';
import { promptPause, readData, writeData } from '../utils';
import sortItemIntoList from './sortItemIntoList';

export default async function moveSorted() {
  const { sorted, unsorted } = await readData();

  if (sorted.length === 0) {
    console.log('The list is empty!');

    return await promptPause();
  }

  clear();
  const { itemToSort } = await inquirer.prompt({
    name: 'itemToSort',
    message: 'Which item do you want to move?',
    type: 'list',
    choices: sorted,
  });
  clear();

  if (itemToSort === undefined) {
    return await promptPause();
  }

  const alreadySorted = sorted.filter((u) => u !== itemToSort);

  const newSorted = await sortItemIntoList(itemToSort, alreadySorted);

  return await writeData({ sorted: newSorted, unsorted });
}
