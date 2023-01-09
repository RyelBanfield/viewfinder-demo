import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore/lite";

import { ImageType } from "../types";

const buildImageObjects = (imageDocuments: QuerySnapshot) => {
  return imageDocuments.docs.map((doc: QueryDocumentSnapshot) => {
    return {
      id: doc.id,
      uid: doc.data().uid,
      username: doc.data().username,
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      url: doc
        .data()
        .url.replace(
          "https://firebasestorage.googleapis.com",
          "https://ik.imagekit.io/zuge4mgxf"
        ),
      createdAt: doc.data().createdAt,
    };
  }) as ImageType[];
};

export default buildImageObjects;
