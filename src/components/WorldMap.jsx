import { motion } from 'framer-motion';

// Major global cities with approximate SVG coordinates on a 1000x500 map
const nodes = [
    { id: 'riyadh', label: 'Riyadh', x: 560, y: 230 },
    { id: 'dubai', label: 'Dubai', x: 585, y: 245 },
    { id: 'london', label: 'London', x: 450, y: 145 },
    { id: 'newyork', label: 'New York', x: 240, y: 175 },
    { id: 'singapore', label: 'Singapore', x: 730, y: 295 },
    { id: 'beijing', label: 'Beijing', x: 745, y: 175 },
    { id: 'tokyo', label: 'Tokyo', x: 800, y: 185 },
    { id: 'sydney', label: 'Sydney', x: 820, y: 380 },
    { id: 'nairobi', label: 'Nairobi', x: 555, y: 300 },
    { id: 'moscow', label: 'Moscow', x: 560, y: 135 },
    { id: 'mumbai', label: 'Mumbai', x: 635, y: 255 },
    { id: 'cairo', label: 'Cairo', x: 530, y: 220 },
];

// Connect Riyadh/Dubai hub to all others
const connections = nodes
    .filter(n => n.id !== 'riyadh' && n.id !== 'dubai')
    .map(n => ({ from: 'riyadh', to: n.id }));

const WorldMap = () => {
    const getNode = (id) => nodes.find(n => n.id === id);

    return (
        <div className="relative w-full overflow-hidden select-none">
            <svg
                viewBox="0 0 1000 500"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#e4c581" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#e4c581" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* World outline - minimal continent silhouette */}
                <path
                    d="M 50 200 Q 150 150 250 160 Q 300 155 320 170 Q 380 180 420 160 Q 460 140 480 150
                       Q 520 160 540 155 Q 580 145 620 160 Q 680 170 720 165 Q 780 155 830 175
                       Q 870 185 920 170 Q 960 165 980 180
                       L 980 350 Q 900 340 820 360 Q 760 370 720 355 Q 680 345 650 360
                       Q 600 375 560 360 Q 520 345 480 355 Q 430 365 390 350 Q 340 335 300 345
                       Q 250 355 200 340 Q 150 325 100 340 Q 70 348 50 340 Z"
                    fill="none"
                    stroke="rgba(228,197,129,0.04)"
                    strokeWidth="1"
                />

                {/* Grid lines */}
                {[100, 200, 300, 400].map(y => (
                    <line key={y} x1="0" y1={y} x2="1000" y2={y}
                        stroke="rgba(228,197,129,0.04)" strokeWidth="0.5" />
                ))}
                {[200, 400, 600, 800].map(x => (
                    <line key={x} x1={x} y1="0" x2={x} y2="500"
                        stroke="rgba(228,197,129,0.04)" strokeWidth="0.5" />
                ))}

                {/* Connection lines with animation */}
                {connections.map((conn, i) => {
                    const from = getNode(conn.from);
                    const to = getNode(conn.to);
                    if (!from || !to) return null;
                    const mid = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 40 };
                    return (
                        <motion.path
                            key={i}
                            d={`M ${from.x} ${from.y} Q ${mid.x} ${mid.y} ${to.x} ${to.y}`}
                            fill="none"
                            stroke="rgba(228,197,129,0.35)"
                            strokeWidth="0.8"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, delay: i * 0.15, ease: "easeInOut" }}
                        />
                    );
                })}

                {/* Animated pulse on connections */}
                {connections.map((conn, i) => {
                    const from = getNode(conn.from);
                    const to = getNode(conn.to);
                    if (!from || !to) return null;
                    const mid = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 40 };
                    return (
                        <motion.circle
                            key={`pulse-${i}`}
                            r="2"
                            fill="#e4c581"
                            opacity="0.8"
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            transition={{
                                duration: 3,
                                delay: i * 0.15 + 2,
                                repeat: Infinity,
                                repeatDelay: 4,
                                ease: "linear"
                            }}
                            style={{
                                offsetPath: `path("M ${from.x} ${from.y} Q ${mid.x} ${mid.y} ${to.x} ${to.y}")`,
                            }}
                        />
                    );
                })}

                {/* City Nodes */}
                {nodes.map((node, i) => {
                    const isHub = node.id === 'riyadh' || node.id === 'dubai';
                    return (
                        <motion.g
                            key={node.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 + 0.5 }}
                        >
                            {/* Glow halo */}
                            <motion.circle
                                cx={node.x} cy={node.y}
                                r={isHub ? 16 : 10}
                                fill="url(#nodeGlow)"
                                animate={{ r: isHub ? [16, 22, 16] : [10, 14, 10], opacity: [0.4, 0.8, 0.4] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                            />
                            {/* Node dot */}
                            <circle
                                cx={node.x} cy={node.y}
                                r={isHub ? 4 : 2.5}
                                fill={isHub ? '#e4c581' : 'rgba(228,197,129,0.7)'}
                                filter="url(#glow)"
                            />
                            {/* Label */}
                            <text
                                x={node.x + 8} y={node.y + 4}
                                fontSize={isHub ? "9" : "7"}
                                fill={isHub ? '#e4c581' : 'rgba(228,197,129,0.5)'}
                                fontFamily="Outfit, sans-serif"
                                letterSpacing="1"
                            >
                                {node.label.toUpperCase()}
                            </text>
                        </motion.g>
                    );
                })}
            </svg>
        </div>
    );
};

export default WorldMap;
