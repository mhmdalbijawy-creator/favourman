import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

export const useTextScramble = (text, trigger = true, speed = 30) => {
    const [displayText, setDisplayText] = useState(text);
    const frameRef = useRef(null);

    useEffect(() => {
        if (!trigger) return;

        let frame = 0;
        const totalFrames = text.length * 3;

        const scramble = () => {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') { result += ' '; continue; }
                const revealAt = (i / text.length) * totalFrames;
                if (frame >= revealAt) {
                    result += text[i];
                } else {
                    result += CHARS[Math.floor(Math.random() * CHARS.length)];
                }
            }
            setDisplayText(result);
            frame++;
            if (frame <= totalFrames) {
                frameRef.current = setTimeout(scramble, speed);
            }
        };

        frameRef.current = setTimeout(scramble, speed);
        return () => clearTimeout(frameRef.current);
    }, [text, trigger, speed]);

    return displayText;
};

// Standalone component version
const TextScramble = ({ text, className = '', trigger = true, speed = 25 }) => {
    const displayed = useTextScramble(text, trigger, speed);
    return <span className={className}>{displayed}</span>;
};

export default TextScramble;
