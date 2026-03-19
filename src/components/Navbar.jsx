import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    const mainLinks = [
        { name: t('navbar.home'), path: '/' },
        { name: t('navbar.services'), isDropdown: true },
        { name: t('navbar.documents'), path: '/documentation' },
        { name: t('navbar.contact'), path: '/contact' },
    ];

    const serviceLinks = [
        { name: t('navbar.general_services'), path: '/general-services' },
        { name: t('navbar.imports_exports'), path: '/imports-exports' },
        { name: t('navbar.facilitation_energy'), path: '/facilitation-energy' },
        { name: t('navbar.digital_tech'), path: '/digital-tech' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setIsServicesOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? `bg-rich-black/95 backdrop-blur-xl ${i18n.language === 'en' ? 'py-3' : 'py-4'}` : `bg-transparent ${i18n.language === 'en' ? 'py-5' : 'py-8'}`}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex flex-row items-center gap-3 md:gap-5 group relative max-w-[80vw] brand-exclusive" dir="ltr">
                    <Logo className="w-14 h-14 md:w-28 md:h-28 shrink-0" />
                    <div className="flex flex-col relative overflow-hidden text-left" dir="ltr">
                        <motion.div initial="initial" whileHover="hover" className="relative" dir="ltr">
                            <span className="text-base md:text-lg font-bold tracking-[0.18em] text-white leading-none font-en flex flex-row overflow-hidden" dir="ltr">
                                {"FAVOURMAN".split("").map((letter, i) => (
                                    <motion.span key={i} initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: i * 0.05, duration: 0.8, ease: [0.33, 1, 0.68, 1] }} className="inline-block">{letter}</motion.span>
                                ))}
                                <motion.span animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-gold">.</motion.span>
                            </span>
                        </motion.div>
                        <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 0.4, x: 0 }} transition={{ delay: 1, duration: 1 }} className="text-[6px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.45em] text-gold mt-1 md:mt-2 font-bold group-hover:opacity-100 group-hover:text-white transition-all duration-700 whitespace-nowrap">
                            {t('navbar.expertise')}
                        </motion.span>
                    </div>
                </Link>

                <div className="hidden lg:flex gap-10 items-center">
                    <div className={`flex items-center ${i18n.language === 'en' ? 'gap-6' : 'gap-10'}`}>
                        {mainLinks.map((link) => (
                            link.isDropdown ? (
                                <div
                                    key="dropdown"
                                    className="relative"
                                    onMouseEnter={() => setIsServicesOpen(true)}
                                    onMouseLeave={() => setIsServicesOpen(false)}
                                >
                                    <button
                                        className={`${i18n.language === 'en' ? 'text-[10px]' : 'text-[12px]'} uppercase font-bold text-gray-300 hover:text-gold transition-all flex items-center gap-2 tracking-[0.2em] py-2`}
                                    >
                                        {link.name}
                                        <motion.i
                                            animate={{ rotate: isServicesOpen ? 180 : 0 }}
                                            className="fa-solid fa-chevron-down text-[8px]"
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isServicesOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.3 }}
                                                className={`absolute top-full ${isAr ? 'right-0' : 'left-0'} min-w-[300px] mt-2 bg-rich-black/95 backdrop-blur-2xl border border-gold/10 py-4 shadow-2xl z-[60]`}
                                            >
                                                {serviceLinks.map((sLink) => (
                                                    <Link
                                                        key={sLink.name}
                                                        to={sLink.path}
                                                        className={`block px-8 py-4 text-[10px] uppercase font-bold tracking-[0.15em] text-gray-400 hover:text-gold hover:bg-gold/5 transition-all ${isAr ? 'text-right' : 'text-left'}`}
                                                    >
                                                        {sLink.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`${i18n.language === 'en' ? 'text-[10px]' : 'text-[12px]'} uppercase font-bold hover:text-gold transition-all relative group ${location.pathname === link.path ? 'text-gold' : 'text-gray-300'} ${i18n.language === 'en' ? 'tracking-[0.2em]' : ''}`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-700 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
                                </Link>
                            )
                        ))}
                    </div>
                    <button onClick={toggleLanguage} className="bg-transparent border border-gold/40 px-6 py-2 hover:bg-gold/10 hover:border-gold transition-all text-[11px] font-bold text-gold uppercase rounded-sm">
                        {i18n.language === 'en' ? 'العربية' : 'English'}
                    </button>
                </div>

                <div className="flex items-center gap-6 lg:hidden">
                    <button onClick={toggleLanguage} className="text-gold font-bold text-[10px] uppercase border border-gold/20 px-3 py-1 rounded">
                        {i18n.language === 'en' ? 'AR' : 'EN'}
                    </button>
                    <button className="text-gold text-3xl" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 z-[60] lg:hidden" />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.4, ease: "circOut" }} className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[80%] max-w-[400px] bg-[#000000] z-[70] lg:hidden flex flex-col shadow-2xl border-l border-white/10">
                            <div className="flex items-center justify-between p-8 border-b border-white/5 bg-[#000000]">
                                <Logo className="w-12 h-12" />
                                <button onClick={() => setIsOpen(false)} className="p-3 text-gold hover:scale-110 transition-transform">
                                    <FiX className="w-8 h-8" />
                                </button>
                            </div>

                            <nav className="flex-1 px-8 py-10 flex flex-col gap-6 overflow-y-auto bg-[#000000]">
                                {mainLinks.map((link, i) => (
                                    <div key={link.name}>
                                        {link.isDropdown ? (
                                            <div className="flex flex-col gap-4">
                                                <button
                                                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                                                    className={`text-2xl font-black uppercase transition-all duration-500 hover:text-gold flex items-center justify-between py-2 ${isAr ? 'flex-row-reverse text-right' : 'flex-row text-left tracking-[0.15em]'}`}
                                                >
                                                    {link.name}
                                                    <motion.i animate={{ rotate: isServicesOpen ? 180 : 0 }} className="fa-solid fa-chevron-down text-sm" />
                                                </button>
                                                <AnimatePresence>
                                                    {isServicesOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className={`flex flex-col gap-4 overflow-hidden ${isAr ? 'border-r pr-6 border-gold/20' : 'border-l pl-6 border-gold/20'}`}
                                                        >
                                                            {serviceLinks.map((sLink) => (
                                                                <Link key={sLink.name} to={sLink.path} onClick={() => setIsOpen(false)} className={`text-sm font-bold uppercase tracking-[0.1em] text-gray-500 hover:text-gold py-2 ${isAr ? 'text-right' : 'text-left'}`}>
                                                                    {sLink.name}
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                                <Link to={link.path} onClick={() => setIsOpen(false)} className={`text-2xl font-black uppercase transition-all duration-500 hover:text-gold block py-2 ${location.pathname === link.path ? 'text-gold' : 'text-white'} ${isAr ? 'tracking-normal text-right' : 'tracking-[0.15em]'}`}>
                                                    {link.name}
                                                </Link>
                                            </motion.div>
                                        )}
                                    </div>
                                ))}
                            </nav>

                            <div className="p-8 border-t border-white/5 bg-[#000000]">
                                <button onClick={toggleLanguage} className="w-full bg-gold/10 border border-gold/40 py-5 text-gold uppercase text-sm font-black tracking-widest hover:bg-gold hover:text-black transition-all rounded-sm">
                                    {isAr ? 'Switch to English' : 'التحويل للعربية'}
                                </button>
                                <p className="text-[8px] text-gray-600 uppercase tracking-[0.4em] mt-6 text-center opacity-50">Favourman International • Excellence Hub</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
