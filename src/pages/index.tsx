import { NextPage } from 'next';

import Gallery from '../components/Gallery';
import Hero from '../components/Hero';

const Home: NextPage = () => (
  <main className="flex flex-grow flex-col">
    <Hero />
    <Gallery />
  </main>
);

export default Home;
