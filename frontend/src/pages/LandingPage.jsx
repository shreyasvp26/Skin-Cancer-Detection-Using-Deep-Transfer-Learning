import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { motion } from 'framer-motion';
import { FaUserMd, FaLaptopMedical, FaCheckCircle } from 'react-icons/fa';

const LandingPage = () => {
    const features = [
        {
            icon: <FaUserMd className="text-4xl text-primary" />,
            title: "Screening Support",
            description: "Provides an AI-assisted preliminary screening of dermoscopic images to support — not replace — professional dermatological evaluation."
        },
        {
            icon: <FaLaptopMedical className="text-4xl text-accent" />,
            title: "Research Tool",
            description: "Designed as a research and educational project demonstrating how deep learning can be applied to dermoscopic image analysis."
        },
        {
            icon: <FaCheckCircle className="text-4xl text-green-500" />,
            title: "Deep Learning + Metadata",
            description: "Combines an EfficientNet-B0 image backbone with patient metadata (age, sex) via a fusion MLP for context-aware screening."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow">
                <HeroSection />

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Our AI model analyzes dermoscopic images combined with patient metadata to provide preliminary screening results.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow duration-300 text-center"
                                >
                                    <div className="mb-6 flex justify-center">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How it Works Section */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple 3-Step Process</h2>
                            <p className="text-slate-600">Upload, provide optional context, and get your screening result.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10"></div>

                            {[
                                { step: 1, title: "Upload Image", desc: "Upload a clear dermoscopic image of the skin lesion." },
                                { step: 2, title: "Optional Context", desc: "Provide optional patient details for reference." },
                                { step: 3, title: "Get Results", desc: "Receive an AI screening result with confidence score." }
                            ].map((item, index) => (
                                <div key={index} className="relative bg-slate-50">
                                    <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-primary/20 flex items-center justify-center text-2xl font-bold text-primary mb-6 shadow-sm">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-600 px-4">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
