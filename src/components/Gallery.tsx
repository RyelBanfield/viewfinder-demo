import type { Image } from "../pages";
import UserImage from "./UserImage";

const Gallery = ({
  images,
  showNames,
}: {
  images: Image[];
  showNames: boolean;
}) => {
  const sortedImages = images.sort(
    (a, b) => b.createdAt.seconds - a.createdAt.seconds
  );

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {sortedImages.map((image: Image) => (
        <UserImage key={image.url} image={image} withName={showNames} />
      ))}
    </div>
  );
};

export default Gallery;
