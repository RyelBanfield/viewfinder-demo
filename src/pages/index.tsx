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
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Gallery from "../components/Gallery";
import { db } from "../firebase";
import type { ImageType } from "../types";
import buildImageObjects from "../utils/buildImageObjects";

const Hero = () => {
  return (
    <div className="relative mb-6 h-96 lg:h-[600px]">
      <Image
        src="/Hero.JPG"
        alt="Hero Image"
        fill
        priority
        className="absolute rounded object-cover object-bottom"
      />
      <div className="absolute inset-0 rounded bg-neutral-900 bg-opacity-50" />
      <div className="absolute flex h-full w-full flex-col justify-center p-9 text-neutral-100">
        <h1 className="mb-6 text-2xl font-bold">View Finder</h1>
        <p className="text-lg font-semibold">
          A platform for sharing party and event photography from the Caribbean.
          <br />
          The perfect way to remember your special Caribbean experiences.
        </p>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const { ref: pageBottom, inView } = useInView();

  const [galleryImages, setGalleryImages] = useState<ImageType[]>([]);
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
      {galleryImages.length > 0 && <div ref={pageBottom}></div>}
    </>
  );
};

export default Home;
