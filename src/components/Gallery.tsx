import type { Image } from "../pages";
import UserImage from "./UserImage";

const Gallery = ({
  images,
  showNames,
}: {
  images: Image[];
  showNames: boolean;
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {images.map((image: Image) => (
        <UserImage key={image.url} image={image} withName={showNames} />
      ))}
    </div>
  );
};

export default Gallery;
