import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiSend, FiSearch, FiCheckCircle } from 'react-icons/fi';

const Contact = () => {
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
        formData.append("subject", "New Executive Inquiry - Contact Page");
        formData.append("from_name", "Favourman Contact Form");

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

    const steps = [
        { icon: <FiBriefcase />, title: t('contact_info.engagement_protocol.step1.title'), desc: t('contact_info.engagement_protocol.step1.desc') },
        { icon: <FiSend />, title: t('contact_info.engagement_protocol.step2.title'), desc: t('contact_info.engagement_protocol.step2.desc') },
        { icon: <FiSearch />, title: t('contact_info.engagement_protocol.step3.title'), desc: t('contact_info.engagement_protocol.step3.desc') },
        { icon: <FiCheckCircle />, title: t('contact_info.engagement_protocol.step4.title'), desc: t('contact_info.engagement_protocol.step4.desc') }
    ];

    return (
        <div className={`bg-rich-black min-h-screen pt-40 pb-24 overflow-hidden relative ${isAr ? 'font-ar' : 'font-en'}`}>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 blur-[150px] -z-10" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center mb-24"
                >
                    <span className="text-gold uppercase tracking-[0.8em] text-[10px] font-bold mb-8 p-3 border border-gold/20 inline-block bg-gold/5">
                        {t('contact_info.inquiry_protocol')}
                    </span>
                    <h1>
                        {t('navbar.contact')}
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Protocol Steps - Redesigned Timeline Style */}
                    <div className="space-y-0 relative border-l border-gold/10 ml-6 lg:ml-0 md:border-l-0 pb-10 md:pb-0">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl font-bold uppercase tracking-widest text-white mb-14 pl-10 md:pl-0 flex items-center md:justify-center gap-4"
                        >
                            <span className="w-12 h-[1px] bg-gold hidden md:block" />
                            {t('contact_info.engagement_protocol.title')}
                            <span className="w-12 h-[1px] bg-gold hidden md:block" />
                        </motion.h2>

                        {steps.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="relative flex flex-col md:flex-row gap-6 md:gap-8 items-start p-8 md:p-10 border border-white/5 bg-charcoal/20 hover:border-gold/30 transition-all group hover:bg-charcoal/40 group mb-6 hover:-translate-y-1 shadow-2xl"
                            >
                                {/* Steps Connection Line (for desktop) */}
                                {idx < steps.length - 1 && (
                                    <div className={`hidden md:block absolute ${isAr ? 'right-[4.5rem]' : 'left-[4.5rem]'} top-24 bottom-[-1.5rem] w-[1px] bg-gold/10 group-hover:bg-gold/30 transition-colors`} />
                                )}

                                {/* Number badge overlay */}
                                <div className={`absolute top-0 ${isAr ? 'left-0' : 'right-0'} p-4 text-white/5 font-black text-6xl select-none group-hover:text-gold/5 transition-colors z-0`}>
                                    0{idx + 1}
                                </div>

                                {/* Icon Container */}
                                <div className="relative z-10 w-16 h-16 shrink-0 bg-rich-black border border-gold/20 flex items-center justify-center text-gold text-2xl group-hover:bg-gold group-hover:text-rich-black transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                    {item.icon}
                                </div>

                                <div className="relative z-10 flex-1 pt-2">
                                    <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{item.title}</h4>
                                    <p className="text-gray-400 text-sm md:text-md leading-relaxed group-hover:text-gray-200 transition-colors font-light">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: isAr ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-charcoal border border-white/5 p-10 md:p-16 relative shadow-2xl"
                    >
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-20"
                                >
                                    <div className="w-20 h-20 border border-gold flex items-center justify-center mx-auto mb-8">
                                        <i className="fa-solid fa-check text-gold text-3xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gold mb-4 uppercase tracking-[0.2em]">{t('contact_info.transmitted')}</h3>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-12"
                                    onSubmit={handleSubmit}
                                >
                                    {[
                                        { label: t('service_detail.name'), name: "name", type: "text" },
                                        { label: t('service_detail.email'), name: "email", type: "email" }
                                    ].map((field) => (
                                        <div key={field.name} className="group relative">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/50 block mb-4 group-focus-within:text-gold transition-colors">{field.label}</label>
                                            <input required name={field.name} type={field.type} className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold transition-colors font-light" />
                                        </div>
                                    ))}

                                    <div className="group relative">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/50 block mb-4 group-focus-within:text-gold transition-colors">{t('service_detail.message')}</label>
                                        <textarea required name="message" rows="4" className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold resize-none transition-colors font-light"></textarea>
                                    </div>

                                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                                    <button
                                        disabled={isSubmitting}
                                        className="group relative w-full py-6 bg-transparent border border-gold/40 hover:border-gold text-gold uppercase font-black tracking-[0.5em] text-xs transition-all duration-700 overflow-hidden shadow-xl"
                                    >
                                        <span className="relative z-10 group-hover:text-gold transition-colors duration-700">{isSubmitting ? t('common.submitting') : t('common.submit')}</span>
                                        <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700 opacity-10" />
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
