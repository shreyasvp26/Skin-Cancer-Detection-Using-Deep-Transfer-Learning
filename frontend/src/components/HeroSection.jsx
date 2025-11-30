import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaMicroscope, FaBrain, FaShieldAlt } from 'react-icons/fa';
import heroImage from '../assets/hero_illustration.png';

const HeroSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="relative overflow-hidden bg-slate-50 pt-20 pb-16 lg:pt-32 lg:pb-24">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center lg:text-left"
                    >
                        <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                            <span className="text-primary font-semibold text-sm tracking-wide uppercase">
                                AI-Powered Dermatology
                            </span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                            Early Detection Saves <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Lives</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Upload dermoscopic images and metadata to get instant, accurate predictions for benign or malignant skin lesions using our advanced Deep Learning model.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                to="/upload"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-1"
                            >
                                Start Analysis
                                <FaArrowRight className="ml-2" />
                            </Link>
                            <Link
                                to="/about"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all duration-200"
                            >
                                Learn More
                            </Link>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-12 grid grid-cols-3 gap-6 text-center lg:text-left border-t border-slate-200 pt-8">
                            <div>
                                <div className="text-2xl font-bold text-slate-900">95%+</div>
                                <div className="text-sm text-slate-500">Accuracy</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">24/7</div>
                                <div className="text-sm text-slate-500">Availability</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">Secure</div>
                                <div className="text-sm text-slate-500">Processing</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Illustration/Image Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-white p-2">
                            <img
                                src={heroImage}
                                alt="AI Skin Cancer Detection"
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
