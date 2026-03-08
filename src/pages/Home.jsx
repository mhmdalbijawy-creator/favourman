import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { serviceImages } from '../data/serviceImages';

const Home = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

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
            {/* 1. Hero Section - Optimized Heading Sizes */}
            <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-rich-black">
                <div className="absolute inset-0 z-0 text-center">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-20 brightness-30">
                        <source src="https://player.vimeo.com/external/494254427.sd.mp4?s=ced5d8205f0d238b776fd17d093a1ee40a927a05&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-rich-black/95 via-transparent to-rich-black z-10" />
                </div>

                <div className="container-custom z-20 text-center mt-32 md:mt-20">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                        <h1 className="mb-8">
                            {t('hero.title1')} <br />
                            <span className="text-gold font-light lowercase">{t('hero.title2')}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-16 font-light">
                            {t('hero.subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xl mx-auto">
                            <a href="#services" className="group relative w-full sm:flex-1 px-6 py-4 md:py-5 bg-gold border border-gold text-rich-black font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[11px] md:text-xs transition-all duration-500 overflow-hidden flex items-center justify-center hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] active:scale-95">
                                <span className="relative z-10 transition-colors duration-500 group-hover:text-gold">{t('hero.cta_capabilities')}</span>
                                <div className="absolute inset-0 bg-rich-black translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            </a>
                            <a href="#contact" className="group relative w-full sm:flex-1 px-6 py-4 md:py-5 bg-transparent border border-gold/40 hover:border-gold text-gold font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[11px] md:text-xs transition-all duration-500 overflow-hidden flex items-center justify-center hover:bg-gold/5 active:scale-95">
                                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">{t('hero.initiate_protocol')}</span>
                                <div className="absolute inset-0 bg-gold translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Story Section */}
            <section className="section-padding bg-rich-black" id="story">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div initial={{ opacity: 0, x: isAr ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <span className="text-gold uppercase tracking-[0.6em] text-[10px] font-bold mb-6 block">{t('home.story.label')}</span>
                            <h2 className="mb-10">
                                {t('home.story.title')} <br />
                                <span className="text-gold italic font-light lowercase">{t('home.story.subtitle')}</span>
                            </h2>
                            <p className="text-lg text-gray-400 mb-10 border-l border-gold/20 ps-8">
                                {t('home.story.description')}
                            </p>
                        </motion.div>
                        <div className="relative aspect-video group overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 transition-all duration-1000" alt="Executive HQ" />
                            <div className="absolute inset-0 border border-white/5" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Capabilities Selection */}
            <section className="section-padding bg-charcoal/20" id="services">
                <div className="container-custom">
                    <div className="mb-24">
                        <span className="text-gold uppercase tracking-[0.6em] text-[10px] font-bold mb-6 block">{t('home.sectors.label')}</span>
                        <h2>
                            {t('home.sectors.title')} <br />
                            <span className="text-gold italic font-light lowercase">{t('home.sectors.subtitle')}</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {t('home.sectors.items', { returnObjects: true }).map((service, index) => (
                            <Link
                                to={`/service/${index}`}
                                key={index}
                                className="group bg-rich-black border border-white/5 hover:border-gold/30 transition-all duration-700 flex flex-col h-[420px] overflow-hidden"
                            >
                                <div className="h-1/2 overflow-hidden relative">
                                    <img src={serviceImages[index]?.url} alt={service.title} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-rich-black to-transparent" />
                                </div>
                                <div className="p-8 flex-grow flex flex-col justify-end">
                                    <h3 className="mb-4 text-lg md:text-xl">{service.title}</h3>
                                    <p className="text-gray-500 text-[10px] md:text-xs line-clamp-2 mb-6 group-hover:text-gray-300 transition-colors">{service.desc}</p>
                                    <div className="flex items-center gap-4 text-gold text-[8px] font-bold uppercase tracking-[0.3em]">
                                        <span>{t('common.learn_more')}</span>
                                        <div className="w-0 group-hover:w-12 h-[1px] bg-gold transition-all duration-500" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>


            {/* 5. Strategic Contact Interface */}
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

                        <button disabled={isSubmitting} className="group relative w-full py-6 bg-gold text-rich-black uppercase font-black tracking-[0.5em] text-xs transition-all duration-700 overflow-hidden shadow-xl">
                            <span className="relative z-10 group-hover:text-gold transition-colors duration-700">{isSubmitting ? t('common.submitting') : t('contact_info.submit_proposal')}</span>
                            <div className="absolute inset-0 bg-rich-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
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
