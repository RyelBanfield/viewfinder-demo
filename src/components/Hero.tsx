import Image from 'next/image';

const Hero = ({ randomHeroImage }: { randomHeroImage: string | null }) => {
  return (
    <div className="relative mb-6 h-72 w-full">
      {randomHeroImage !== null && (
        <Image
          src={randomHeroImage}
          alt="Hero Image"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="mb-6 flex h-72 w-full items-center rounded bg-black bg-cover bg-center object-cover object-top text-left sm:h-80 md:h-96 lg:h-[500px]"
        />
      )}
      <div className="absolute top-0 h-full w-full rounded  pt-12 pl-3 sm:pl-6 md:pl-8 lg:pl-12">
        <h1 className="mb-2 text-xl font-bold text-white">Viewfinder</h1>
        <p className="text-sm text-white">Your source for those HQ images.</p>
        <p className="text-sm text-white">Powered by creators everywhere.</p>
      </div>
    </div>
  );
};

export default Hero;
