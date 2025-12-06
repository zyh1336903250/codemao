import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cat, Star } from 'lucide-react';
import { CodingStage } from '../types';

interface VisualizerProps {
  position: { x: number; y: number; rotation: number };
  target: { x: number; y: number };
  stage: CodingStage;
}

export const Visualizer: React.FC<VisualizerProps> = ({ position, target, stage }) => {
  const [gridSize] = useState(5);

  // Background style based on stage
  const getBgStyle = () => {
    switch (stage) {
      case CodingStage.KIDS: return 'bg-yellow-50';
      case CodingStage.NEMO: return 'bg-blue-50';
      default: return 'bg-white';
    }
  };

  const getGridColor = () => {
      switch (stage) {
      case CodingStage.KIDS: return 'border-codemao-yellow/20';
      case CodingStage.NEMO: return 'border-blue-200';
      default: return 'border-gray-200';
    }
  }

  return (
    <div className={`w-full aspect-square ${getBgStyle()} rounded-2xl relative overflow-hidden transition-colors duration-500 shadow-inner max-w-lg mx-auto`}>
      {/* Grid */}
      <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 w-full h-full">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className={`border ${getGridColor()} box-border`} />
        ))}
      </div>

      {/* Target (Star) */}
      <div 
        className="absolute w-1/5 h-1/5 flex items-center justify-center transition-all duration-300"
        style={{ 
          left: `${target.x * 20}%`, 
          top: `${target.y * 20}%` 
        }}
      >
        <Star 
            className={`w-3/5 h-3/5 text-codemao-orange drop-shadow-md animate-pulse`} 
            fill={"#FF8C00"}
        />
      </div>

      {/* Character (Cat) */}
      <motion.div
        className="absolute w-1/5 h-1/5 flex items-center justify-center z-10"
        animate={{
          left: `${position.x * 20}%`,
          top: `${position.y * 20}%`,
          rotate: position.rotation
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
         <div className={`
             relative w-3/4 h-3/4 rounded-full flex items-center justify-center shadow-lg
             ${stage === CodingStage.KIDS ? 'bg-white border-2 md:border-4 border-codemao-yellow' : ''}
             ${stage === CodingStage.NEMO ? 'bg-white border-2 md:border-4 border-blue-500' : ''}
         `}>
            <Cat 
                className={`w-1/2 h-1/2 text-codemao-dark`} 
            />
            {/* Direction Indicator */}
            <div className="absolute -top-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full" />
         </div>
      </motion.div>

      {/* Overlay Text for context */}
      <div className="absolute bottom-2 left-3 md:bottom-4 md:left-4 font-display font-bold text-sm md:text-lg opacity-30 pointer-events-none">
        {stage === CodingStage.KIDS && "游乐场模式"}
        {stage === CodingStage.NEMO && "画布预览"}
      </div>
    </div>
  );
};