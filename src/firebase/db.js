import * as firebase from 'firebase';

const db = firebase.database();

// User API
export const createUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const getUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...
