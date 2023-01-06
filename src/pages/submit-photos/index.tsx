import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite";
import { ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { AuthContext } from "../../context/AuthContext";
import { db, storage } from "../../firebase";

const uppy = new Uppy({
  restrictions: {
    allowedFileTypes: ["image/*"],
  },
});

const Uploader = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const completeHandler = async (result: any) => {
      console.log("successful files:", result.successful);
      console.log("failed files:", result.failed);

      const imagesFromUppy = result.successful.map(
        (image: { data: File }) => image.data
      );

      if (user && user !== "loading") {
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("uid", "==", user.uid));
        const userSnapshot = await getDocs(userQuery);
        const userDoc = userSnapshot.docs[0];

        const imageUploadPromises = imagesFromUppy.map(async (image: File) => {
          const uniqueID = uuidv4();
          const imageName = `${user.uid}_${uniqueID}`;

          const imageStorageRef = ref(storage, imageName);
          const imageDocumentRef = doc(db, "images", imageName);

          await uploadBytes(imageStorageRef, image);

          if (userDoc) {
            await setDoc(imageDocumentRef, {
              uid: user.uid,
              username: userDoc.data().username,
              firstName: userDoc.data().firstName,
              lastName: userDoc.data().lastName,
              url: `https://firebasestorage.googleapis.com/v0/b/viewfinder-dev.appspot.com/o/${imageName}?alt=media`,
              createdAt: new Date(),
            });
          }
        });

        await Promise.all(imageUploadPromises);

        uppy.cancelAll();

        router.push(`/${user.username}`);
      }
    };

    uppy.on("complete", completeHandler);

    return () => {
      uppy.off("complete", completeHandler);
    };
  }, [router, user]);

  return (
    <>
      <Dashboard uppy={uppy} proudlyDisplayPoweredByUppy={false} />
    </>
  );
};

export default Uploader;
