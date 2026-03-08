import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (inView) {
            let start = null;
            const step = (timestamp) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / (duration * 1000), 1);
                const easeOutQuad = 1 - (1 - progress) * (1 - progress);
                setCount(Math.floor(easeOutQuad * end));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }, [inView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const team = [
        {
            name: t('about_page.team.members.chairman.name'),
            role: t('about_page.team.members.chairman.role'),
            bio: t('about_page.team.members.chairman.bio'),
            image: "/assets/team/mohammed-transparent.png"
        },
        {
            name: t('about_page.team.members.ceo.name'),
            role: t('about_page.team.members.ceo.role'),
            bio: t('about_page.team.members.ceo.bio'),
            image: "/assets/team/bashir-transparent.png"
        },
        {
            name: t('about_page.team.members.omer.name'),
            role: t('about_page.team.members.omer.role'),
            bio: t('about_page.team.members.omer.bio'),
            image: "/assets/team/dr-omer-transparent.png"
        },
        {
            name: t('about_page.team.members.manager.name'),
            role: t('about_page.team.members.manager.role'),
            bio: t('about_page.team.members.manager.bio'),
            image: "/assets/team/miqdad-transparent.png"
        }
    ];

    const stats = [
        { label: t('common.stats.standard'), value: 120, suffix: "+" },
        { label: t('common.stats.regions'), value: 8, suffix: "" },
        { label: t('common.stats.sectors'), value: 21, suffix: "" },
        { label: t('common.stats.experience'), value: 12, suffix: "+" }
    ];


    return (
        <div className={`bg-rich-black min-h-screen pt-32 pb-24 overflow-hidden ${isAr ? 'font-ar' : 'font-en'}`}>
            {/* 1. Hero Section */}
            <section className="container-custom relative text-center mb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute -top-20 right-1/2 translate-x-1/2 w-full h-full bg-gold/5 blur-[120px] rounded-full pointer-events-none"
                />

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-gold uppercase tracking-[0.6em] text-[10px] font-bold mb-6 block"
                    >
                        {t('about_page.hero.label')}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-10"
                    >
                        {t('about_page.hero.title')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-12"
                    >
                        {t('about_page.hero.tagline')}
                    </motion.p>

                    <div className="w-24 h-[1px] bg-gold/30 mx-auto my-12" />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-loose"
                    >
                        {t('about_page.hero.mission')}
                    </motion.p>
                </div>
            </section>

            {/* 2. Overview Section */}
            <section className="section-padding bg-charcoal/20 border-y border-white/5">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: isAr ? 40 : -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-bold text-white uppercase tracking-wider flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-gold" />
                                {t('about_page.overview.who_we_are.title')}
                            </h2>
                            <p className="text-gray-400 leading-relaxed font-light text-lg">
                                {t('about_page.overview.who_we_are.desc')}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: isAr ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-3xl font-bold text-white uppercase tracking-wider flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-gold" />
                                {t('about_page.overview.what_we_do.title')}
                            </h2>
                            <p className="text-gray-400 leading-relaxed font-light text-lg">
                                {t('about_page.overview.what_we_do.desc')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Team Showcase */}
            <section className="section-padding relative">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-32"
                    >
                        <h2>
                            {t('about_page.team.title')}
                        </h2>
                        <div className="w-12 h-[2px] bg-gold mx-auto mt-8 opacity-40" />
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 md:gap-12">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="group relative flex flex-col items-center"
                            >
                                {/* Team Photo - BW Filter + Subtle White Top Glow */}
                                <div className="relative -mb-12 w-full flex justify-center overflow-visible">
                                    {/* Subtle white highlight outline around upper edges */}
                                    <div
                                        className="relative"
                                        style={{
                                            filter: "drop-shadow(0 -5px 8px rgba(255,255,255,0.15)) drop-shadow(0 -1px 2px rgba(255,255,255,0.3))"
                                        }}
                                    >
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-[180px] h-[240px] md:w-[240px] md:h-[320px] object-contain object-top select-none grayscale brightness-110 contrast-125"
                                            style={{
                                                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 88%)",
                                                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 88%)",
                                            }}
                                            onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + member.name.replace(" ", "+") + "&background=0D1B2A&color=FFFFFF&size=400" }}
                                        />
                                    </div>
                                    <div className="absolute inset-x-0 -bottom-8 h-16 bg-rich-black blur-[20px] opacity-100 -z-10" />
                                </div>

                                <div className="text-center w-full">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-gold transition-colors duration-500">
                                        {member.name}
                                    </h3>
                                    <div className="relative inline-block mb-4">
                                        <p className="text-gold text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold leading-loose">
                                            {member.role}
                                        </p>
                                    </div>
                                    <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed font-light max-w-[280px] mx-auto opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                        {member.bio}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Strategic Metrics */}
            <section className="section-padding bg-charcoal/20">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="text-center p-6"
                            >
                                <h3 className="text-5xl md:text-7xl font-black text-white mb-6">
                                    <AnimatedCounter end={stat.value} duration={2.5} suffix={stat.suffix} />
                                </h3>
                                <div className="w-8 h-[1px] bg-gold mx-auto mb-4" />
                                <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;
