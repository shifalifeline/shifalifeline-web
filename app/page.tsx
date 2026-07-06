import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import QuickActions from "../components/QuickActions";
import WhyChoose from "../components/WhyChoose";
import Stats from "../components/Stats";
import Services from "../components/Services";
import Branches from "../components/Branches";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <QuickActions />
      <WhyChoose />
      <Stats />
      <Services />
      <Branches />
      <Footer />
    </>
  );
}