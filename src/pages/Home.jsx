import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { serviceImages } from '../data/serviceImages';

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

const Home = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [hoveredMember, setHoveredMember] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

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
        { label: t('common.stats.regions'), value: 200, suffix: "+" },
        { label: t('common.stats.sectors'), value: 21, suffix: "" },
        { label: t('common.stats.experience'), value: 12, suffix: "+" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        const formData = new FormData(e.target);
        formData.append("access_key", "57d25b96-1837-4c3e-9275-3f7267ae25ad");
        formData.append("from_name", "Favourman Website");
        formData.append("subject", "New Inquiry from Home Page");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                setIsSubmitted(true);
                e.target.reset();
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                setError(data.message || t('common.error_message'));
            }
        } catch (err) {
            setError(t('common.error_message'));
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className={`w-full overflow-hidden ${isAr ? 'font-ar' : 'font-en'}`}>
            {/* 1. Hero Section */}
            <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-rich-black">
                <div className="absolute inset-0 z-0 text-center">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-20 brightness-30">
                        <source src="https://player.vimeo.com/external/494254427.sd.mp4?s=ced5d8205f0d238b776fd17d093a1ee40a927a05&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-rich-black/95 via-transparent to-rich-black z-10" />
                </div>

                <div className="container-custom z-20 text-center mt-32 md:mt-20">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                        <h1 className="mb-8 uppercase">
                            {t('hero.title1')} <br />
                            <span className="text-gold font-light lowercase">{t('hero.title2')}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-16 font-light">
                            {t('hero.subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xl mx-auto">
                            <Link to="/general-services" className="group relative w-full sm:flex-1 px-6 py-4 md:py-5 bg-transparent border border-gold/40 hover:border-gold text-gold font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[11px] md:text-xs transition-all duration-500 overflow-hidden flex items-center justify-center hover:bg-gold/5 active:scale-95">
                                <span className="relative z-10 transition-colors duration-500 group-hover:text-gold">{t('hero.cta_capabilities')}</span>
                                <div className="absolute inset-0 bg-gold translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out opacity-10" />
                            </Link>
                            <Link to="/contact" className="group relative w-full sm:flex-1 px-6 py-4 md:py-5 bg-transparent border border-gold/40 hover:border-gold text-gold font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[11px] md:text-xs transition-all duration-500 overflow-hidden flex items-center justify-center hover:bg-gold/5 active:scale-95">
                                <span className="relative z-10 transition-colors duration-500 group-hover:text-gold">{t('hero.initiate_protocol')}</span>
                                <div className="absolute inset-0 bg-gold translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out opacity-10" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Heritage & Vision Section (About Us Part 1) */}
            <section className="section-padding bg-rich-black relative overflow-hidden" id="about">
                <div className="absolute top-20 left-10 text-[15vw] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter leading-none whitespace-nowrap hidden lg:block">
                    {t('home.story.label')}
                </div>

                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: isAr ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="lg:col-span-5 relative"
                        >
                            <div className="relative aspect-[3/4] group">
                                <img 
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
                                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-1000 rounded-sm shadow-2xl" 
                                    alt="Global Expansion" 
                                />
                                <div className="absolute inset-0 border border-gold/20 -m-4 -z-10 group-hover:m-0 transition-all duration-700" />
                                
                                <div className={`absolute bottom-8 ${isAr ? '-left-8' : '-right-8'} bg-charcoal p-8 border border-gold/30 shadow-2xl max-w-[240px] hidden md:block`}>
                                    <p className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4">{t('home.story.founder')}</p>
                                    <p className="text-white text-sm font-light leading-relaxed">
                                        {isAr ? "رؤية استراتيجية تقود الابتكار في 21 نشاطاً عالمياً." : "Strategic vision leading innovation across 21 global activities."}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="lg:col-span-7 space-y-10"
                        >
                            <div>
                                <span className="text-gold uppercase tracking-[0.6em] text-[10px] font-bold mb-6 block">
                                    {t('home.story.label')}
                                </span>
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                                    {t('home.story.title')} <br />
                                    <span className="text-gold italic font-light lowercase">{t('home.story.subtitle')}</span>
                                </h2>
                                <div className="w-20 h-[2px] bg-gold/40 mb-10" />
                            </div>

                            <div className="space-y-8">
                                <p className="text-xl text-gray-300 font-light leading-relaxed">
                                    {t('home.story.description')}
                                </p>
                                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 pt-8">
                                    {/* Vertical/Horizontal Divider */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center h-[80%] opacity-20">
                                        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
                                        <div className="w-2 h-2 rotate-45 border border-gold bg-rich-black -my-1" />
                                        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
                                    </div>
                                    
                                    <div className="md:pe-10 relative">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-8 h-[1px] bg-gold/30" />
                                            <h4 className="text-white font-bold uppercase tracking-wider text-sm">{t('about_page.overview.who_we_are.title')}</h4>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed">{t('about_page.overview.who_we_are.desc')}</p>
                                    </div>

                                    <div className="md:ps-10 relative">
                                        {/* Mobile horizontal divider */}
                                        <div className="md:hidden w-full h-[1px] bg-gold/10 my-8 flex items-center justify-center">
                                            <div className="w-2 h-2 rotate-45 border border-gold/30 bg-rich-black" />
                                        </div>

                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-8 h-[1px] bg-gold/30" />
                                            <h4 className="text-white font-bold uppercase tracking-wider text-sm">{t('about_page.overview.what_we_do.title')}</h4>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed">{t('about_page.overview.what_we_do.desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Methodology Section (About Us Part 2) */}
            <section className="section-padding bg-charcoal/10 relative">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">
                            {t('about_page.process.subtitle')}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
                            {t('about_page.process.title')}
                        </h2>
                        <div className="w-12 h-[2px] bg-gold mx-auto mt-8 opacity-40" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        <div className="hidden lg:block absolute top-[40%] left-0 w-full h-[1px] bg-gold/10 z-0" />
                        
                        {(t('about_page.process.steps', { returnObjects: true }) || []).map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="relative z-10 group"
                            >
                                <div className="bg-rich-black border border-white/5 p-10 hover:border-gold/30 transition-all duration-700 h-full group-hover:-translate-y-2">
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-4xl font-black text-gold/10 group-hover:text-gold/20 transition-colors duration-700 font-en">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                        <div className="w-10 h-10 border border-gold/20 flex items-center justify-center rounded-full group-hover:border-gold group-hover:bg-gold/5 transition-all duration-700">
                                            <i className={`fa-solid ${
                                                index === 0 ? 'fa-comments' : 
                                                index === 1 ? 'fa-compass-drafting' : 
                                                index === 2 ? 'fa-gears' : 'fa-chart-line'
                                            } text-gold/40 group-hover:text-gold text-sm`} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider group-hover:text-gold transition-colors duration-500">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed font-light">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Team Showcase (Moving Background + Static Images) */}
            <section 
                ref={sectionRef}
                onMouseMove={handleMouseMove}
                className="section-padding bg-rich-black relative overflow-hidden"
            >
                {/* Dynamic Mouse Spotlight */}
                <motion.div 
                    className="pointer-events-none absolute z-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]"
                    animate={{
                        x: mousePos.x - 300,
                        y: mousePos.y - 300,
                    }}
                    transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
                />

                {/* Infinite Marquee Background Text */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden whitespace-nowrap opacity-[0.02] pointer-events-none select-none z-0">
                    <motion.div 
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="inline-block text-[25vw] font-black uppercase tracking-tighter"
                    >
                        VISIONARIES • INNOVATORS • LEADERS • VISIONARIES • INNOVATORS • LEADERS • 
                    </motion.div>
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-32 text-center md:text-start"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">
                            {t('about_page.team.title')}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="relative w-full group"
                            >
                                {/* Role Background Text - Static Subtle */}
                                <div className={`absolute -top-6 ${isAr ? '-left-4' : '-right-4'} z-0 opacity-[0.03] pointer-events-none`}>
                                    <span className="text-4xl font-black text-transparent uppercase whitespace-nowrap" 
                                          style={{ WebkitTextStroke: '1px rgba(212, 175, 55, 0.4)' }}>
                                        {member.role.split(' ')[0]}
                                    </span>
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Image Container - Smaller & Centered */}
                                    <div className="relative w-48 h-64 mb-6 overflow-visible">
                                        <div className="relative w-full h-full">
                                            {/* Static Subtle Glow */}
                                            <div className="absolute inset-x-2 inset-y-6 bg-gold/5 blur-[30px] -z-10" />
                                            
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-contain filter grayscale contrast-125 brightness-110"
                                                style={{
                                                    maskImage: "linear-gradient(to bottom, black 60%, transparent 98%)",
                                                    WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 98%)",
                                                }}
                                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${member.name.replace(" ", "+")}&background=0D1B2A&color=D4AF37&size=400` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Info Block - Professional Executive Profile */}
                                    <div className="space-y-4 w-full">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-bold text-gold tracking-tight uppercase leading-none">
                                                {member.name}
                                            </h3>
                                            <p className="text-gold/60 text-[9px] uppercase font-black tracking-[0.3em]">
                                                {member.role}
                                            </p>
                                        </div>
                                        
                                        <div className="w-8 h-[1px] bg-gold/30 mx-auto" />
                                        
                                        <div className="relative px-4 group/bio">
                                            {/* Accent Vertical Line */}
                                            <div className={`absolute top-0 bottom-0 w-[1px] bg-gold/20 group-hover:bg-gold/50 transition-colors duration-500 ${isAr ? 'right-0' : 'left-0'}`} />
                                            
                                            <p className="text-gray-400 text-[11px] leading-relaxed font-light text-justify-center opacity-90 group-hover:text-gray-300 transition-colors duration-500 italic">
                                                {member.bio}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Metrics Section (About Us Part 4) */}
            <section className="section-padding bg-charcoal/10 border-y border-white/5">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="text-center"
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

            {/* 6. Strategic Contact Interface */}
            <section className="section-padding bg-rich-black" id="contact">
                <div className="container-custom max-w-4xl">
                    <span className="text-gold uppercase tracking-[0.8em] text-[10px] font-bold mb-10 block text-center opacity-60">{t('contact_info.inquiry_protocol')}</span>
                    <h2 className="text-center mb-20">{t('contact_info.connect_strategically')}</h2>

                    <form className="space-y-12" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="group/input">
                                <label className="text-gold/50 text-[10px] uppercase font-bold tracking-[0.3em] mb-4 block group-focus-within/input:text-gold transition-colors">{t('service_detail.name')}</label>
                                <input required name="name" type="text" className="bg-transparent border-b border-white/10 w-full py-3 text-white focus:outline-none focus:border-gold transition-all font-light" />
                            </div>
                            <div className="group/input">
                                <label className="text-gold/50 text-[10px] uppercase font-bold tracking-[0.3em] mb-4 block group-focus-within/input:text-gold transition-colors">{t('service_detail.email')}</label>
                                <input required name="email" type="email" className="bg-transparent border-b border-white/10 w-full py-3 text-white focus:outline-none focus:border-gold transition-all font-light" />
                            </div>
                        </div>
                        <div className="group/input">
                            <label className="text-gold/50 text-[10px] uppercase font-bold tracking-[0.3em] mb-4 block group-focus-within/input:text-gold transition-colors">{t('service_detail.brief')}</label>
                            <textarea required name="message" rows="4" className="bg-transparent border-b border-white/10 w-full py-3 text-white focus:outline-none focus:border-gold transition-all font-light resize-none" />
                        </div>

                        <button disabled={isSubmitting} className="group relative w-full py-6 bg-transparent border border-gold/40 hover:border-gold text-gold uppercase font-black tracking-[0.5em] text-xs transition-all duration-700 overflow-hidden shadow-xl">
                            <span className="relative z-10 group-hover:text-gold transition-colors duration-700">{isSubmitting ? t('common.submitting') : t('contact_info.submit_proposal')}</span>
                            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-10" />
                        </button>

                        {isSubmitted && <p className="text-gold text-center font-bold tracking-[0.2em] text-xs pt-4 animate-pulse uppercase">{t('contact_info.transmitted')}</p>}
                        {error && <p className="text-red-500 text-center text-xs pt-4">{error}</p>}
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home;
