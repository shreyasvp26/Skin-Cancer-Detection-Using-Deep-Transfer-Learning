import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
    FaDatabase, 
    FaNetworkWired, 
    FaLayerGroup, 
    FaProjectDiagram, 
    FaCubes, 
    FaShieldAlt, 
    FaBrain,
    FaSlidersH,
    FaCheckCircle 
} from 'react-icons/fa';
import DisclaimerBanner from '../components/DisclaimerBanner';

const AboutPage = () => {
    const ensembleModels = [
        {
            name: "EfficientNet-B0",
            type: "Depthwise Separable ConvNet",
            role: "Lightweight, highly efficient feature extraction capturing core spatial patterns."
        },
        {
            name: "EfficientNet-B3",
            type: "Scaled Depthwise ConvNet",
            role: "Higher-resolution compound scaling for fine-grained lesion surface features."
        },
        {
            name: "DenseNet-121",
            type: "Densely Connected ConvNet",
            role: "Promotes feature reuse across layer depths to preserve multi-scale visual details."
        },
        {
            name: "ResNet-50",
            type: "Deep Residual Network",
            role: "Leverages residual bottleneck connections to learn deep contextual representations."
        }
    ];

    const pipelineSteps = [
        {
            step: "01",
            title: "Input & Metadata",
            description: "Dermoscopic skin image uploaded along with patient clinical metadata (Age & Sex)."
        },
        {
            step: "02",
            title: "Preprocessing & Normalization",
            description: "Image resized to 224×224 RGB with ImageNet normalization stats; age normalized and sex one-hot encoded."
        },
        {
            step: "03",
            title: "Ensemble Inference",
            description: "Parallel feature extraction and prediction across EfficientNet-B0, EfficientNet-B3, DenseNet-121, and ResNet-50 backbones."
        },
        {
            step: "04",
            title: "Fusion & Classification",
            description: "Predictions are aggregated and evaluated via Sigmoid against a classification threshold (0.5) to return Benign vs. Malignant screening result."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
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
                                Skin cancer is one of the most common forms of cancer worldwide. Early screening and identification are crucial for timely medical evaluation and successful outcomes. However, access to expert dermatologists for routine evaluation remains limited in many regions.
                            </p>
                            <p>
                                This research project explores combining deep learning architectures to assist in preliminary screening of dermoscopic images. Designed exclusively as an educational and academic research tool, it demonstrates how multi-model ensemble systems can support — but never replace — qualified medical diagnostic judgment.
                            </p>
                        </div>
                    </section>

                    {/* Ensemble Architecture Explanation */}
                    <section className="mb-16">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                <FaLayerGroup size={20} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Ensemble Model Architecture</h2>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-slate-600 leading-relaxed mb-8">
                            <p className="mb-4">
                                Rather than relying on a single neural network backbone, this system employs a <strong>multi-model ensemble architecture</strong> that integrates predictions from four distinct deep learning model backbones alongside patient clinical metadata.
                            </p>
                            <p>
                                By combining representations across distinct model families (EfficientNet depthwise separable convolutions, DenseNet feature reuse, and ResNet bottleneck residual shortcuts), the system captures complementary visual patterns, mitigating single-architecture bias and enhancing feature representation diversity.
                            </p>
                        </div>

                        {/* 4 Backbones Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            {ensembleModels.map((m, index) => (
                                <motion.div
                                    key={m.name}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                            <FaBrain className="text-indigo-500" size={16} />
                                            {m.name}
                                        </h3>
                                        <span className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 font-medium rounded-full border border-indigo-100">
                                            Backbone
                                        </span>
                                    </div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                        {m.type}
                                    </p>
                                    <p className="text-sm text-slate-600 leading-normal">
                                        {m.role}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Metadata Fusion Box */}
                        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-md">
                            <div className="flex items-center gap-3 mb-3">
                                <FaNetworkWired className="text-indigo-400" size={22} />
                                <h3 className="text-xl font-bold">Metadata Fusion & Classification</h3>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Image features extracted across the ensemble backbones are combined with a patient metadata feature vector encoding <strong>Age</strong> (normalized) and <strong>Sex</strong> (one-hot vector: <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded text-xs">[age_norm, sex_male, sex_female]</code>). The integrated representations are evaluated through binary Sigmoid classification output.
                            </p>
                        </div>
                    </section>

                    {/* Why Ensemble */}
                    <section className="mb-16">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                                <FaCubes size={20} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Why an Ensemble Model is Used</h2>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-slate-600 leading-relaxed">
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-teal-500 mt-1 flex-shrink-0" size={18} />
                                    <div>
                                        <strong className="text-slate-800">Architectural Diversity:</strong> Single models can develop inductive biases towards specific image characteristics. Combining depthwise convolutions, dense feature reuse, and residual shortcuts ensures diverse feature coverage.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-teal-500 mt-1 flex-shrink-0" size={18} />
                                    <div>
                                        <strong className="text-slate-800">Variance Reduction:</strong> Aggregating predictions across multiple models lowers individual model variance and reduces sensitivity to minor image artifacts or noise.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-teal-500 mt-1 flex-shrink-0" size={18} />
                                    <div>
                                        <strong className="text-slate-800">Multi-Scale Representation:</strong> Different backbones operate at varying receptive field depths, preserving both local lesion boundary details and global structural context.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Pipeline / Workflow */}
                    <section className="mb-16">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                <FaProjectDiagram size={20} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Pipeline & Workflow</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {pipelineSteps.map((s) => (
                                <div key={s.step} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                                    <div>
                                        <span className="text-2xl font-black text-indigo-500/30 block mb-2 font-mono">{s.step}</span>
                                        <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Methodology & Tech Stack Grid */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Methodology & Dataset</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                                    <FaDatabase size={24} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Datasets</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Trained on public benchmark datasets including <strong>HAM10000</strong> and <strong>ISIC</strong> datasets, comprising thousands of expert-annotated dermoscopic images across diverse skin lesion categories.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                                    <FaSlidersH size={24} />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">Preprocessing & Fusion</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Standardized 224×224 RGB image normalization with ImageNet mean/std statistics combined with normalized patient age and one-hot sex metadata encoding for context-aware inference.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Limitations */}
                    <section className="mb-16">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                                <FaShieldAlt size={20} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Limitations & Responsible Medical Use</h2>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-slate-600 leading-relaxed">
                            <ul className="space-y-3 list-disc list-inside">
                                <li>This tool is strictly an <strong>academic research demonstration</strong> and has <strong>not been validated</strong> for clinical use nor cleared by the FDA.</li>
                                <li>The prediction pipeline uses <strong>image analysis combined with patient age and sex</strong>. Anatomical site and Fitzpatrick skin tone are recorded for reference/logging only and do not influence model predictions.</li>
                                <li>Performance may vary depending on image quality, lighting, magnification, skin tone representation, and rare lesion types.</li>
                                <li>The binary classification threshold (default 0.5) is configurable and has not been formally calibrated against a prospective clinical validation cohort.</li>
                                <li>This screening demonstration should <strong>never be used as a substitute for professional medical advice</strong>, diagnosis, or clinical evaluation by a certified dermatologist.</li>
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
