import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Logo from '../components/Logo';

const Documentation = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-rich-black min-h-screen pt-40 pb-24 overflow-hidden relative">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-1/2 h-screen bg-gold/5 blur-[120px] rounded-full translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mb-32"
                >
                    <span className="text-gold uppercase tracking-[0.8em] text-[10px] font-bold mb-8 p-3 border border-gold/20 inline-block bg-gold/5">
                        {t('documentation.label')}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-none tracking-tighter uppercase">
                        {t('documentation.hero').split(' ')[0]} <br />
                        <span className="text-gold italic font-light lowercase">{t('documentation.hero').split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl border-l border-gold/30 ps-8 italic">
                        {t('documentation.description')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* List of Documents */}
                    <div className="space-y-px bg-white/5 border border-white/5">
                        {t('documentation.items', { returnObjects: true }).map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-rich-black p-12 group hover:bg-charcoal transition-all duration-500 relative"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold group-hover:bg-gold group-hover:text-rich-black transition-all">
                                        {index + 1}
                                    </div>
                                    <i className="fa-solid fa-file-shield text-gold/20 text-2xl group-hover:text-gold/40 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest">{item.title}</h3>
                                <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Visual Stamp Card - Inspired by User Image 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-charcoal border border-gold/10 p-16 flex flex-col items-center text-center relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* The Official Stamp (High-fidelity reconstruction of Image 2) */}
                        <div className="w-full max-w-[450px] aspect-[1.5/1] relative flex items-center justify-center mb-12">
                            <svg viewBox="0 0 500 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                                {/* Outer Dual-Oval Border */}
                                <ellipse cx="250" cy="170" rx="240" ry="160" stroke="#D4AF37" strokeWidth="3" />
                                <ellipse cx="250" cy="170" rx="232" ry="152" stroke="#D4AF37" strokeWidth="1.5" />

                                {/* Inner Oval Border */}
                                <ellipse cx="250" cy="170" rx="180" ry="110" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.5" />

                                {/* Top Text Path */}
                                <defs>
                                    <path id="topCurve" d="M60,170 Q60,40 250,40 Q440,40 440,170" />
                                    <path id="bottomCurve" d="M60,170 Q60,300 250,300 Q440,300 440,170" />
                                </defs>

                                <text className="fill-gold font-bold uppercase tracking-[0.3em] transition-all duration-700 hover:tracking-[0.5em]" style={{ fontSize: '13px' }}>
                                    <textPath xlinkHref="#topCurve" startOffset="50%" textAnchor="middle">
                                        {t('documentation.stamp.title')}
                                    </textPath>
                                </text>

                                <text className="fill-gold font-bold uppercase tracking-[0.2em] opacity-60" style={{ fontSize: '10px' }}>
                                    <textPath xlinkHref="#bottomCurve" startOffset="50%" textAnchor="middle" side="right">
                                        {t('documentation.stamp.tagline')}
                                    </textPath>
                                </text>

                                {/* Side Stars */}
                                <path d="M40,170 l5,-2 l2,-5 l2,5 l5,2 l-5,2 l-2,5 l-2,-5 z" fill="#D4AF37" />
                                <path d="M460,170 l5,-2 l2,-5 l2,5 l5,2 l-5,2 l-2,5 l-2,-5 z" fill="#D4AF37" />

                                {/* Center Branding */}
                                <g transform="translate(250, 140)">
                                    <g transform="scale(0.8) translate(0, -20)">
                                        <Logo />
                                    </g>
                                    <text y="45" textAnchor="middle" className="fill-white font-bold uppercase tracking-[0.4em]" style={{ fontSize: '28px' }}>Favourman</text>
                                    <text y="75" textAnchor="middle" className="fill-gold/80 font-mono tracking-widest" style={{ fontSize: '12px' }}>CR: 5103402</text>
                                </g>
                            </svg>
                        </div>

                        <h4 className="text-gold uppercase tracking-[0.5em] text-xs font-bold mb-6">{t('documentation.seal_title')}</h4>
                        <p className="text-gray-500 font-light text-sm max-w-xs leading-relaxed">
                            {t('documentation.seal_desc')}
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Documentation;
