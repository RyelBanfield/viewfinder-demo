import { ref, uploadBytes } from 'firebase/storage';
import { NextPage } from 'next';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { AuthContext } from '../../context/AuthContext';
import { storage } from '../../firebase';

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
      files.forEach(async (image) => {
        const imageRef = ref(
          storage,
          `images/${user!.uid}/${Date.now()}_${image.name}`,
        );
        await uploadBytes(imageRef, image);
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
