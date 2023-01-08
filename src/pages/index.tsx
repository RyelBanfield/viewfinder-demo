import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore/lite";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import { db } from "../firebase";
import buildImageObjects from "../utils/buildImageObjects";

export type Image = {
  id: string;
  uid: string;
  username: string;
  firstName: string;
  lastName: string;
  url: string;
  createdAt: Date;
};

const Home: NextPage = () => {
  const { ref: pageBottom, inView } = useInView();

  const [galleryImages, setGalleryImages] = useState<Image[]>([]);
  const [endOfGallery, setEndOfGallery] = useState(false);
  const [lastVisibleImageDoc, setLastVisibleImageDoc] =
    useState<QueryDocumentSnapshot | null>(null);

  useEffect(() => {
    const fetchInitialImages = async () => {
      const imagesQuery = query(
        collection(db, "images"),
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
  }, []);

  useEffect(() => {
    const fetchMoreImages = async () => {
      const imagesQuery = query(
        collection(db, "images"),
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
  }, [inView, lastVisibleImageDoc, endOfGallery]);

  return (
    <>
      <Hero />
      <Gallery images={galleryImages} showNames={true} />
      <div ref={pageBottom}></div>
    </>
  );
};

export default Home;
