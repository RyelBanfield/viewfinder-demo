import { collection, getDocs } from 'firebase/firestore/lite';
import { NextPage } from 'next';

import Gallery from '../components/Gallery';
import Hero from '../components/Hero';
import { db } from '../firebase';

export type Image = {
  username: string;
  firstName: string;
  lastName: string;
  url: string;
};

type Props = {
  randomHeroImage: string;
  images: Image[];
};

const Home: NextPage<{ randomHeroImage: string; images: Image[] }> = ({
  randomHeroImage,
  images,
}: Props) => {
  return (
    <main className="flex flex-grow flex-col">
      <Hero randomHeroImage={randomHeroImage} />
      <Gallery images={images} />
    </main>
  );
};

export const getServerSideProps = async () => {
  const imageData: Image[] = [];

  const querySnapshot = await getDocs(collection(db, 'images'));
  querySnapshot.forEach((doc) => {
    imageData.push({
      username: doc.data().username,
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      url: doc
        .data()
        .url.replace(
          'https://firebasestorage.googleapis.com',
          'https://ik.imagekit.io/zuge4mgxf',
        ),
    });
  });

  const randomHeroImage =
    imageData[Math.floor(Math.random() * imageData.length)].url;

  const images = imageData;

  return {
    props: { randomHeroImage, images },
  };
};

export default Home;
