import { motion } from 'framer-motion';

const Logo = ({ className = "w-16 h-16" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className={`${className} flex items-center justify-center`}
        >
            <img
                src="/logo.png"
                alt="Favourman Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] transition-transform group-hover:scale-110 !transform-none"
                style={{ transform: 'scaleX(1) !important' }} // Extra protection against mirroring
            />
        </motion.div>
    );
};

export default Logo;
