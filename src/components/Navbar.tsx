import Link from 'next/link';
import { useRouter } from 'next/router';

import NavMenu from './NavMenu';

const NavBar = () => {
  const router = useRouter();
  const handleGoSubmitPhotos = () => router.push('/submit-photos');

  return (
    <nav className="flex items-center justify-between p-3">
      <Link href="/">
        <button type="button" className="text-xl font-bold">
          Viewfinder
        </button>
      </Link>

      <div className="flex items-center justify-between">
        <button
          type="button"
          className="mr-4 rounded-md border-2 border-neutral-200 p-2 hover:bg-neutral-200 focus:border-neutral-500 focus:outline-none"
          onClick={handleGoSubmitPhotos}
        >
          Submit a photo
        </button>
        <NavMenu />
      </div>
    </nav>
  );
};

export default NavBar;
