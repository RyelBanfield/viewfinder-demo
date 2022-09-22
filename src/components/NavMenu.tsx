/* eslint-disable operator-linebreak */
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';

const NavMenu = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  const handleGoHome = () => router.push('/home');
  const handleGoAccount = () => router.push('/account');
  const handleSignOut = () => signOut(auth);

  return (
    user && (
      <Menu>
        <Menu.Button className="w-12">
          <Image
            className="rounded-full"
            src={
              user.photoURL ||
              `https://avatars.dicebear.com/api/bottts/${user.displayName}.svg`
            }
            layout="responsive"
            width={100}
            height={100}
            alt="User profile picture"
          />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 mt-8 mr-8 flex w-48 flex-col items-center justify-between rounded-md border-2 bg-white p-4 shadow-lg outline-none">
            <Menu.Item>
              <button type="button" onClick={handleGoHome}>
                Home
              </button>
            </Menu.Item>
            <Menu.Item>
              <button type="button" onClick={handleGoAccount}>
                Account
              </button>
            </Menu.Item>
            <Menu.Item>
              <button type="button" onClick={handleSignOut}>
                Sign out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  );
};

export default NavMenu;
