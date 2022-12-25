import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

const db = admin.firestore();

export const deleteUserDoc = functions.auth.user().onDelete((user) => {
  db.collection("users").doc(user.uid).delete();
});

export const deleteImageDoc = functions.storage.object().onDelete((object) => {
  const { name } = object as { name: string };
  db.collection("images").doc(name).delete();
});
