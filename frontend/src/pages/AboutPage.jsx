import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FaDatabase, FaNetworkWired } from 'react-icons/fa';
import DisclaimerBanner from '../components/DisclaimerBanner';

const AboutPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">About The Project</h1>
                        <p className="text-lg text-slate-600">
                            AI-Powered Skin Lesion Screening Tool for Research & Education
                        </p>
                    </motion.div>

                    {/* Disclaimer */}
                    <section className="mb-12">
                        <DisclaimerBanner />
                    </section>

                    {/* Motivation */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Project Motivation</h2>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-slate-600 leading-relaxed">
                            <p className="mb-4">
                                Skin cancer is one of the most common forms of cancer worldwide. Early detection is crucial for successful treatment and survival. However, accurate diagnosis often requires expert dermatologists who may not be accessible to everyone.
                            </p>
                            <p>
                                This research project explores the use of deep learning models to assist in preliminary screening of dermoscopic images. It is designed as a research and educational tool to demonstrate how AI can support — but never replace — professional dermatological evaluation.
                            </p>
                        </div>
                    </section>

                    {/* Methodology Grid */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Methodology & Tech Stack</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-primary mb-4">
                                    <FaDatabase size={24} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Dataset</h3>
                                <p className="text-sm text-slate-600">
                                    Trained on the HAM10000 and ISIC datasets, comprising thousands of dermoscopic images of various skin lesion types.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-accent mb-4">
                                    <FaNetworkWired size={24} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Model Architecture</h3>
                                <p className="text-sm text-slate-600">
                                    Uses an <strong>EfficientNet-B0</strong> backbone for image feature extraction (1280-d) combined with a metadata MLP that processes patient age and sex (128-d). Combined features are passed through a binary classifier.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Limitations */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Limitations</h2>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-slate-600 leading-relaxed">
                            <ul className="space-y-3 list-disc list-inside">
                                <li>This tool has <strong>not been validated</strong> for clinical use and is not FDA-cleared.</li>
                                <li>The model uses <strong>image analysis combined with age and sex</strong>. Anatomical site and skin tone are collected for reference but do not influence predictions.</li>
                                <li>Performance may vary across skin tones, image quality, and lesion types not well-represented in the training data.</li>
                                <li>The classification threshold has not been formally calibrated against a clinical validation dataset.</li>
                                <li>This tool should never be used as the sole basis for medical decisions.</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
