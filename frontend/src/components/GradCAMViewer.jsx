import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaLayerGroup } from 'react-icons/fa';

const GradCAMViewer = ({ originalImage, heatmapImage }) => {
    const [opacity, setOpacity] = useState(0.6);
    const [showHeatmap, setShowHeatmap] = useState(true);

    return (
        <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <FaLayerGroup className="text-primary" />
                    Grad-CAM Analysis
                </h4>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-500 font-medium">Opacity</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={opacity}
                            onChange={(e) => setOpacity(parseFloat(e.target.value))}
                            disabled={!showHeatmap}
                            className="w-24 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                    <button
                        onClick={() => setShowHeatmap(!showHeatmap)}
                        className={`p-2 rounded-lg transition-colors ${showHeatmap ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-500'}`}
                        title={showHeatmap ? "Hide Heatmap" : "Show Heatmap"}
                    >
                        {showHeatmap ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                    </button>
                </div>
            </div>

            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/5 shadow-inner">
                {/* Original Image */}
                <img
                    src={originalImage}
                    alt="Original Lesion"
                    className="absolute inset-0 w-full h-full object-contain"
                />

                {/* Heatmap Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showHeatmap ? opacity : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
                >
                    {/* 
             NOTE: In a real app, heatmapImage would be a base64 string or URL from backend.
             If heatmapImage is not provided, we might show a placeholder or nothing.
           */}
                    {heatmapImage && (
                        <img
                            src={heatmapImage}
                            alt="Grad-CAM Heatmap"
                            className="w-full h-full object-contain"
                        />
                    )}
                </motion.div>

                {!heatmapImage && showHeatmap && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 text-white text-sm">
                        No Heatmap Data Available
                    </div>
                )}
            </div>

            <div className="mt-4 text-sm text-slate-500 bg-white p-3 rounded-lg border border-slate-100">
                <p>
                    <span className="font-semibold text-slate-700">Interpretation:</span> Red/Warm areas indicate regions the model focused on to make its prediction.
                </p>
            </div>
        </div>
    );
};

export default GradCAMViewer;
