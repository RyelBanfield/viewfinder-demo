import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative mb-6 h-96">
      <Image
        src="/Hero.JPG"
        alt="Hero Image"
        fill
        priority
        className="absolute rounded object-cover object-bottom"
      />
      <div className="absolute inset-0 rounded bg-neutral-900 bg-opacity-75" />
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

export default Hero;
