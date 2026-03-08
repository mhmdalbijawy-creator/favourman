import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Services = () => {
    const { t } = useTranslation();

    const services = [
        { title: t('services.items.0.title'), description: t('services.items.0.desc'), link: "/import-export", index: "01" },
        { title: t('services.items.1.title'), description: t('services.items.1.desc'), link: "/consultancy", index: "02" },
        { title: t('services.items.2.title'), description: t('services.items.2.desc'), link: "/partnerships", index: "03" },
        { title: t('services.items.3.title'), description: t('services.items.3.desc'), link: "/services", index: "04" }
    ];

    return (
        <div className="bg-rich-black min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mb-24"
                >
                    <span className="text-gold uppercase tracking-[0.6em] text-xs font-bold mb-6 block">{t('services.hero.label')}</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-12 leading-none tracking-tighter uppercase">
                        {t('services.hero.title')} <br />
                        <span className="text-gold italic font-light lowercase">{t('services.hero.subtitle1')}</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">{t('services.hero.description')}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="bg-rich-black p-12 md:p-16 group relative transition-all duration-500 overflow-hidden border border-white/5"
                        >
                            <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-700" />

                            <div className="relative z-10 flex flex-col h-full">
                                <span className="text-gold/20 font-serif text-4xl mb-12 transition-colors duration-500 group-hover:text-gold/40">{service.index}</span>
                                <h3 className="text-3xl font-serif text-white mb-6 group-hover:text-gold transition-colors">{service.title}</h3>
                                <p className="text-gray-500 font-light leading-relaxed mb-12 max-w-sm group-hover:text-gray-400 transition-colors">{service.description}</p>
                                <Link to={service.link} className="mt-auto inline-flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold text-gold">
                                    <span>{t('common.explore')}</span>
                                    <motion.div
                                        className="w-8 h-[1px] bg-gold/30 group-hover:bg-gold transition-all"
                                        whileHover={{ width: 64 }}
                                    />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
