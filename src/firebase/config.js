import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD_-Y17VieV-L1PgaxsLBG3wHCPNzyW__o",
    authDomain: "cooking-ninja-4fb47.firebaseapp.com",
    projectId: "cooking-ninja-4fb47",
    storageBucket: "cooking-ninja-4fb47.appspot.com",
    messagingSenderId: "29252073628",
    appId: "1:29252073628:web:d0fec2be2366e1063c1559"
  };

  //init firebase

  firebase.initializeApp(firebaseConfig)

  //init services

  const projectFirestore = firebase.firestore()

  export { projectFirestore } 
