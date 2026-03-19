import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-rich-black min-h-screen pt-32 pb-24 text-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-widest text-gold text-center">{t('privacy_page.title')}</h1>
                    <div className="w-24 h-1 bg-gold mx-auto mb-12 opacity-50 rounded-full"></div>

                    <div className="space-y-12 text-gray-300 leading-relaxed font-light text-sm md:text-base">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{t('privacy_page.section1.title')}</h2>
                            <p>
                                {t('privacy_page.section1.desc')}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{t('privacy_page.section2.title')}</h2>
                            <p>
                                {t('privacy_page.section2.desc')}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{t('privacy_page.section3.title')}</h2>
                            <p>
                                {t('privacy_page.section3.desc')}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{t('privacy_page.section4.title')}</h2>
                            <p>
                                {t('privacy_page.section4.desc')}
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
