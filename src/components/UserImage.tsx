import Image from 'next/future/image';

const UserImage = ({ image }: { image: { uid: string; url: string } }) => {
  const { url } = image;

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={url}
        alt="image"
        width={1080}
        height={1080}
        className="inline-block h-full w-full max-w-full rounded-md object-cover align-middle transition-opacity duration-300 ease-in-out hover:opacity-80"
      />
    </div>
  );
};

export default UserImage;
