import {
  collection,
  getCount,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore/lite";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Gallery from "../components/Gallery";
import { db } from "../firebase";
import { ImageType, UserType } from "../types";
import buildImageObjects from "../utils/buildImageObjects";

const UserProfileHeader = ({ user }: { user: UserType }) => {
  return (
    <>
      <div className="flex w-full items-center gap-3">
        <h1 className="text-2xl font-semibold md:text-3xl">
          {user.firstName} {user.lastName}
        </h1>
        <h2 className="rounded bg-neutral-300 p-1 px-2 text-sm ">
          @<span className="font-bold">{user.username}</span>
        </h2>
      </div>
      <div className="mb-3">
        <p className="text-sm text-neutral-500">
          {user.imagesUploaded} photos uploaded
        </p>
      </div>
    </>
  );
};

const UserProfile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user }) => {
  const { ref: pageBottom, inView } = useInView();

  const [galleryImages, setGalleryImages] = useState<ImageType[]>([]);
  const [endOfGallery, setEndOfGallery] = useState(false);
  const [lastVisibleImageDoc, setLastVisibleImageDoc] =
    useState<QueryDocumentSnapshot | null>(null);

  useEffect(() => {
    const fetchInitialImages = async () => {
      const imagesQuery = query(
        collection(db, "images"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(3)
      );

      const imagesDocs = await getDocs(imagesQuery);

      setLastVisibleImageDoc(
        imagesDocs.docs[imagesDocs.docs.length - 1] as QueryDocumentSnapshot
      );

      const images = buildImageObjects(imagesDocs);

      setGalleryImages(images);
    };

    fetchInitialImages();
  }, [user.uid]);

  useEffect(() => {
    const fetchMoreImages = async () => {
      const imagesQuery = query(
        collection(db, "images"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc"),
        startAfter(lastVisibleImageDoc),
        limit(3)
      );

      const imagesDocs = await getDocs(imagesQuery);

      if (imagesDocs.docs.length < 3) setEndOfGallery(true);

      setLastVisibleImageDoc(
        imagesDocs.docs[imagesDocs.docs.length - 1] as QueryDocumentSnapshot
      );

      setGalleryImages((prevImages) => [...prevImages, ...images]);

      const images = buildImageObjects(imagesDocs);
    };

    if (inView && !endOfGallery) fetchMoreImages();
  }, [endOfGallery, inView, lastVisibleImageDoc, user.uid]);

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

      <UserProfileHeader user={user} />
      <Gallery images={galleryImages} showNames={false} />
      {galleryImages.length > 0 && <div ref={pageBottom}></div>}
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const username = context.query.username;

  const userQuery = query(
    collection(db, "users"),
    where("username", "==", username)
  );

  const userDocs = await getDocs(userQuery);

  const user = userDocs.docs[0]?.data() as UserType;

  if (!user) {
    return {
      notFound: true,
    };
  }

  const imagesQuery = query(
    collection(db, "images"),
    where("uid", "==", user.uid)
  );

  const countFromServer = await getCount(imagesQuery);

  user.imagesUploaded = countFromServer.data().count;

  return {
    props: { user },
  };
};

export default UserProfile;
