import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const DisclaimerBanner = ({ compact = false }) => {
    if (compact) {
        return (
            <div
                id="disclaimer-banner-compact"
                className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center"
                role="alert"
            >
                <p className="text-xs text-amber-700 font-medium">
                    <FaExclamationTriangle className="inline mr-1 mb-0.5" />
                    Research tool only — not a medical diagnosis. Always consult a dermatologist.
                </p>
            </div>
        );
    }

    return (
        <div
            id="disclaimer-banner"
            className="bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6"
            role="alert"
        >
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                    <FaExclamationTriangle className="text-amber-500 text-lg" />
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-amber-800 mb-1">
                        Important Medical Disclaimer
                    </h4>
                    <p className="text-xs text-amber-700 leading-relaxed">
                        OncoScan is an <strong>AI research and educational tool</strong> and is{' '}
                        <strong>NOT a medical device</strong>. It has not been cleared or approved by
                        the FDA or any regulatory body. Results should not be used as a substitute
                        for professional medical advice, diagnosis, or treatment. Always consult a
                        qualified dermatologist or healthcare provider for clinical evaluation.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerBanner;
