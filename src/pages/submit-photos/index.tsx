import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore/lite';
import { ref, uploadBytes } from 'firebase/storage';
import { NextPage } from 'next';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';

import { AuthContext } from '../../context/AuthContext';
import { db, storage } from '../../firebase';

type FileWithPreview = File & { preview: string };

const SubmitPhotos: NextPage = () => {
  const user = useContext(AuthContext);
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 9,

    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name} className="relative h-36 w-36">
      <Image
        src={file.preview}
        alt={file.name}
        layout="fill"
        objectFit="cover"
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  useEffect(
    () => () => files.forEach((file) => URL.revokeObjectURL(file.preview)),
    [],
  );

  const handleImageUpload = async () => {
    if (files.length > 0) {
      const usersRef = collection(db, 'users');
      const userQuery = query(usersRef, where('uid', '==', user!.uid));
      const userSnapshot = await getDocs(userQuery);
      const userDoc = userSnapshot.docs[0];

      files.forEach(async (image) => {
        const uniqueID = uuidv4();
        const imageName = `${user!.uid}_${uniqueID}`;

        const imageStorageRef = ref(storage, imageName);
        const imageDocumentRef = doc(db, 'images', imageName);

        await uploadBytes(imageStorageRef, image);
        await setDoc(imageDocumentRef, {
          uid: user!.uid,
          username: userDoc.data().username,
          firstName: userDoc.data().firstName,
          lastName: userDoc.data().lastName,
          url: `https://firebasestorage.googleapis.com/v0/b/viewfinder-dev.appspot.com/o/${imageName}?alt=media`,
        });
      });
      alert('Upload successful!');
    }
  };

  return (
    <main className="m-3 flex flex-grow flex-col items-center justify-center border-2 border-dotted border-neutral-900 p-3">
      <div
        className="flex w-full flex-grow items-center justify-center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p className="text-center text-xl">
          Drag and drop up to 9 images or{' '}
          <span className="cursor-pointer font-bold">Browse</span> to choose a
          file
        </p>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-4">{thumbs}</div>
      <button
        type="button"
        className="m-3 ml-auto rounded-md border-2 bg-neutral-200 p-2 hover:bg-neutral-300 focus:outline-none"
        onClick={handleImageUpload}
      >
        Submit to Viewfinder
      </button>
    </main>
  );
};

export default SubmitPhotos;
