import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/future/image';
import { useEffect, useState } from 'react';

import { db } from '../firebase';

const Gallery = () => {
  const [imagesToRender, setImagesToRender] = useState<[] | null>(null);

  useEffect(() => {
    const getImages = async () => {
      const imageData: any = [];
      const querySnapshot = await getDocs(collection(db, 'images'));
      querySnapshot.forEach((doc) => {
        imageData.push(
          doc
            .data()
            .url.replace(
              'https://firebasestorage.googleapis.com',
              'https://ik.imagekit.io/zuge4mgxf',
            ),
        );
      });
      setImagesToRender(imageData);
    };

    getImages();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:px-3 md:grid-cols-3 lg:grid-cols-4">
      {imagesToRender &&
        imagesToRender.map((image) => (
          <div key={image} className="flex items-center justify-center">
            <Image
              src={image}
              alt="image"
              width={1920}
              height={1080}
              className="inline-block h-full w-full max-w-full object-cover align-middle sm:rounded-md"
            />
          </div>
        ))}
    </div>
  );
};

export default Gallery;
