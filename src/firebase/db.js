import * as firebase from 'firebase';

const db = firebase.database();

// User API
export const createUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

// Counter API
export const createCounter = (name, time, uid) => {
  const id = db.ref().child('counters').push().key;

  if (id) {
    db.ref(`counters/${id}`).set({
      name,
      time,
      uid
    })
  }
};

export const getCounter = () =>
  db.ref(`counters`).once('value');
