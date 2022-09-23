import Link from 'next/link';

import NavMenu from './NavMenu';

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-3">
      <Link href="/">
        <button type="button" className="text-xl font-bold">
          Viewfinder
        </button>
      </Link>
      <div className="flex items-center justify-between">
        <NavMenu />
      </div>
    </nav>
  );
};

export default NavBar;
