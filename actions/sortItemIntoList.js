import inquirer from 'inquirer';
import { promptPause } from '../utils';

export default async function sortItemIntoList(itemToSort, sorted) {
  let currentSortIndex = Math.floor(sorted.length / 2);
  let direction = null;

  while (true) {
    const itemToCompare = sorted[currentSortIndex];

    if (itemToCompare === undefined) {
      break;
    }

    const { better } = await inquirer.prompt({
      name: 'better',
      type: 'list',
      message: `Is "${itemToSort}" better than "${itemToCompare}"?`,
      choices: [
        { name: 'yes', value: 1 },
        { name: 'no', value: -1 },
        { name: 'not sure', value: undefined },
        { name: 'exit', value: 'exit' },
      ],
    });

    if (better === 'exit') {
      return sorted;
    }
    if (direction === -better) {
      break;
    }

    direction = better;
    currentSortIndex -= (better || -1);
  }

  const finalIndex = currentSortIndex + (direction === 1 ? 1 : 0);

  console.log(`"${itemToSort}" is now rank: ${finalIndex + 1}!`);
  await promptPause();

  return [...sorted.slice(0, finalIndex), itemToSort, ...sorted.slice(finalIndex)];
}
