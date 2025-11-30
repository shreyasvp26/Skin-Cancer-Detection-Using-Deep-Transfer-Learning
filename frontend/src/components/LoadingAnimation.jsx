import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-6">
            <div className="relative w-24 h-24">
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 border-4 border-slate-100 rounded-full"
                />
                {/* Spinning Gradient Ring */}
                <motion.div
                    className="absolute inset-0 border-4 border-transparent border-t-primary border-r-accent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner Pulse */}
                <motion.div
                    className="absolute inset-6 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-md"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="text-center">
                <motion.h3
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-lg font-semibold text-slate-700"
                >
                    Analyzing Image...
                </motion.h3>
                <p className="text-sm text-slate-500 mt-2">
                    Processing dermoscopic features and metadata
                </p>
            </div>
        </div>
    );
};

export default LoadingAnimation;
