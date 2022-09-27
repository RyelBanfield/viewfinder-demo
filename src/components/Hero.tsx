// import { useEffect, useState } from 'react';

const Hero = () => {
  // const [randomPhoto, setRandomPhoto] = useState('');
  // const unsplashAccessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  // useEffect(() => {
  //   const fetchRandomPhoto = async () => {
  //     const response = await fetch(
  //       `https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}&orientation=landscape`,
  //     );
  //     const data = await response.json();
  //     setRandomPhoto(data.urls.regular);
  //   };

  //   fetchRandomPhoto();
  // }, []);

  return (
    <div
      className="mb-6 flex h-72 w-full items-center rounded-md bg-black bg-cover bg-center text-left sm:h-80 md:h-96 lg:h-[500px]"
      // style={{ backgroundImage: `url(${randomPhoto})` }}
    >
      <div className="pl-3 sm:pl-6 md:pl-8 lg:pl-12">
        <h1 className="mb-2 text-xl font-bold text-white">Viewfinder</h1>
        <p className="text-sm text-white">Your source for those HQ images.</p>
        <p className="text-sm text-white">Powered by creators everywhere.</p>
      </div>
    </div>
  );
};

export default Hero;
