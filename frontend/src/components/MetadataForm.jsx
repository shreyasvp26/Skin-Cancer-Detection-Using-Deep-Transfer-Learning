import React from 'react';
import { motion } from 'framer-motion';

const MetadataForm = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100"
        >
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Patient Metadata</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Age */}
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-2">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        min="0"
                        max="120"
                        placeholder="e.g. 45"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 bg-slate-50 focus:bg-white"
                    />
                </div>

                {/* Sex */}
                <div>
                    <label htmlFor="sex" className="block text-sm font-medium text-slate-700 mb-2">
                        Sex
                    </label>
                    <select
                        id="sex"
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 bg-slate-50 focus:bg-white appearance-none"
                    >
                        <option value="">Select Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Lesion Location */}
                <div className="sm:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                        Anatomical Site (Location)
                    </label>
                    <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 bg-slate-50 focus:bg-white appearance-none"
                    >
                        <option value="">Select Location</option>
                        <option value="Head/Neck">Head/Neck</option>
                        <option value="Upper Extremity">Upper Extremity</option>
                        <option value="Lower Extremity">Lower Extremity</option>
                        <option value="Torso">Torso</option>
                        <option value="Palms/Soles">Palms/Soles</option>
                        <option value="Oral/Genital">Oral/Genital</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Skin Tone (Optional but good for model context if needed) */}
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Skin Tone (Fitzpatrick Scale)
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, skinTone: type }))}
                                className={`
                  h-10 rounded-lg border-2 transition-all duration-200
                  ${formData.skinTone === type ? 'border-primary ring-2 ring-primary/30 scale-105' : 'border-transparent hover:scale-105'}
                `}
                                style={{ backgroundColor: getSkinToneColor(type) }}
                                title={`Type ${type}`}
                            />
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-right">Selected: {formData.skinTone ? `Type ${formData.skinTone}` : 'None'}</p>
                </div>
            </div>
        </motion.div>
    );
};

// Helper for skin tone colors
const getSkinToneColor = (type) => {
    const colors = {
        1: '#F3E5D8', // Type I
        2: '#E9D6BE', // Type II
        3: '#D6C0A6', // Type III
        4: '#C2A385', // Type IV
        5: '#967259', // Type V
        6: '#5C3E2E'  // Type VI
    };
    return colors[type] || '#fff';
};

export default MetadataForm;
