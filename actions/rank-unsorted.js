import { clear } from 'console';
import inquirer from 'inquirer';
import { promptPause, readData, writeData } from '../utils';
import sortItemIntoList from './sortItemIntoList';

export default async function sortList() {
  const { sorted, unsorted } = await readData();

  if (unsorted.length === 0) {
    console.log('The list is already sorted!');

    return await promptPause();
  }

  if (sorted.length === 0) {
    const [firstItem, ...rest] = unsorted;

    await writeData({ sorted: [firstItem], unsorted: rest });

    return await sortList();
  }

  clear();
  const { itemToSort } = await inquirer.prompt({
    name: 'itemToSort',
    message: 'Which item do you want to rank?',
    type: 'list',
    choices: unsorted,
  });
  clear();

  if (itemToSort === undefined) {
    return await promptPause();
  }

  const newUnsorted = unsorted.filter((u) => u !== itemToSort);

  const newSorted = await sortItemIntoList(itemToSort, sorted);

  return await writeData({ sorted: newSorted, unsorted: newUnsorted });
}
