import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAD75HDYlHVkDSZudAdJ2ThkkdJuUe40PA",
  authDomain: "countingcounter-webapp.firebaseapp.com",
  databaseURL: "https://countingcounter-webapp.firebaseio.com",
  projectId: "countingcounter-webapp",
  storageBucket: "countingcounter-webapp.appspot.com",
  messagingSenderId: "1085275132993"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase.auth()