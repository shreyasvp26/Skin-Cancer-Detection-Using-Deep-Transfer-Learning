import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UploadBox from '../components/UploadBox';
import MetadataForm from '../components/MetadataForm';
import LoadingAnimation from '../components/LoadingAnimation';
import PredictionResult from '../components/PredictionResult';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { analyzeImage } from '../utils/api';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const UploadPage = () => {
    const [step, setStep] = useState(1); // 1: Upload, 2: Metadata, 3: Loading, 4: Result
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [metadata, setMetadata] = useState({
        age: '',
        sex: '',
        location: '',
        skinTone: null
    });
    const [consentChecked, setConsentChecked] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleImageSelect = useCallback((file, url) => {
        setSelectedImage(file);
        setPreviewUrl(url);
        setError(null);
    }, []);

    const handleClearImage = useCallback(() => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setSelectedImage(null);
        setPreviewUrl(null);
    }, [previewUrl]);

    const handleNext = () => {
        if (step === 1 && !selectedImage) {
            setError("Please upload an image first.");
            return;
        }
        if (step === 2) {
            if (!consentChecked) {
                setError("Please acknowledge the research disclaimer before proceeding.");
                return;
            }
            handleSubmit();
        } else {
            setError(null);
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
        setError(null);
    };

    const handleSubmit = async () => {
        setStep(3); // Loading
        setError(null);

        // Set a timeout so loading doesn't hang forever
        const timeoutId = setTimeout(() => {
            setError("Analysis is taking longer than expected. Please try again.");
            setStep(2);
        }, 60000); // 60 second timeout

        try {
            const data = await analyzeImage(selectedImage, metadata);
            clearTimeout(timeoutId);
            setResult(data);
            setStep(4); // Result
        } catch (err) {
            clearTimeout(timeoutId);
            setError(err.message || "Failed to analyze image. Please try again.");
            setStep(2); // Go back to metadata
        }
    };

    const handleReset = useCallback(() => {
        // Revoke blob URL to prevent memory leak
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setStep(1);
        setSelectedImage(null);
        setPreviewUrl(null);
        setMetadata({ age: '', sex: '', location: '', skinTone: null });
        setConsentChecked(false);
        setResult(null);
        setError(null);
    }, [previewUrl]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Progress Steps */}
                    <div className="mb-8 flex justify-center items-center space-x-4" role="progressbar" aria-label="Analysis progress">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300
                                        ${step >= s ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}
                                        ${step === 4 && s === 3 ? 'bg-primary text-white' : ''}
                                    `}
                                    aria-label={`Step ${s}${step >= s ? ' (completed)' : ''}`}
                                >
                                    {s}
                                </div>
                                {s < 3 && (
                                    <div className="w-12 h-1 bg-slate-200 mx-2 rounded-full overflow-hidden">
                                        <div className={`h-full bg-primary transition-all duration-300 ${step > s ? 'w-full' : 'w-0'}`} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">
                            {step === 1 && "Upload Dermoscopic Image"}
                            {step === 2 && "Optional Patient Details"}
                            {step === 3 && "Analyzing..."}
                            {step === 4 && "Screening Results"}
                        </h1>
                        <p className="text-slate-500 mt-2">
                            {step === 1 && "Select a clear image of the skin lesion for AI screening."}
                            {step === 2 && "Provide patient details — age and sex help inform the AI prediction."}
                            {step === 3 && "Our AI model is processing the dermoscopic image."}
                            {step === 4 && "Review the AI screening result below."}
                        </p>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center text-sm font-medium"
                                role="alert"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Content Area */}
                    <div className="relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <UploadBox
                                        onImageSelect={handleImageSelect}
                                        selectedImage={previewUrl}
                                        onClear={handleClearImage}
                                    />

                                    <div className="mt-8 flex justify-end">
                                        <button
                                            onClick={handleNext}
                                            disabled={!selectedImage}
                                            id="btn-next-step"
                                            className={`
                                                flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-200
                                                ${selectedImage
                                                    ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 hover:-translate-y-1'
                                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                                            `}
                                        >
                                            Next Step
                                            <FaArrowRight className="ml-2" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <MetadataForm formData={metadata} setFormData={setMetadata} />

                                    {/* Consent Checkbox */}
                                    <div className="mt-6">
                                        <DisclaimerBanner compact />
                                        <label className="flex items-start space-x-3 mt-4 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={consentChecked}
                                                onChange={(e) => setConsentChecked(e.target.checked)}
                                                className="mt-1 w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                                                id="consent-checkbox"
                                            />
                                            <span className="text-sm text-slate-600">
                                                I understand that this is a <strong>research screening tool</strong> and
                                                the results are <strong>not a medical diagnosis</strong>.
                                                I will consult a qualified healthcare professional for clinical evaluation.
                                            </span>
                                        </label>
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <button
                                            onClick={handleBack}
                                            className="flex items-center px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                                        >
                                            <FaArrowLeft className="mr-2" />
                                            Back
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={!consentChecked}
                                            id="btn-analyze"
                                            className={`
                                                flex items-center px-8 py-3 rounded-xl font-medium transition-all duration-200
                                                ${consentChecked
                                                    ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 hover:-translate-y-1'
                                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                                            `}
                                        >
                                            Run Screening
                                            <FaArrowRight className="ml-2" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center justify-center h-full min-h-[400px]"
                                >
                                    <LoadingAnimation />
                                </motion.div>
                            )}

                            {step === 4 && result && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <PredictionResult
                                        result={result}
                                        originalImage={previewUrl}
                                        onReset={handleReset}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UploadPage;
