import * as functions from 'firebase-functions';

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

export const createUserDocument = functions.auth.user().onCreate((user) => {
  db.collection('users').doc(user.uid).set({
    uid: user.uid,
  });
});

export const deleteUserDocument = functions.auth.user().onDelete((user) => {
  db.collection('users').doc(user.uid).delete();
});
