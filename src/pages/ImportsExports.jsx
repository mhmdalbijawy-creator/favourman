import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ImportsExports = () => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    return (
        <div className={`bg-rich-black min-h-screen pt-32 pb-24 overflow-hidden ${isAr ? 'font-ar' : 'font-en'}`}>
            {/* Hero Section */}
            <section className="container mx-auto px-6 relative text-center mb-24">
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
                        {t('navbar.imports_exports')}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight"
                    >
                        {t('imports_exports.title')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gold uppercase tracking-[0.4em] text-xs md:text-sm font-medium mb-12"
                    >
                        {t('imports_exports.tagline')}
                    </motion.p>

                    <div className="w-24 h-[1px] bg-gold/30 mx-auto mb-12" />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        {t('imports_exports.desc')}
                    </motion.p>
                </div>
            </section>

            {/* Featured Image Section */}
            <section className="container mx-auto px-6 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-2xl overflow-hidden aspect-[21/9] border border-white/5"
                >
                    <img
                        src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=2000&auto=format&fit=crop"
                        alt="Global Logistics & Trade"
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-transparent" />

                    {/* Floating Decorative Elements */}
                    <div className="absolute top-10 left-10 p-6 glass-panel border-white/10 hidden md:block">
                        <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">Standard</p>
                        <p className="text-white text-lg font-bold">Strategic Quality</p>
                    </div>
                </motion.div>
            </section>

            {/* Core Competencies Cards */}
            <section className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: t('imports_exports.industrial.title'), desc: t('imports_exports.industrial.desc') },
                    { title: t('imports_exports.food.title'), desc: t('imports_exports.food.desc') },
                    { title: t('imports_exports.chemical.title'), desc: t('imports_exports.chemical.desc') }
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="p-10 bg-white/5 border border-white/10 rounded-xl hover:border-gold/30 transition-all duration-500 group"
                    >
                        <h3 className="text-white text-xl font-bold mb-4 group-hover:text-gold transition-colors">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </section>

            {/* Engagement Protocol Form */}
            <section className="container mx-auto px-6 mt-32 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-charcoal border border-gold/10 p-10 md:p-16 relative shadow-2xl"
                >
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/40" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/40" />

                    <h2 className="text-2xl font-bold text-white mb-10 uppercase tracking-widest text-center">
                        {t('imports_exports.form_title')}
                    </h2>

                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            formData.append("access_key", "57d25b96-1837-4c3e-9275-3f7267ae25ad");
                            formData.append("subject", "IMPORTS & EXPORTS INQUIRY");

                            try {
                                const response = await fetch("https://api.web3forms.com/submit", {
                                    method: "POST",
                                    body: formData
                                });
                                const data = await response.json();
                                if (data.success) {
                                    alert(t('imports_exports.success_msg'));
                                    e.target.reset();
                                }
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                        className="space-y-12 transition-all duration-700"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="group relative">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/50 block mb-4 group-focus-within:text-gold transition-colors">
                                    {t('service_detail.name')}
                                </label>
                                <input required name="name" type="text" className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold transition-colors font-light" />
                            </div>
                            <div className="group relative">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/50 block mb-4 group-focus-within:text-gold transition-colors">
                                    {t('service_detail.email')}
                                </label>
                                <input required name="email" type="email" className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold transition-colors font-light" />
                            </div>
                        </div>

                        <div className="group relative">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/50 block mb-4 group-focus-within:text-gold transition-colors">
                                {t('service_detail.org')}
                            </label>
                            <input required name="org" type="text" className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold transition-colors font-light" />
                        </div>

                        <div className="group relative">
                            <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/50 block mb-4 group-focus-within:text-gold transition-colors">
                                {t('service_detail.brief')}
                            </label>
                            <textarea required name="message" rows="4" className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-gold resize-none transition-colors font-light"></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-6 bg-gold text-rich-black uppercase font-black tracking-[0.5em] text-xs hover:bg-white transition-all duration-700 transform hover:scale-[1.02] shadow-xl"
                        >
                            {t('hero.initiate_protocol')}
                        </button>
                    </form>
                </motion.div>
            </section>
        </div>
    );
};

export default ImportsExports;
