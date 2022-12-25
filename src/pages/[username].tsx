import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { db } from "../firebase";

type User = {
  accountType: string;
  email: string;
  firstName: string;
  lastName: string;
  uid: string;
  username: string;
};

const UserProfile: NextPage<{ user: User }> = ({ user }) => {
  return (
    <>
      <Head>
        <title>404 - Not Found</title>
        <meta name="description" content="404 - Not Found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-grow flex-col items-center justify-center">
        <h1 className="mb-8 text-2xl font-semibold md:text-3xl">
          Hi {user.firstName}.
        </h1>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
};

export default UserProfile;
