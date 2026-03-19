import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Partnerships = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-rich-black min-h-screen text-white flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl text-center">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold text-white mb-12 leading-none tracking-tighter uppercase"
                >
                    <span className="text-gold italic font-light lowercase">{t('partnerships_page.title1')}</span> <br /> {t('partnerships_page.title2')} {t('partnerships_page.title3')}
                </motion.h1>

                <div className="flex flex-col md:flex-row items-center gap-12 justify-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/3 bg-charcoal p-10 border border-gold/10 group hover:border-gold/30 transition-all duration-500"
                    >
                        <h3 className="text-2xl font-serif mb-4 text-gold group-hover:text-white transition-colors">{t('partnerships_page.suppliers.title')}</h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">{t('partnerships_page.suppliers.desc')}</p>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="w-20 h-[1px] md:w-[1px] md:h-20 bg-gold/40"
                    />

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/3 bg-charcoal p-10 border border-gold/10 group hover:border-gold/30 transition-all duration-500"
                    >
                        <h3 className="text-2xl font-serif mb-4 text-gold group-hover:text-white transition-colors">{t('partnerships_page.distributors.title')}</h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">{t('partnerships_page.distributors.desc')}</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <Link to="/contact" className="group relative inline-flex items-center justify-center px-12 py-5 bg-gold overflow-hidden transition-all duration-500">
                        <span className="relative z-10 text-rich-black font-bold uppercase tracking-[0.2em] text-sm">
                            {t('home.partnerships.cta')}
                        </span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Partnerships;
