import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const JoinUs = () => {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.target);
        formData.append("access_key", "57d25b96-1837-4c3e-9275-3f7267ae25ad");
        formData.append("subject", "New Talent Application - Join Us Page");
        formData.append("from_name", "Favourman Recruitment");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                setIsSubmitted(true);
                e.target.reset();
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                console.error("Web3Forms Error:", data.message);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-rich-black min-h-screen pt-40 pb-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 blur-[150px] -z-10" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl mb-24"
                >
                    <span className="text-gold uppercase tracking-[0.8em] text-[10px] font-bold mb-8 p-3 border border-gold/20 inline-block bg-gold/5">
                        {t('join_us.label')}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-none tracking-tighter uppercase">
                        {t('join_us.title')} <br />
                        <span className="text-gold italic font-light lowercase">{t('join_us.subtitle')}</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl border-l border-gold/30 ps-8">
                        {t('join_us.description')}
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto bg-charcoal border border-gold/10 p-10 md:p-16 relative shadow-2xl">
                    <AnimatePresence mode="wait">
                        {isSubmitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                <div className="w-20 h-20 border border-gold flex items-center justify-center mx-auto mb-8 text-gold text-3xl">
                                    <i className="fa-solid fa-check" />
                                </div>
                                <h3 className="text-2xl font-bold text-gold mb-4 uppercase tracking-widest">{t('join_us.form.success')}</h3>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onSubmit={handleSubmit}
                                className="space-y-12"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <label className="text-gold text-[10px] uppercase font-bold tracking-widest block">{t('join_us.form.name')}</label>
                                        <input required name="name" type="text" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-gold transition-colors font-light" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-gold text-[10px] uppercase font-bold tracking-widest block">{t('join_us.form.email')}</label>
                                        <input required name="email" type="email" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-gold transition-colors font-light" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-gold text-[10px] uppercase font-bold tracking-widest block">{t('join_us.form.expertise')}</label>
                                    <select name="expertise" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-gold transition-colors font-light appearance-none">
                                        <option value="logistics" className="bg-charcoal text-white">{t('join_us.form.specializations.logistics')}</option>
                                        <option value="energy" className="bg-charcoal text-white">{t('join_us.form.specializations.energy')}</option>
                                        <option value="consultancy" className="bg-charcoal text-white">{t('join_us.form.specializations.consultancy')}</option>
                                        <option value="tech" className="bg-charcoal text-white">{t('join_us.form.specializations.tech')}</option>
                                        <option value="other" className="bg-charcoal text-white">{t('join_us.form.specializations.other')}</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-gold text-[10px] uppercase font-bold tracking-widest block">{t('join_us.form.cv')}</label>
                                    <input required name="cv_link" type="url" placeholder="LinkedIn or Portfolio" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-gold transition-colors font-light" />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-gold text-[10px] uppercase font-bold tracking-widest block">{t('join_us.form.summary')}</label>
                                    <textarea required name="summary" rows="4" className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-gold resize-none transition-colors font-light" />
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    className="group relative w-full py-6 bg-transparent border border-gold/40 hover:border-gold text-gold uppercase font-bold tracking-[0.4em] text-[11px] overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-xl"
                                >
                                    <span className="relative z-10 group-hover:text-gold transition-colors duration-700">{isSubmitting ? t('service_detail.processing') : t('join_us.form.submit')}</span>
                                    <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700 opacity-10" />
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
