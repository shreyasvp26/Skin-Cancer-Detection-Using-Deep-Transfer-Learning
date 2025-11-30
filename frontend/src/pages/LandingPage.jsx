import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaUserMd, FaLaptopMedical } from 'react-icons/fa';

const LandingPage = () => {
    const features = [
        {
            icon: <FaUserMd className="text-4xl text-primary" />,
            title: "Clinical Decision Support",
            description: "Assists dermatologists by providing a second opinion based on deep learning analysis of dermoscopic images."
        },
        {
            icon: <FaLaptopMedical className="text-4xl text-accent" />,
            title: "Tele-dermatology Ready",
            description: "Designed to be integrated into tele-health workflows, enabling remote screening and triage."
        },
        {
            icon: <FaCheckCircle className="text-4xl text-green-500" />,
            title: "High Accuracy",
            description: "Utilizes state-of-the-art CNN architectures like EfficientNet and ResNet for reliable predictions."
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
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Our System?</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Our AI model combines image analysis with patient metadata to deliver comprehensive diagnostic insights.
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
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
                            <p className="text-slate-600">Simple 3-step process to get your results.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                            {/* Connecting Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10"></div>

                            {[
                                { step: 1, title: "Upload Image", desc: "Upload a clear dermoscopic image of the skin lesion." },
                                { step: 2, title: "Add Details", desc: "Provide patient metadata like age, sex, and location." },
                                { step: 3, title: "Get Results", desc: "Receive instant prediction with confidence score & heatmap." }
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
