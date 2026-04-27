import { useState, useEffect, useRef } from 'react';
import slika1 from './assets/slika1.png';
import { motion, AnimatePresence } from 'framer-motion';

// Particle component
const FloatingParticle = ({ index }) => {
  const x = Math.random() * 100;
  const duration = Math.random() * 20 + 15;
  const delay = Math.random() * 20;
  const size = Math.random() * 6 + 3;
  const colors = ['bg-amber-400', 'bg-rose-300', 'bg-amber-300', 'bg-rose-200', 'bg-amber-200'];
  const colorClass = colors[index % colors.length];

  return (
    <motion.div
      className={`absolute rounded-full ${colorClass} opacity-20`}
      style={{
        left: `${x}%`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      animate={{
        y: ['100vh', '-100px'],
        opacity: [0, 0.4, 0.4, 0],
        rotate: [0, 720],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    />
  );
};

// Navbar component
const Navbar = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Težave', href: '#struggles' },
    { label: 'O meni', href: '#about' },
    { label: 'Kako poteka', href: '#process' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
        scrolled ? 'bg-rose-50/95 backdrop-blur-md shadow-lg shadow-amber-200/10 py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-2xl font-serif font-bold text-amber-600 tracking-wide">
          Notranja <span className="text-rose-400">Preobrazba</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-stone-600 hover:text-amber-600 transition-colors duration-300 text-sm tracking-wide relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={onOpenModal}
              className="bg-gradient-to-r from-amber-500 to-amber-400 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-amber-400/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Brezplačen pogovor
            </button>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-amber-600 transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-amber-600 transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-amber-600 transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4 }}
            className="md:hidden fixed inset-0 bg-rose-50/98 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMenuOpen(false)}
                className="text-xl text-stone-700 hover:text-amber-600 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => {
                setMenuOpen(false);
                onOpenModal();
              }}
              className="bg-gradient-to-r from-amber-500 to-amber-400 text-white px-8 py-3 rounded-full font-medium mt-4"
            >
              Brezplačen pogovor
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero Section
const HeroSection = ({ onOpenModal }) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-rose-100 via-amber-50/40 to-white">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-300/15 to-transparent -top-24 -right-24 animate-pulse" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-br from-rose-300/20 to-transparent -bottom-16 -left-20" />
      <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-br from-amber-400/10 to-transparent top-[40%] left-[15%]" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-5 py-2 bg-amber-500/10 border border-amber-400/30 rounded-full text-xs text-amber-700 tracking-[2px] uppercase mb-8"
        >
          ✦ Hipno coaching & regresoterapija ✦
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-stone-800 mb-6"
        >
          Predstavljaj si življenje{' '}
          <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
            brez omejujočih prepričanj
          </span>{' '}
          – brez omejitev.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-stone-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Ovire, predsodki in stari vzorci nas pogosto držijo nazaj.
          Če čutiš, da želiš stopiti naprej, sem tukaj – skupaj bova odložila vse, kar ti stoji na poti.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onOpenModal}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-medium shadow-xl shadow-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/50 hover:-translate-y-1 transition-all duration-400 text-lg"
          >
            <i className="fas fa-comments text-sm"></i> Brezplačen uvodni pogovor
          </button>
          <a
            href="#about"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-rose-300 text-stone-600 rounded-full font-medium hover:bg-rose-100 hover:border-rose-400 hover:-translate-y-0.5 transition-all duration-400"
          >
            <i className="fas fa-arrow-down text-sm"></i> Izvedi več
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <i className="fas fa-chevron-down text-amber-400 text-xl opacity-50" />
      </motion.div>
    </section>
  );
};

// Struggles Section
const StrugglesSection = ({ onOpenModal }) => {
  const struggles = [
    {
      icon: 'fa-brain',
      title: 'Omejujoča prepričanja',
      desc: 'Stari vzorci in prepričanja, ki te zavirajo pri tem, da bi zaživel/a polno življenje.',
    },
    {
      icon: 'fa-heart-crack',
      title: 'Pomanjkanje samozavesti',
      desc: 'Občutek, da nisi dovolj vreden/vredna – da nikoli nisi dovolj, kot si.',
    },
    {
      icon: 'fa-cloud-bolt',
      title: 'Strahovi in fobije',
      desc: 'Strahovi, ki te omejujejo pri vsakodnevnem življenju in ti preprečujejo, da bi stopil/a naprej.',
    },
    {
      icon: 'fa-link',
      title: 'Odvisnosti',
      desc: 'Vzorci in navade, ki te držijo v začaranem krogu in ti jemljejo svobodo.',
    },
    {
      icon: 'fa-wind',
      title: 'Notranji nemir',
      desc: 'Občutek nenehne napetosti, tesnobe ali notranjega nemira, ki ne popusti.',
    },
    {
      icon: 'fa-mask',
      title: 'Nisem dovolj vreden/vredna',
      desc: 'Globoko zakoreninjen občutek, da nisi dovolj dober/dobra – da si manj vreden/vredna.',
    },
  ];

  return (
    <section id="struggles" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-amber-400" />
            <i className="fas fa-spa text-amber-500" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">
            Prepoznavaš se v{' '}
            <span className="text-amber-600">času, da nekaj spremeniš</span>?
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Ovire, predsodki in stari vzorci nas pogosto držijo nazaj. Če se prepoznaš v vsaj eni od spodnjih težav, si na pravem mestu.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {struggles.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.1, 0.3), ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-rose-100/60 to-white border border-rose-200/50 rounded-2xl p-8 text-center group hover:shadow-xl hover:shadow-rose-200/30 transition-all duration-400 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-rose-300 via-amber-400 to-rose-300 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-200/60 to-white flex items-center justify-center mx-auto mb-5 shadow-md shadow-rose-200/30">
                <i className={`fas ${item.icon} text-amber-500 text-xl`}></i>
              </div>
              <h3 className="text-lg font-serif text-stone-800 mb-2">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-rose-100 to-rose-200/60 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-300/10" />
          <h3 className="text-2xl md:text-3xl font-serif text-stone-800 mb-3 relative z-10">
            Si se prepoznal/a vsaj v eni od teh težav?
          </h3>
          <p className="text-stone-600 text-lg max-w-xl mx-auto mb-8 relative z-10 leading-relaxed">
            Si zares želiš spremembo? Poišči me in skupaj bova ustvaril/a varen prostor za pogovor in ustrezno terapijo zate.
          </p>
          <button
            onClick={onOpenModal}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-medium shadow-xl shadow-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/50 hover:-translate-y-1 transition-all duration-400 relative z-10 text-lg"
          >
            <i className="fas fa-paper-plane text-sm"></i> Pošlji povpraševanje
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-amber-50/50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/40 relative">
              <img
                src={slika1}
                alt="Hipno coaching in regresoterapija"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-5 w-28 h-28 border-2 border-amber-400/40 rounded-2xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-6 leading-tight">
              O meni – <span className="text-amber-600">vaša popotnica</span> do spremembe
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4 text-lg">
              Sem hypno coach in regresoterapevtka, predana temu, da se ljudem pomagam znebiti starih omejujočih prepričanj in strahov, ter ponovno najti stik s seboj, s svojim notranjim mirom in lastno močjo.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Verjamem, da ima vsak človek v sebi vse, kar potrebuje za spremembo – včasih potrebujemo le pravo podporo, da to odkrijemo.
            </p>

            <blockquote className="bg-gradient-to-r from-rose-100/80 to-white border-l-4 border-amber-500 rounded-r-2xl p-6 mb-8 italic text-stone-600 leading-relaxed">
              "Tudi sama imam izkušnjo, kako močno lahko hipnoza vpliva na življenje. Prav zato lahko z gotovostjo iz prve roke povem, da je sprememba mogoča tudi zate. Potrebna je le odločitev za ta korak."
            </blockquote>

            <div className="bg-gradient-to-br from-amber-50/80 via-white to-rose-50/50 border border-amber-200/50 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-200/30 to-transparent rounded-bl-full" />

              <div className="text-center mb-6">
                <span className="inline-block px-4 py-1.5 bg-amber-500 text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-md shadow-amber-400/30">
                  Vaš potek terapije
                </span>
              </div>

              <div className="flex flex-col items-center gap-0">
                <div className="w-full max-w-xs bg-white border border-amber-300/60 rounded-xl p-4 shadow-md shadow-amber-100/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-serif font-bold text-sm shadow-md shadow-amber-300/40">
                      1
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-serif text-stone-800 font-semibold">15 min</div>
                      <div className="text-xs text-stone-500">Brezplačen uvodni pogovor</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center py-2">
                  <div className="w-px h-5 bg-gradient-to-b from-amber-400 to-amber-300" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-semibold bg-amber-50/80 px-3 py-1 rounded-full border border-amber-200/50">
                    → potem izberete →
                  </span>
                  <div className="w-px h-5 bg-gradient-to-b from-amber-300 to-amber-400" />
                </div>

                <div className="flex items-center gap-6 w-full justify-center">
                  <div className="flex-1 max-w-[180px] group">
                    <div className="bg-gradient-to-br from-white to-rose-50/50 border border-rose-200/60 rounded-xl p-4 shadow-md shadow-rose-100/40 hover:shadow-xl hover:shadow-rose-200/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center text-white font-serif font-bold text-sm shadow-md shadow-rose-300/40">
                          2A
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-serif text-stone-800 font-semibold">45 min</div>
                          <div className="text-xs text-stone-500">Enkratno srečanje</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-300/50 flex items-center justify-center">
                    <span className="text-xs font-serif font-bold text-amber-600">ali</span>
                  </div>

                  <div className="flex-1 max-w-[180px] group">
                    <div className="bg-gradient-to-br from-white to-amber-50/50 border border-amber-200/60 rounded-xl p-4 shadow-md shadow-amber-100/40 hover:shadow-xl hover:shadow-amber-200/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-serif font-bold text-sm shadow-md shadow-amber-300/40">
                          2B
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-serif text-stone-800 font-semibold">6 srečanj</div>
                          <div className="text-xs text-stone-500">Paket preobrazbe</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Process Section
const ProcessSection = () => {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-amber-400" />
            <i className="fas fa-feather-pointed text-amber-500" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4">
            Kako poteka <span className="text-amber-600">srečanje z menoj</span>
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Vsak korak je skrbno zasnovan, da vam zagotovi varen, podprt in učinkovit proces spremembe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg shadow-amber-400/40 z-10 relative">
              1
            </div>
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-amber-400 to-amber-300" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gradient-to-br from-rose-100/60 to-white border border-rose-200/40 rounded-2xl p-6 md:p-8 max-w-lg hover:shadow-xl hover:shadow-rose-200/20 hover:-translate-y-1 transition-all duration-400 text-center">
            <span className="inline-block px-3 py-1 bg-amber-500/10 rounded-full text-xs text-amber-700 font-medium tracking-wide mb-3">
              KORAK 1
            </span>
            <h3 className="text-xl font-serif text-stone-800 mb-2">
              15-minutni brezplačen pogovor
            </h3>
            <p className="text-stone-500 leading-relaxed">
              Najprej se dogovorimo za uvodni pogovor, kjer se spoznavamo. Pogovorimo se o vaši težavi, željah in ciljih. Spoznavam vašo zgodbo in skupaj oceniva, katera pot je prava zate.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center items-center gap-4 mb-4"
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-amber-300" />
          <span className="text-xs text-amber-500 font-medium tracking-widest uppercase">Izberite svojo pot</span>
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-amber-300" />
        </motion.div>

        <div className="hidden md:block relative h-16 mb-8">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="400" y1="0" x2="400" y2="20" stroke="url(#forkGrad)" strokeWidth="2" />
            <line x1="400" y1="20" x2="200" y2="30" stroke="url(#forkGrad)" strokeWidth="2" />
            <line x1="200" y1="30" x2="200" y2="64" stroke="url(#forkGrad)" strokeWidth="2" />
            <line x1="400" y1="20" x2="600" y2="30" stroke="url(#forkGrad)" strokeWidth="2" />
            <line x1="600" y1="30" x2="600" y2="64" stroke="url(#forkGrad)" strokeWidth="2" />
            <defs>
              <linearGradient id="forkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-amber-400/40">
                  2A
                </div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-rose-100/60 to-white border border-rose-200/40 rounded-2xl p-6 hover:shadow-xl hover:shadow-rose-200/20 hover:-translate-y-1 transition-all duration-400">
                <span className="inline-block px-3 py-1 bg-amber-500/10 rounded-full text-xs text-amber-700 font-medium tracking-wide mb-3">
                  POT A
                </span>
                <h3 className="text-xl font-serif text-stone-800 mb-2">
                  Enkratno srečanje (45 min)
                </h3>
                <p className="text-stone-500 leading-relaxed text-sm">
                  Individualno enkratno srečanje, ki vključuje regresijski proces in osebno pripravljen hipnotični posnetek za domov. Primerno za specifično težavo, ki jo želite hitro in učinkovito obravnavati.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-amber-400/40">
                  2B
                </div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-rose-100/60 to-white border border-rose-200/40 rounded-2xl p-6 hover:shadow-xl hover:shadow-rose-200/20 hover:-translate-y-1 transition-all duration-400 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-500" />
                <span className="inline-block px-3 py-1 bg-amber-500/10 rounded-full text-xs text-amber-700 font-medium tracking-wide mb-3">
                  POT B
                </span>
                <h3 className="text-xl font-serif text-stone-800 mb-2">
                  Paket notranje preobrazbe (6 srečanj)
                </h3>
                <p className="text-stone-500 leading-relaxed text-sm">
                  V kolikor je zate podporen Paket notranje preobrazbe, to pomeni do 6 srečanj. Vsako srečanje vas nežno popelje globlje v proces spremembe in notranje rasti.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-rose-100 to-rose-200/60 rounded-2xl p-8 md:p-10 mt-12 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-xl font-serif text-stone-800 mb-4">
              <i className="fas fa-shield-heart text-amber-500 mr-2"></i>
              Varen prostor za vašo preobrazbo
            </h3>
            <p className="text-stone-600 leading-relaxed mb-3">
              Vsako srečanje poteka v varnem, mirnem in podpornem prostoru, kjer vas nežno popeljem v globoko sproščeno stanje, v katerem lahko dostopate do svojega podzavestnega uma – ki ima vse odgovore glede temeljnega vzroka vaše težave.
            </p>
            <p className="text-stone-600 leading-relaxed mb-3">
              Če se morda bojite, da boste med hipnoterapijo izgubili nadzor, bodite brez skrbi –{' '}
              <span className="text-amber-700 font-medium">imate nadzor nad celotnim dogajanjem ves čas prav vi.</span>
            </p>
            <p className="text-stone-600 leading-relaxed">
              Nenazadnje je hipnoza značilna za vsakdanje življenje – samo pomislite na trenutke, ko sanjate z odprtimi očmi ali se tako zelo zatopite v knjigo ali film, da niste več pozorni na svojo okolico.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Modal / Form Section — WITH FORMSPREE INTEGRATION
const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    issue: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkokadzb';

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Napaka pri pošiljanju sporočila.');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', issue: '', message: '' });
    } catch (err) {
      setError(err.message || 'Prišlo je do napake. Prosimo, poskusite znova ali me kontaktirajte neposredno.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-8 md:p-10 max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-100 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-check text-amber-500 text-3xl"></i>
                </div>
                <h3 className="text-2xl font-serif text-stone-800 mb-3">Hvala za vaše sporočilo!</h3>
                <p className="text-stone-500 leading-relaxed mb-4">
                  Vaše povpraševanje je bilo uspešno poslano. Kontaktirala vas bom v najkrajšem možnem času, da se dogovoriva za vaš brezplačen 15-minutni telefonski pogovor.
                </p>
                <p className="text-amber-600 text-sm">
                  <i className="fas fa-heart mr-1"></i> Veselim se najinega pogovora!
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-stone-800 mb-2">
                  Rezervirajte <span className="text-amber-600">brezplačen pogovor</span>
                </h2>
                <p className="text-stone-500 mb-8 text-sm leading-relaxed">
                  Pustite svoje kontaktne podatke in na kratko opišite težavo. Kontaktirala vas bom v najkrajšem možnem času.
                </p>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm">
                    <i className="fas fa-exclamation-circle mr-2"></i> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-stone-600 text-sm font-medium mb-2">
                      Ime in priimek <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Vaše ime in priimek"
                      required
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl bg-amber-50/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-stone-700 placeholder:text-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 text-sm font-medium mb-2">
                      E-poštni naslov <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vas@email.si"
                      required
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl bg-amber-50/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-stone-700 placeholder:text-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 text-sm font-medium mb-2">
                      Telefonska številka <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+386 ..."
                      required
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl bg-amber-50/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-stone-700 placeholder:text-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 text-sm font-medium mb-2">Katera težava vas najbolj pesti?</label>
                    <select
                      name="issue"
                      value={formData.issue}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl bg-amber-50/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-stone-700 appearance-none cursor-pointer"
                    >
                      <option value="">Izberite težavo...</option>
                      <option value="omejujoča-prepričanja">Omejujoča prepričanja</option>
                      <option value="samozavest">Pomanjkanje samozavesti</option>
                      <option value="nisem-dovolj">Nisem dovolj vreden/vredna</option>
                      <option value="strahovi">Strahovi</option>
                      <option value="fobije">Fobije</option>
                      <option value="odvisnosti">Odvisnosti</option>
                      <option value="notranji-nemir">Notranji nemir</option>
                      <option value="drugo">Drugo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-600 text-sm font-medium mb-2">
                      Na kratko opišite težavo
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="V nekaj besedah opišite, kaj vas pesti in kaj si želite spremeniti..."
                      rows={4}
                      className="w-full px-4 py-3 border border-rose-200 rounded-xl bg-amber-50/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-stone-700 placeholder:text-stone-400 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-amber-400/30 hover:-translate-y-0.5 transition-all duration-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <i className="fas fa-spinner fa-spin"></i> Pošiljam...
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <i className="fas fa-paper-plane"></i> Pošlji povpraševanje
                      </span>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Final CTA Section
const FinalCTASection = ({ onOpenModal }) => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-rose-100 via-amber-50/40 to-white relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full bg-amber-300/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl mx-auto px-6 text-center relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-amber-400" />
          <i className="fas fa-star text-amber-500" />
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-amber-400" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif text-stone-800 mb-6 leading-tight">
          Ste pripravljeni na <span className="text-amber-600">spremembo</span>?
        </h2>

        <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500/10 border border-amber-400/30 rounded-full text-sm text-amber-700 font-medium mb-6">
          <i className="fas fa-phone"></i> 15-minutni brezplačen telefonski pogovor
        </div>

        <p className="text-stone-500 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Namenjen je spoznavanju in razumevanju vaših želja ter ciljev, ter ugotavljanju, kako vam lahko najbolje pomagam. Brez obveznosti, brez pritiska – samo iskren pogovor.
        </p>

        <button
          onClick={onOpenModal}
          className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-semibold shadow-xl shadow-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/50 hover:-translate-y-1 transition-all duration-400 text-lg"
        >
          <i className="fas fa-calendar-check"></i> Rezervirajte svoj brezplačen pogovor
        </button>
      </motion.div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-stone-800 text-stone-400 py-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-2xl font-serif text-amber-400 mb-2">Notranja Preobrazba</div>
        <p className="text-sm text-stone-500 mb-4">Hipno coaching & regresoterapija</p>
        <div className="w-16 h-px bg-amber-500/30 mx-auto mb-6" />
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="#"
            className="w-11 h-11 rounded-full border border-stone-600/30 flex items-center justify-center text-stone-500 hover:border-amber-500 hover:text-amber-500 hover:-translate-y-1 transition-all duration-300"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/tanjanapotnik?igsh=MXN4d3VmbmgxODR5NA=="
            className="w-11 h-11 rounded-full border border-stone-600/30 flex items-center justify-center text-stone-500 hover:border-amber-500 hover:text-amber-500 hover:-translate-y-1 transition-all duration-300"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="w-11 h-11 rounded-full border border-stone-600/30 flex items-center justify-center text-stone-500 hover:border-amber-500 hover:text-amber-500 hover:-translate-y-1 transition-all duration-300"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <p className="text-xs text-stone-600">© 2026 Notranja Preobrazba. Vse pravice pridržane.</p>
      </div>
    </footer>
  );
};

// Main App
export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="font-sans text-stone-800 bg-amber-50/30 min-h-screen">
      <style>{`
        @import url('https://cdn.jsdelivr.net/npm/@fontsource/playfair-display@4.5.0/index.min.css');
        @import url('https://cdn.jsdelivr.net/npm/@fontsource/lato@4.5.0/index.min.css');
      `}</style>
      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
        html { scroll-behavior: smooth; }
        select option { padding: 8px; }
      `}</style>

      <Navbar onOpenModal={openModal} />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>

      <main className="relative z-10">
        <HeroSection onOpenModal={openModal} />
        <StrugglesSection onOpenModal={openModal} />
        <AboutSection />
        <ProcessSection />
        <FinalCTASection onOpenModal={openModal} />
      </main>

      <Footer />
      <ContactModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}
