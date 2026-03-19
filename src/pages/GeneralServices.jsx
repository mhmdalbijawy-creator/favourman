import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { serviceImages } from '../data/serviceImages';

const GeneralServices = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';
    const services = t('home.sectors.items', { returnObjects: true }) || [];

    return (
        <div className={`bg-rich-black min-h-screen pt-40 pb-24 ${isAr ? 'font-ar' : 'font-en'}`}>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mb-32 text-center mx-auto"
                >
                    <span className="text-gold uppercase tracking-[0.6em] text-[10px] font-bold mb-6 block">
                        {t('home.sectors.label')}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-none tracking-tighter uppercase">
                        {t('navbar.general_services')}
                    </h1>
                    <div className="w-24 h-[1px] bg-gold/30 mb-10 mx-auto" />
                    <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto opacity-80">
                        {t('home.story.description')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services
                        .map((service, originalIndex) => ({ service, originalIndex }))
                        .filter(({ originalIndex }) => ![1, 4, 7, 8, 9, 21].includes(originalIndex))
                        .map(({ service, originalIndex }, displayIndex) => (
                            <motion.div
                                key={originalIndex}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (displayIndex % 3) * 0.1, duration: 0.6 }}
                            >
                            <Link
                                to={`/service/${originalIndex}`}
                                className="group bg-charcoal/20 border border-white/5 hover:border-gold/30 transition-all duration-700 flex flex-col h-[420px] overflow-hidden"
                            >
                                <div className="h-[45%] overflow-hidden relative">
                                    <img 
                                        src={serviceImages[originalIndex]?.url} 
                                        alt={service.title} 
                                        className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-rich-black to-transparent" />
                                    <div className="absolute top-6 left-6">
                                        <span className="text-[10px] font-bold text-gold/40 group-hover:text-gold transition-colors font-en uppercase tracking-widest">
                                            {(displayIndex + 1).toString().padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-10 flex-grow flex flex-col items-center text-center justify-between">
                                    <div>
                                        <h3 className="mb-6 text-xl text-white group-hover:text-gold transition-colors uppercase tracking-wide">{service.title}</h3>
                                        <p className="text-gray-500 text-[11px] md:text-xs line-clamp-3 mb-8 group-hover:text-gray-400 transition-colors leading-relaxed font-light">
                                            {service.desc}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="flex items-center gap-4 text-gold text-[9px] font-bold uppercase tracking-[0.3em]">
                                            <div className="w-0 group-hover:w-8 h-[1px] bg-gold/40 transition-all duration-500" />
                                            <span>{t('common.learn_more')}</span>
                                            <div className="w-0 group-hover:w-8 h-[1px] bg-gold/40 transition-all duration-500" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GeneralServices;
