import Image from 'next/future/image';

const UserImage = ({ image }: { image: { uid: string; url: string } }) => {
  const { url } = image;

  return (
    <div className="relative flex h-72 flex-col items-center justify-center">
      <Image
        src={url}
        alt="image"
        fill
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        className="rounded-md object-cover"
      />
    </div>
  );
};

export default UserImage;
