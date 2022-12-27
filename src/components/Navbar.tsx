import Link from "next/link";

import NavMenu from "./NavMenu";

const Navbar = () => {
  return (
    <nav className="z-10 flex items-center justify-between py-6">
      <Link href="/">
        <button type="button" className="text-xl font-bold">
          VF
        </button>
      </Link>
      <div className="flex items-center justify-between">
        <Link href="/submit-photos">
          <button type="button" className="mr-6 font-medium hover:underline">
            Submit a photo
          </button>
        </Link>
        <NavMenu />
      </div>
      {/* <div className="flex items-center justify-between">
        <Link href="/submit-photos-old">
          <button type="button" className="mr-6 font-medium hover:underline">
            Submit a photo
          </button>
        </Link>
        <NavMenu />
      </div> */}
    </nav>
  );
};

export default Navbar;
