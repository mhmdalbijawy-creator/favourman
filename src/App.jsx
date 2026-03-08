import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Contact from './pages/Contact';
import JoinUs from './pages/JoinUs';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ImportsExports from './pages/ImportsExports';
import GoldParticles from './components/GoldParticles';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from './components/Logo';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language) {
      document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);

  const fontClass = i18n.language === 'ar' ? 'font-ar' : 'font-en';

  return (
    <div className={`bg-rich-black min-h-screen text-white selection:bg-gold selection:text-rich-black overflow-x-hidden ${fontClass}`}>
      <ScrollToTop />
      <GoldParticles />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/imports-exports" element={<ImportsExports />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
        </Routes>
      </main>

      <footer className="bg-rich-black py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16 md:mb-20">
            {/* Branding - Left on Desktop */}
            <div className="flex flex-col items-center md:items-start text-center md:text-start">
              <Link to="/" className="flex flex-row items-center gap-4 group mb-3 brand-exclusive" dir="ltr">
                <Logo className="w-8 h-8 md:w-11 md:h-11 transition-transform group-hover:scale-110 duration-700 shrink-0" />
                <span className="text-xl md:text-2xl font-bold tracking-[0.2em] text-white font-en group-hover:text-gold transition-colors">
                  FAVOURMAN<span className="text-gold group-hover:text-white transition-colors">.</span>
                </span>
              </Link>
              <p className="text-gray-500 text-[10px] md:text-[11px] font-light tracking-[0.25em] uppercase opacity-70">
                {t('home.story.history')}
              </p>
            </div>

            {/* Links - Right on Desktop */}
            <div className="flex flex-wrap justify-center md:justify-end md:flex-1 gap-8 text-[11px] uppercase tracking-[0.2em] font-bold">
              <Link to="/" className="text-gray-400 hover:text-gold transition-colors">{t('navbar.home')}</Link>
              <Link to="/about" className="text-gray-400 hover:text-gold transition-colors">{t('navbar.about')}</Link>
              <Link to="/imports-exports" className="text-gray-400 hover:text-gold transition-colors">{t('navbar.imports_exports')}</Link>
              <Link to="/documentation" className="text-gray-400 hover:text-gold transition-colors">{t('navbar.documents')}</Link>
              <Link to="/contact" className="text-gray-400 hover:text-gold transition-colors">{t('navbar.contact')}</Link>
              <Link to="/privacy-policy" className="text-gray-400 hover:text-gold transition-colors">{t('common.privacy')}</Link>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-gray-600 text-[10px] uppercase tracking-[0.45em] font-medium opacity-60">
              {t('common.copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </footer>
    </div >
  );
}

export default App;
