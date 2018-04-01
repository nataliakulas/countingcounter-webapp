import * as firebase from 'firebase';

const db = firebase.database();

// User API
export const createUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

// Counter API
export const createCounter = (id, name, time, user) =>
  db.ref(`counters/${id}`).set({
    name,
    time,
    user
  });
