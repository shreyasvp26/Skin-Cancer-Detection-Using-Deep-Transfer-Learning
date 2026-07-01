import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const Footer = () => {
    const teamMembers = [
        'Shreyas Patil',
    ];

    return (
        <footer className="bg-slate-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Medical Disclaimer */}
                <div className="mb-8 p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
                    <div className="flex items-start space-x-2">
                        <FaExclamationTriangle className="text-amber-400 text-sm flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <strong className="text-slate-300">Medical Disclaimer:</strong> OncoScan is an AI research
                            and educational tool. It is not a medical device and has not been validated for clinical use.
                            Results are not a substitute for professional medical advice, diagnosis, or treatment.
                            Always seek the guidance of a qualified healthcare provider.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Project Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            OncoScan
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            AI-powered skin lesion screening tool for research and educational purposes.
                            Not intended for clinical diagnosis.
                        </p>
                    </div>

                    {/* Team */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-slate-200">Our Team</h4>
                        <ul className="space-y-2">
                            {teamMembers.map((member, index) => (
                                <li key={index} className="text-slate-400 text-sm hover:text-primary transition-colors">
                                    {member}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-slate-200">Project</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className="text-slate-400 text-sm hover:text-primary transition-colors">
                                    About the Project
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-slate-400 text-sm hover:text-primary transition-colors">
                                    Model Architecture
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/shreyasvp26/Skin-Cancer-Detection-Using-Deep-Transfer-Learning" className="text-slate-400 text-sm hover:text-primary transition-colors">
                                    GitHub Repository
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} OncoScan — Research Screening Tool. For educational purposes only.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
