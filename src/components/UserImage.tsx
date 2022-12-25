import Image from "next/image";
import Link from "next/link";

import type { Image as ImageType } from "../pages";

const UserImage = ({ image }: { image: ImageType }) => {
  const handleDownload = () => {
    fetch(image.url)
      .then((res) => res.blob())
      .then((blob) => {
        const href = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          `${image.firstName}_${image.lastName}.jpg`
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      });
  };

  return (
    <div>
      <div className="relative mb-3 h-[600px] w-full">
        <Image
          src={image.url}
          alt="User Image"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          priority
          className="object-cover object-top transition-all duration-300 hover:cursor-pointer hover:opacity-90 hover:shadow-lg"
        />
      </div>

      <div className="flex items-center justify-between">
        <Link href={`/${image.username}`}>
          <p className="text-md font-semibold">{`${image.firstName} ${image.lastName}`}</p>
        </Link>
        <button
          type="button"
          onClick={handleDownload}
          className="cursor-pointer rounded bg-neutral-900 p-2 text-sm text-neutral-100"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default UserImage;
