import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Works from "./components/Works";
import About from "./components/About";
import Skills from "./components/Skills";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Works />
        <About />
        <Skills />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
