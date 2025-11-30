import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
    const teamMembers = [
        'Shreyas Patil',
        'Om Deshmukh',
        'Ruturaj Challawar',
        'Vinayak Pandalwad',
        'Suparna Joshi'
    ];

    return (
        <footer className="bg-slate-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Project Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            OncoScan
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Advanced skin cancer detection system powered by Deep Learning.
                            Helping in early diagnosis and clinical decision support.
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

                    {/* Contact/Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-slate-200">Project</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-slate-400 text-sm hover:text-primary transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 text-sm hover:text-primary transition-colors">
                                    Model Architecture
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 text-sm hover:text-primary transition-colors">
                                    GitHub Repository
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Skin Cancer Detection System. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
