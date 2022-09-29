import { collection, getDocs } from 'firebase/firestore';

import Hero from '../components/Hero';
import UserImage from '../components/UserImage';
import { db } from '../firebase';

const Home = ({ images }: { images: [{ uid: string; url: string }] }) => (
  <main className="flex flex-grow flex-col">
    <Hero />
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {images.map((image) => (
        <UserImage key={image.url} image={image} />
      ))}
    </div>
  </main>
);

export const getServerSideProps = async () => {
  const images: { uid: string; url: string }[] = [];
  const querySnapshot = await getDocs(collection(db, 'images'));
  querySnapshot.forEach((doc) => {
    images.push({
      uid: doc.data().uid,
      url: doc
        .data()
        .url.replace(
          'https://firebasestorage.googleapis.com',
          'https://ik.imagekit.io/zuge4mgxf/',
        ),
    });
  });

  return {
    props: { images },
  };
};

export default Home;
