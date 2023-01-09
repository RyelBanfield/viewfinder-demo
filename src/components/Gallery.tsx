import type { ImageType } from "../types";
import UserImage from "./UserImage";

const Gallery = ({
  images,
  showNames,
}: {
  images: ImageType[];
  showNames: boolean;
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {images.map((image: ImageType) => (
        <UserImage key={image.url} image={image} withName={showNames} />
      ))}
    </div>
  );
};

export default Gallery;
