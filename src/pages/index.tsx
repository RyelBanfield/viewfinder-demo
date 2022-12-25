import { collection, getDocs } from "firebase/firestore/lite";
import { NextPage } from "next";

import Gallery from "../components/Gallery";
import { db } from "../firebase";

export type Image = {
  id: string;
  uid: string;
  username: string;
  firstName: string;
  lastName: string;
  url: string;
};

type Props = {
  images: Image[];
};

const Home: NextPage<{ images: Image[] }> = ({ images }: Props) => {
  return <Gallery images={images} />;
};

export const getServerSideProps = async () => {
  const imageData: Image[] = [];

  const imagesDocs = await getDocs(collection(db, "images"));

  imagesDocs.forEach((doc) => {
    imageData.push({
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
    });
  });

  return {
    props: { images: imageData },
  };
};

export default Home;
