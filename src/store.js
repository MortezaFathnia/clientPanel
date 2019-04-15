import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//Reducers
//@todo

const firebaseConfig = {
  apiKey: 'AIzaSyD_g-rxGcJZSg35DsGNSfcVr9solh74K5o',
  authDomain: 'reactclientpanel-dce3b.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-dce3b.firebaseio.com',
  projectId: 'reactclientpanel-dce3b',
  storageBucket: 'reactclientpanel-dce3b.appspot.com',
  messagingSenderId: '679072614731'
};

//react redux firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
// const firestore = firebase.firestore;

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

//Create initial state
const initialState = {};

//Create Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENTION__ && window.__Redux_DEVTOOLS_EXTENTION__()
  )
);

export default store;
