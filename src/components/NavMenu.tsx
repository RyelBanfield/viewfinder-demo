import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';

const NavMenu = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  const handleGoHome = () => router.push('/');
  const handleGoProfile = () => router.push('/profile');
  const handleGoAccount = () => router.push('/account');
  const handleSignOut = () => signOut(auth).then(() => router.replace('/'));

  return (
    <Menu>
      <Menu.Button className="rounded-full p-2 hover:bg-gray-100">
        <svg viewBox="0 0 100 80" width="20" height="20">
          <rect width="100" height="20" />
          <rect y="30" width="100" height="20" />
          <rect y="60" width="100" height="20" />
        </svg>
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-2 mt-12 w-48 rounded-sm bg-white py-2 shadow-lg outline-none">
          <Menu.Item>
            <button
              type="button"
              className="w-full py-2 pl-3 text-left hover:bg-neutral-300"
              onClick={handleGoHome}
            >
              Home
            </button>
          </Menu.Item>
          {user && (
            <>
              <Menu.Item>
                <button
                  type="button"
                  className="w-full py-2 pl-3 text-left hover:bg-neutral-300"
                  onClick={handleGoProfile}
                >
                  Profile
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  type="button"
                  className="w-full py-2 pl-3 text-left hover:bg-neutral-300"
                  onClick={handleGoAccount}
                >
                  Account
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  type="button"
                  className="w-full py-2 pl-3 text-left hover:bg-neutral-300"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </Menu.Item>
            </>
          )}
          {!user && (
            <Menu.Item>
              <button
                type="button"
                className="w-full py-2 pl-3 text-left hover:bg-neutral-300"
                onClick={() => router.push('/login')}
              >
                Log in
              </button>
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavMenu;
