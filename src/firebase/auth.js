import auth from './config';

// Sign Up
export const signUp = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Log In
export const logIn = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Log In Anonymously
export const logInAnonymous = () =>
  auth.signInAnonymously();

// Log out
export const logOut = () =>
  auth.signOut();

// Password Reset
export const resetPass = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const updatePass = (password) =>
  auth.currentUser.updatePassword(password);

// Authentication Change
export const authStateChanged = (user) => auth.onAuthStateChanged(user);
