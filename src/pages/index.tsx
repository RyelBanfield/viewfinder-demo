import { collection, getDocs } from "firebase/firestore/lite";
import { InferGetServerSidePropsType, NextPage } from "next";

import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import { db } from "../firebase";

export type Image = {
  id: string;
  uid: string;
  username: string;
  firstName: string;
  lastName: string;
  url: string;
};

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ images }) => {
  return (
    <>
      <Hero />
      <Gallery images={images} showNames={true} />
    </>
  );
};

export const getServerSideProps = async () => {
  const imagesDocs = await getDocs(collection(db, "images"));

  const images = imagesDocs.docs.map((doc) => {
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
    };
  }) as Image[];

  return {
    props: { images },
  };
};

export default Home;
