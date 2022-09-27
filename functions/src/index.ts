import * as functions from 'firebase-functions';

const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

export const deleteUserDoc = functions.auth.user().onDelete((user) => {
  db.collection('users').doc(user.uid).delete();
});

export const createImageDoc = functions.storage
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

export const deleteImageDoc = functions.storage.object().onDelete((object) => {
  const { name } = object;
  db.collection('images').doc(name).delete();
});
