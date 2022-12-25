import Image from "next/image";
import Link from "next/link";

import type { Image as ImageType } from "../pages";

const UserImage = ({
  image,
  withName,
}: {
  image: ImageType;
  withName: boolean;
}) => {
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
        {withName && (
          <Link href={`/${image.username}`}>
            <p className="text-md font-semibold">{`${image.firstName} ${image.lastName}`}</p>
          </Link>
        )}
        <button
          type="button"
          onClick={handleDownload}
          className="cursor-pointer rounded bg-neutral-900 p-2 text-sm text-neutral-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserImage;
