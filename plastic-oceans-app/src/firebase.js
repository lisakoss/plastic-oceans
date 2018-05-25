import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyARk0V2zLTbb5TtSbKEiHx7g-yI6Cf2i80",
    authDomain: "plastic-oceans.firebaseapp.com",
    databaseURL: "https://plastic-oceans.firebaseio.com",
    projectId: "plastic-oceans",
    storageBucket: "plastic-oceans.appspot.com",
    messagingSenderId: "244318961535"
  };
firebase.initializeApp(config);
export const auth = firebase.auth();
export default firebase;