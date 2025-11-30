import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaImage, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const UploadBox = ({ onImageSelect, selectedImage, onClear }) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const previewUrl = URL.createObjectURL(file);
            onImageSelect(file, previewUrl);
        }
    }, [onImageSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/jpg': []
        },
        maxFiles: 1,
        multiple: false
    });

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {!selectedImage ? (
                    <motion.div
                        key="upload-zone"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        {...getRootProps()}
                        className={`
              relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300
              ${isDragActive
                                ? 'border-primary bg-primary/5 scale-[1.02]'
                                : 'border-slate-300 hover:border-primary hover:bg-slate-50'
                            }
            `}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className={`
                p-4 rounded-full transition-colors duration-300
                ${isDragActive ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}
              `}>
                                <FaCloudUploadAlt size={40} />
                            </div>
                            <div>
                                <p className="text-lg font-medium text-slate-700">
                                    {isDragActive ? 'Drop the image here' : 'Drag & drop image here'}
                                </p>
                                <p className="text-sm text-slate-500 mt-1">
                                    or click to select file
                                </p>
                            </div>
                            <p className="text-xs text-slate-400">
                                Supports: JPG, JPEG, PNG
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50"
                    >
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="w-full h-64 sm:h-80 object-contain bg-black/5"
                        />

                        <div className="absolute top-0 left-0 w-full h-full bg-black/0 hover:bg-black/10 transition-colors duration-200 flex items-start justify-end p-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClear();
                                }}
                                className="bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 p-2 rounded-full shadow-md backdrop-blur-sm transition-all duration-200 transform hover:scale-110"
                                title="Remove image"
                            >
                                <FaTimes size={16} />
                            </button>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 p-3 flex items-center justify-center space-x-2 text-sm text-slate-600 font-medium">
                            <FaImage className="text-primary" />
                            <span>Image Selected</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UploadBox;
