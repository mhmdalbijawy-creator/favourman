import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { serviceImages } from '../data/serviceImages';

const ServiceDetail = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedType, setSelectedType] = useState('request');

    const serviceIndex = parseInt(id);
    const services = t('home.sectors.items', { returnObjects: true });

    // Explicit array for detailed descriptions to match the 21 sectors (Translations should be in JSON, but for consistency with existing structure, keeping key logic here)
    const extendedDetails = t('service_detail.extended', { returnObjects: true });

    const service = services[serviceIndex];
    const fullDescription = extendedDetails[serviceIndex] || service?.desc;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!service) return <div className="min-h-screen bg-rich-black flex items-center justify-center text-white font-bold tracking-widest">{t('common.error_message')}</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.target);
        formData.append("access_key", "57d25b96-1837-4c3e-9275-3f7267ae25ad");
        formData.append("subject", `EXECUTIVE INQUIRY: ${selectedType.toUpperCase()} - ${service.title}`);
        formData.append("from_name", "Favourman Service Detail");

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
        <div className="bg-rich-black min-h-screen pt-40 pb-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 blur-[120px] -z-10" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Visual & Core Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7"
                    >
                        <Link to="/" className="inline-flex items-center gap-4 text-gold/60 hover:text-gold transition-all group mb-12">
                            <div className="w-8 h-[1px] bg-gold/30 group-hover:w-12 transition-all" />
                            <span className="text-[10px] uppercase font-bold tracking-[0.4em]">{t('documentation.return_matrix')}</span>
                        </Link>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-none tracking-tighter uppercase">
                            {service.title.split(' ')[0]} <br />
                            <span className="text-gold italic font-light lowercase">{service.title.split(' ').slice(1).join(' ')}</span>
                        </h1>

                        <div className="relative aspect-video mb-12 border border-gold/10 overflow-hidden group shadow-2xl bg-charcoal/20">
                            <img
                                src={serviceImages[serviceIndex]?.url}
                                alt={service.title}
                                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-8 left-8 flex items-center gap-4">
                                <span className="bg-gold text-rich-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest">{t('service_detail.strategic_asset')}</span>
                                <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Code: S-{serviceIndex.toString().padStart(2, '0')}</span>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-16 border-s border-gold/30 ps-10 italic">
                                "{fullDescription}"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                            <div className="p-10 bg-rich-black">
                                <h3 className="text-gold text-xs font-bold mb-4 uppercase tracking-[0.3em]">{t('service_detail.scope')}</h3>
                                <p className="text-gray-500 text-sm font-light leading-relaxed">{t('service_detail.scope_desc')}</p>
                            </div>
                            <div className="p-10 bg-rich-black">
                                <h3 className="text-gold text-xs font-bold mb-4 uppercase tracking-[0.3em]">{t('home.sectors.label')}</h3>
                                <p className="text-gray-500 text-sm font-light leading-relaxed">{t('service_detail.standard_desc')}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Interactive Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 sticky top-40"
                    >
                        <div className="bg-charcoal border border-gold/10 p-10 md:p-14 relative group">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold/40" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold/40" />

                            <h2 className="text-2xl font-bold text-white mb-10 uppercase tracking-widest text-center">{t('service_detail.engagement')}</h2>

                            {/* Option Selector */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-12">
                                <button
                                    onClick={() => setSelectedType('request')}
                                    className={`flex-1 py-4 text-[10px] uppercase font-bold tracking-[0.15em] transition-all duration-700 border ${selectedType === 'request' ? 'bg-gold text-rich-black border-gold' : 'border-white/5 text-gray-400 hover:border-gold/30'}`}
                                >
                                    {t('service_detail.acquire')}
                                </button>
                                <button
                                    onClick={() => setSelectedType('partner')}
                                    className={`flex-1 py-4 text-[10px] uppercase font-bold tracking-[0.15em] transition-all duration-700 border ${selectedType === 'partner' ? 'bg-gold text-rich-black border-gold' : 'border-white/5 text-gray-400 hover:border-gold/30'}`}
                                >
                                    {t('service_detail.partner')}
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-16 text-center"
                                    >
                                        <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mx-auto mb-8 text-gold text-2xl">
                                            <i className="fa-solid fa-check" />
                                        </div>
                                        <p className="text-gold font-bold uppercase tracking-[0.3em] text-xs">{t('service_detail.inquiry_received')}</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-8"
                                    >
                                        <div className="space-y-3">
                                            <label className="text-gold text-[9px] uppercase font-bold tracking-[0.4em] block mb-2">{t('service_detail.identity')}</label>
                                            <input required name="name" type="text" className="w-full bg-rich-black/30 border border-white/5 p-5 text-white focus:outline-none focus:border-gold/50 transition-all font-light" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-gold text-[9px] uppercase font-bold tracking-[0.4em] block mb-2">{t('service_detail.secure_channel')}</label>
                                            <input required name="email" type="email" className="w-full bg-rich-black/30 border border-white/5 p-5 text-white focus:outline-none focus:border-gold/50 transition-all font-light" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-gold text-[9px] uppercase font-bold tracking-[0.4em] block mb-2">{t('service_detail.brief')}</label>
                                            <textarea required name="message" rows="4" className="w-full bg-rich-black/30 border border-white/5 p-5 text-white focus:outline-none focus:border-gold/50 transition-all font-light resize-none" />
                                        </div>

                                        <input type="hidden" name="Inquiry Type" value={selectedType === 'request' ? 'Service Request' : 'Partnership Application'} />
                                        <input type="hidden" name="Service Name" value={service.title} />

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group relative w-full py-6 bg-gold text-rich-black uppercase font-bold tracking-[0.4em] text-[10px] overflow-hidden transition-all duration-700 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-gold/20"
                                        >
                                            <span className="relative z-10 group-hover:text-gold transition-colors duration-700">{isSubmitting ? t('service_detail.processing') : t('service_detail.submit_inquiry')}</span>
                                            <div className="absolute inset-0 bg-rich-black translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
