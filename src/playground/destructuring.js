/**
 * Object Destructuring
 */

// const aurelionSol = {
//   name: 'Aurelion Sol',
//   title: 'The Star Forger',
//   stats: {
//     health: 562,
//     mana: 350,
//   },
// };

// const { name = 'Anon', title } = aurelionSol;
// console.log(`${name}, ${title}`);

// const { health, mana: magic } = aurelionSol.stats;
// if (health && magic) {
//   console.log(`${name} has ${health} health and ${magic} mana`);
// }

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin',
//   },
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName);

/**
 * Array Destructuring
 */

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
// const [, city, state = 'New York'] = address;
// console.log(`You are in ${city}, ${state}.`);

const item = ['Caffe Mocha', '£2.60', '£2.90', '£3.25']
const [drink, , mPrice] = item
console.log(`A medium ${drink} costs ${mPrice}`)
