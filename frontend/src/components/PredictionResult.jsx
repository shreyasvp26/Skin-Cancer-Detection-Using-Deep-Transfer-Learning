import React from 'react';
import { motion } from 'framer-motion';
import ConfidenceMeter from './ConfidenceMeter';
// import GradCAMViewer from './GradCAMViewer';
import { FaRedo, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const PredictionResult = ({ result, originalImage, onReset }) => {
    const { label, confidence, heatmap } = result;
    const isMalignant = label.toLowerCase() === 'malignant';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                {/* Header */}
                <div className={`p-6 sm:p-8 text-center border-b ${isMalignant ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isMalignant ? 'bg-red-100 text-red-500' : 'bg-emerald-100 text-emerald-500'}`}
                    >
                        {isMalignant ? <FaExclamationTriangle size={32} /> : <FaCheckCircle size={32} />}
                    </motion.div>

                    <h2 className={`text-3xl font-bold mb-2 ${isMalignant ? 'text-red-600' : 'text-emerald-600'}`}>
                        {label}
                    </h2>
                    <p className="text-slate-600">
                        Based on the analysis, this lesion appears to be <span className="font-semibold">{label.toLowerCase()}</span>.
                    </p>
                </div>

                <div className="p-6 sm:p-8">
                    {/* Stats */}
                    <div className="flex flex-col items-center justify-center space-y-8 max-w-2xl mx-auto">
                        <div className="text-center w-full">
                            <h3 className="text-lg font-semibold text-slate-800 mb-6">Confidence Score</h3>
                            <ConfidenceMeter score={confidence} label={label} />
                        </div>

                        <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <h4 className="font-semibold text-slate-700 mb-2 text-sm uppercase tracking-wide">Recommendation</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {isMalignant
                                    ? "Immediate consultation with a dermatologist is highly recommended for further evaluation and biopsy."
                                    : "While the result is benign, regular self-examinations and monitoring for changes are advised."
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
                    <button
                        onClick={onReset}
                        className="flex items-center px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-primary hover:text-primary transition-all duration-200 shadow-sm"
                    >
                        <FaRedo className="mr-2" />
                        Analyze Another Image
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default PredictionResult;
