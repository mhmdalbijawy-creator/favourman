import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Consultancy = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-rich-black min-h-screen text-white pt-24 pb-16">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-gold uppercase tracking-widest block mb-4">{t('consultancy_page.hero.label')}</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-none tracking-tighter uppercase">
                        {t('consultancy_page.hero.title1')} <br />
                        <span className="text-gold italic font-light lowercase">{t('consultancy_page.hero.title2')}</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
                        {t('consultancy_page.hero.description')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Array.isArray(t('consultancy_page.items', { returnObjects: true })) && t('consultancy_page.items', { returnObjects: true }).map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 border border-white/5 hover:border-gold/50 transition-all duration-300 rounded-lg group bg-charcoal"
                        >
                            <div className="h-12 w-12 border-2 border-gold rounded-full flex items-center justify-center mb-6 text-gold font-bold group-hover:bg-gold group-hover:text-rich-black transition-all">
                                {i + 1}
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors">{item.title}</h3>
                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Consultancy;
