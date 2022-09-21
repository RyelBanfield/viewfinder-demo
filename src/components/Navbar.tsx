import NavMenu from './NavMenu';

const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-3">
      <h1 className="text-xl font-bold">Viewfinder</h1>
      <div className="flex items-center justify-between">
        <NavMenu />
      </div>
    </div>
  );
};

export default NavBar;
