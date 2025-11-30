import React from 'react';
import { motion } from 'framer-motion';

const ConfidenceMeter = ({ score, label }) => {
    // Score is 0-1
    const percentage = Math.round(score * 100);
    const isMalignant = label.toLowerCase() === 'malignant';

    // Color logic
    const color = isMalignant ? '#ef4444' : '#10b981'; // Red-500 or Emerald-500
    const bgColor = isMalignant ? '#fee2e2' : '#d1fae5'; // Red-100 or Emerald-100

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-40 h-40">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke={bgColor}
                        strokeWidth="12"
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke={color}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={440}
                        strokeDashoffset={440 - (440 * percentage) / 100}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 440 }}
                        animate={{ strokeDashoffset: 440 - (440 * percentage) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl font-bold text-slate-800"
                    >
                        {percentage}%
                    </motion.span>
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">Confidence</span>
                </div>
            </div>
        </div>
    );
};

export default ConfidenceMeter;
