import Link from 'next/link';
import { useRouter } from 'next/router';

import NavMenu from './NavMenu';

const Navbar = () => {
  const router = useRouter();

  const handleGoSubmitPhotos = () => router.push('/submit-photos');

  return (
    <nav className="flex items-center justify-between p-3">
      <Link href="/">
        <button type="button" className="text-xl font-bold">
          VF
        </button>
      </Link>

      <div className="flex items-center justify-between">
        <button
          type="button"
          className="mr-4 rounded-md bg-black p-2 text-white"
          onClick={handleGoSubmitPhotos}
        >
          Submit a photo
        </button>
        <NavMenu />
      </div>
    </nav>
  );
};

export default Navbar;
