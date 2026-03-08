import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import App from './App';
import Logo from './components/Logo';

const IntroLoader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3500); // Intro duration
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-rich-black flex flex-col items-center justify-center overflow-hidden"
                >
                    <div className="relative">
                        <Logo className="w-64 h-64 md:w-80 md:h-80" />

                        {/* Dynamic Slogan with Letter Stagger */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 1 }}
                            className="mt-8 text-center"
                        >
                            <h2 className="text-gold text-xs md:text-sm font-bold uppercase tracking-[1em] mb-4">
                                Favourman International
                            </h2>
                            <div className="h-[1px] w-0 bg-gold/30 mx-auto transition-all duration-1000" style={{ width: '100px' }} />
                            <p className="text-white/50 text-[8px] uppercase tracking-[0.6em] mt-4 font-light">
                                Strategic Excellence In 200 Sovereign Nations
                            </p>
                        </motion.div>
                    </div>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '200px' }}
                        transition={{ duration: 3, ease: "linear" }}
                        className="absolute bottom-20 h-[1px] bg-gold/50"
                    />
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <App />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroLoader;
