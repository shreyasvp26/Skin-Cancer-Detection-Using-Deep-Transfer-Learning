import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FaDatabase, FaNetworkWired, FaSearchPlus } from 'react-icons/fa';

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
                            AI-Powered Skin Cancer Detection System using Deep Learning
                        </p>
                    </motion.div>

                    {/* Motivation */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Project Motivation</h2>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-slate-600 leading-relaxed">
                            <p className="mb-4">
                                Skin cancer is one of the most common forms of cancer worldwide. Early detection is crucial for successful treatment and survival. However, accurate diagnosis often requires expert dermatologists who may not be accessible to everyone.
                            </p>
                            <p>
                                This project aims to bridge that gap by leveraging state-of-the-art Deep Learning models to assist medical professionals and patients in early screening of skin lesions. By analyzing dermoscopic images along with patient metadata, our system provides a rapid, reliable second opinion.
                            </p>
                        </div>
                    </section>

                    {/* Methodology Grid */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Methodology & Tech Stack</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                                    Utilizes an ensemble of EfficientNet-B3, ResNet-50, and DenseNet for robust feature extraction and classification.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-500 mb-4">
                                    <FaSearchPlus size={24} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Explainability</h3>
                                <p className="text-sm text-slate-600">
                                    Integrated Grad-CAM (Gradient-weighted Class Activation Mapping) to visualize which parts of the image influenced the prediction.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Workflow
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">System Workflow</h2>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm font-medium text-slate-600">
                                <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">Data Selection</div>
                                <div className="hidden md:block text-slate-300">→</div>
                                <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">Preprocessing</div>
                                <div className="hidden md:block text-slate-300">→</div>
                                <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">Model Training</div>
                                <div className="hidden md:block text-slate-300">→</div>
                                <div className="px-4 py-2 bg-slate-50 rounded-lg border border-slate-200">Evaluation</div>
                                <div className="hidden md:block text-slate-300">→</div>
                                <div className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg">Deployment</div>
                            </div>
                        </div>
                    </section> */}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
