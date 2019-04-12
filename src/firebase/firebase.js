import * as firebase from 'firebase'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
}

firebase.initializeApp(config)

const database = firebase.database()

export { firebase, database as default }

// // child_removed
// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (anythingYouWant) => {
//   console.log(anythingYouWant.key, anythingYouWant.val());
// });

// database.ref('expenses').on('child_added', (moreExperimentation) => {
//   console.log(moreExperimentation.key, moreExperimentation.val());
// });

// database.ref('expenses')
//   .on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val(),
//       });
//     });
//     console.log(expenses);
//   }, (e) => {
//     console.log('something went wrong', e);
//   });

// setTimeout(() => {
//   database.ref('expenses').push({
//     description: 'Food',
//     note: 'yum yums',
//     amount: 400,
//     createdAt: 18000,
//   });
// }, 3000);

// use one

// database.ref('notes').push({
//   title: 'Course Topic',
//   body: 'Python, Angular, React Native',
// });

// const firebaseNotes = {
//   notes: {
//     wertyu: {
//       title: 'First note',
//       body: 'This is my note',
//     },
//     fioqhwe: {
//       title: 'Another note',
//       body: 'This is my note',
//     },
//   },
// };

// database.ref('notes').set();

// set up data subscription => Olumide is a Doctor at Google.
// database.ref().on('value', (snapshot) => {
//   const data = snapshot.val();
//   const { name, job } = data;
//   const { title, company } = job;
//   console.log(`${name} is a ${title} at ${company}`);
// }, (err) => {
//   console.log(`Error fetching data: ${err}`);
// });

// change the data and make sure it reprints

// database.ref('location/city')
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch((e) => {
//     console.log(`Error fetching data: ${e}`);
//   });

// database.ref().set({
//   name: 'Olumide Adebambo',
//   age: 25,
//   stressLevel: 6,
//   job: {
//     title: 'Doctor',
//     company: 'Google',
//   },
//   location: {
//     city: 'Stoke-on-Trent',
//     country: 'England',
//   }
// }).then(() => {
//   console.log('Data is saved');
// }).catch((err) => {
//   console.log(`This failed. ${err}`);
// });

// database.ref('isSingle').set(null)
//   .then(() => {
//     console.log('Data removed');
//   })
//   .catch((err) => {
//     console.log(`Failed with error: ${err}`);
//   });

// database.ref('attributes').set({
//   height: 190, weight: 79
// }).then(() => {
//   console.log('data saved: challenge');
// }).catch(err => {
//   console.log(`This failed. ${err}`);
// });

// database.ref('isSingle').remove()
//   .then(() => {
//     console.log('Remove succeeded');
//   })
//   .catch((err) => {
//     console.log('Remove failed: ' + err);
//   });
