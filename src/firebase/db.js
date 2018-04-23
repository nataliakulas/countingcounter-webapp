import * as firebase from 'firebase';

const db = firebase.database();

// User API
export const createUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

// Counter API
export const createCounter = (name, timestamp, uid) => {
  const id = db.ref().child('counters').push().key;

  if (id) {
    db.ref(`counters/${id}`).set({
      name,
      timestamp,
      uid
    })
  }
};

export const getCounters = () =>
  db.ref(`counters`).once('value');

// export const getCounter = (id) =>
