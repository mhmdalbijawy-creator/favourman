import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const GlobalPresence = () => {
    const { t } = useTranslation();

    const locations = [
        { city: t('global_presence.locations.dubai.city'), type: t('global_presence.locations.dubai.type') },
        { city: t('global_presence.locations.london.city'), type: t('global_presence.locations.london.type') },
        { city: t('global_presence.locations.new_york.city'), type: t('global_presence.locations.new_york.type') },
        { city: t('global_presence.locations.shanghai.city'), type: t('global_presence.locations.shanghai.type') },
    ];

    return (
        <div className="min-h-screen pt-32 bg-rich-black text-white flex flex-col items-center justify-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center px-6"
            >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-none tracking-tighter uppercase">
                    {t('global_presence.hero.title')}
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16">
                    {t('global_presence.hero.description')}
                </p>
            </motion.div>

            <div className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
                {locations.map((loc, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="p-8 border-t border-b border-gold/20 group hover:bg-gold/5 transition-colors duration-500"
                    >
                        <h3 className="text-3xl font-serif text-white mb-2 group-hover:text-gold transition-colors">{loc.city}</h3>
                        <p className="text-gold text-sm tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">{loc.type}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-20 w-full h-[300px] bg-charcoal/20 flex flex-col items-center justify-center text-gray-600 font-serif italic text-2xl relative"
            >
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-no-repeat bg-contain" />
                <span className="relative z-10">{t('global_presence.map_placeholder')}</span>
                <div className="mt-4 w-24 h-[1px] bg-gold/20" />
            </motion.div>
        </div>
    );
};

export default GlobalPresence;
