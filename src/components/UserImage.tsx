import Image from 'next/image';

const UserImage = ({
  image,
}: {
  image: { username: string; firstName: string; lastName: string; url: string };
}) => {
  const { firstName, lastName, url } = image;

  const handleDownload = () => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const href = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', `${firstName}_${lastName}.jpg`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="mb-1 flex items-center">
        <p className="text-md font-semibold">{`
          ${firstName} ${lastName}
        `}</p>
      </div>
      <div className="relative h-72 w-full">
        <Image
          src={url}
          alt="User Image"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          priority
          className="object-cover hover:object-scale-down"
        />
      </div>
      <button
        type="button"
        onClick={handleDownload}
        className="mt-2 ml-auto w-fit cursor-pointer rounded-md bg-gray-100 p-1 text-sm text-gray-500 hover:bg-gray-200"
      >
        Download
      </button>
    </div>
  );
};

export default UserImage;
