import { readData, promptPause } from '../utils';

export default async function listData() {
  const data = await readData();

  console.log('The list currently stands:');

  console.log(data.sorted.map((item, index) => `${index + 1}. "${item}`).join('\n'));

  if (data.unsorted.length) {
    console.log(`\n\nThere are still ${data.unsorted.length} items left to rank!`);
    console.log(data.unsorted.map((item, index) => `* "${item}`).join('\n'));
  }

  await promptPause();
}
