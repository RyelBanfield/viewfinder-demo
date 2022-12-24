import type { Image } from '../pages';
import UserImage from './UserImage';

const Gallery = ({ images }: { images: Image[] | null }) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {images &&
        images.map(
          (image: {
            username: string;
            firstName: string;
            lastName: string;
            url: string;
          }) => <UserImage key={image.url} image={image} />,
        )}
    </div>
  );
};

export default Gallery;
