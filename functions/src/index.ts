import * as functions from 'firebase-functions';

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

export const createUserDocument = functions.auth.user().onCreate((user) => {
  db.collection('users').doc(user.uid).set({
    uid: user.uid,
    accountType: 'viewer',
  });
});

export const deleteUserDocument = functions.auth.user().onDelete((user) => {
  db.collection('users').doc(user.uid).delete();
});

export const createImageDocument = functions.storage
  .object()
  .onFinalize((object) => {
    const { name, bucket } = object;
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${name}?alt=media`;
    const uid = name!.split('_')[0];

    db.collection('images').doc(name).set({
      uid,
      url,
    });
  });

export const deleteImageDocument = functions.storage
  .object()
  .onDelete((object) => {
    const { name } = object;
    db.collection('images').doc(name).delete();
  });
