import inquirer from 'inquirer';
import { clear } from 'console';
import addToList from './actions/addToList';
import listData from './actions/listData';
import rankUnsorted from './actions/rank-unsorted';
import moveSorted from './actions/move-sorted';

async function mainMenu() {
  const { menuOption } = await inquirer.prompt({
    type: 'list',
    name: 'menuOption',
    message: 'What do you want to do',
    choices: [
      {
        name: 'Show List Status',
        value: listData,
      },
      {
        name: 'Add to list',
        value: addToList,
      },
      {
        name: 'Rank unsorted items',
        value: rankUnsorted,
      },
      {
        name: 'Move sorted items',
        value: moveSorted,
      },
      {
        name: 'Exit',
        value: () => process.exit(0),
      },
    ],
  });

  await menuOption();
}

async function main() {
  clear();

  while (true) {
    await mainMenu();
  }
}

main();
