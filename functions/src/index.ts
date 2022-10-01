import * as functions from 'firebase-functions';

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

export const deleteUserDoc = functions.auth.user().onDelete((user) => {
  db.collection('users').doc(user.uid).delete();
});

export const deleteImageDoc = functions.storage.object().onDelete((object) => {
  const { name } = object;
  db.collection('images').doc(name).delete();
});
