import Home from './components/home';
import Plans from './components/plans';
import About from './components/about';
import Footer from './components/footer';

export const metadata = {
  title: 'Fastest & Most Affordable Fiber Internet in Cabanatuan | MultiNet Velocity',
  description: 'Experience lightning-fast fiber optic internet in Cabanatuan with FREE installation and up to 90 premium TV channels. Cheaper than most ISPs with speeds up to 750 Mbps.',
};


export default function LandingPage() {
  return (
    <main className="bg-gray-900">
      <section>
        <Home style={{ backgroundColor: 'transparent' }} />
      </section>

      <section>
        <Plans style={{ backgroundColor: 'transparent' }} />
      </section>

      <section className="py-30">
        <About style={{ backgroundColor: 'transparent' }} />
      </section>

      <section>
        <Footer/>
      </section>
    </main>
  );
}

