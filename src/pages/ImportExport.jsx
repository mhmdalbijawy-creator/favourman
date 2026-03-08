import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ImportExport = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-rich-black min-h-screen pt-32 pb-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mb-24"
                >
                    <span className="text-gold uppercase tracking-[0.6em] text-xs font-bold mb-6 block">
                        {t('import_export.hero.label')}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-12 leading-none tracking-tighter uppercase">
                        {t('import_export.hero.title1')} <br />
                        <span className="text-gold italic font-light lowercase">{t('import_export.hero.title2')}</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-charcoal p-12 border border-white/5 relative group hover:border-gold/30 transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                            <span className="text-8xl font-serif text-gold italic">I</span>
                        </div>
                        <h2 className="text-3xl font-serif text-white mb-8 relative z-10">{t('import_export.import.title')}</h2>
                        <p className="text-gray-400 mb-8 relative z-10 leading-relaxed">{t('import_export.import.desc')}</p>
                        <ul className="space-y-4 relative z-10">
                            {Array.isArray(t('import_export.import.list', { returnObjects: true })) && t('import_export.import.list', { returnObjects: true }).map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 text-gray-300"
                                >
                                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="bg-charcoal p-12 border border-white/5 relative group hover:border-gold/30 transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                            <span className="text-8xl font-serif text-gold italic">E</span>
                        </div>
                        <h2 className="text-3xl font-serif text-white mb-8 relative z-10">{t('import_export.export.title')}</h2>
                        <p className="text-gray-400 mb-8 relative z-10 leading-relaxed">{t('import_export.export.desc')}</p>
                        <ul className="space-y-4 relative z-10">
                            {Array.isArray(t('import_export.export.list', { returnObjects: true })) && t('import_export.export.list', { returnObjects: true }).map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 text-gray-300"
                                >
                                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ImportExport;
