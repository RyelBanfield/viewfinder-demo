import type { Image } from '../pages';
import UserImage from './UserImage';

const Gallery = ({ images }: { images: Image[] }) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {images.map((image: Image) => (
        <UserImage key={image.url} image={image} />
      ))}
    </div>
  );
};

export default Gallery;
