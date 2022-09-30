import { collection, getDocs } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';

import { db } from '../firebase';
import UserImage from './UserImage';

const Gallery = () => {
  const [imagesToRender, setImagesToRender] = useState<[] | null>(null);

  useEffect(() => {
    const getImages = async () => {
      const imageData: any = [];
      const querySnapshot = await getDocs(collection(db, 'images'));
      querySnapshot.forEach((doc) => {
        imageData.push({
          uid: doc.data().uid,
          url: doc
            .data()
            .url.replace(
              'https://firebasestorage.googleapis.com',
              'https://ik.imagekit.io/zuge4mgxf',
            ),
        });
      });
      setImagesToRender(imageData);
    };

    getImages();
  }, []);

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {imagesToRender &&
        imagesToRender.map((image: { uid: string; url: string }) => (
          <UserImage key={image.url} image={image} />
        ))}
    </div>
  );
};

export default Gallery;
