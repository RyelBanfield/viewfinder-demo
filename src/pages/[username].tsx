import { collection, getDocs, query, where } from "firebase/firestore/lite";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";

import Gallery from "../components/Gallery";
import { db } from "../firebase";
import type { Image } from "../pages";

type User = {
  uid: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
};

const UserProfile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user, images }) => {
  return (
    <>
      <Head>
        <title>
          {user.firstName} {user.lastName}&apos;s Viewfinder
        </title>
        <meta
          name="description"
          content={`${user.firstName} ${user.lastName}'s profile`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-24 w-full flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold md:text-3xl">
          {user.firstName} {user.lastName}
        </h1>
        <h2>
          @<span className="font-bold">{user.username}</span>
        </h2>
      </div>

      <Gallery images={images} showNames={false} />
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const username = context.query.username;

  const usersRef = collection(db, "users");
  const userQuery = query(usersRef, where("username", "==", username));
  const userDocs = await getDocs(userQuery);

  const user = userDocs.docs[0]?.data() as User;

  if (!user) {
    return {
      notFound: true,
    };
  }

  const imagesRef = collection(db, "images");
  const imagesQuery = query(imagesRef, where("uid", "==", user.uid));
  const imagesDocs = await getDocs(imagesQuery);

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
    props: { user, images },
  };
};

export default UserProfile;
