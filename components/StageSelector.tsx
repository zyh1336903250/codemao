import React from 'react';
import { CodingStage, StageConfig } from '../types';
import { Baby, Blocks } from 'lucide-react';

interface StageSelectorProps {
  currentStage: CodingStage;
  onChange: (stage: CodingStage) => void;
  stages: Record<CodingStage, StageConfig>;
}

export const StageSelector: React.FC<StageSelectorProps> = ({ currentStage, onChange, stages }) => {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-4 w-full mb-6 md:mb-8">
      {(Object.keys(stages) as CodingStage[]).map((stageKey) => {
        const stage = stages[stageKey];
        const isActive = currentStage === stageKey;
        
        let Icon = Baby;
        if (stageKey === CodingStage.NEMO) Icon = Blocks;

        return (
          <button
            key={stageKey}
            onClick={() => onChange(stageKey)}
            className={`
              flex-1 relative overflow-hidden rounded-xl md:rounded-2xl p-3 md:p-6 transition-all duration-300 border-2 text-left group
              ${isActive 
                ? 'bg-white border-codemao-orange shadow-lg scale-105 z-10' 
                : 'bg-white/50 border-transparent hover:border-gray-200 hover:bg-white/80 grayscale opacity-70 hover:grayscale-0 hover:opacity-100'}
            `}
          >
            <div className={`absolute top-0 right-0 p-2 md:p-4 opacity-10 ${isActive ? 'opacity-20' : ''}`}>
               <Icon className="w-12 h-12 md:w-20 md:h-20" color={stage.color} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-sm md:text-xl font-display font-bold text-gray-800 mb-0.5 md:mb-1">{stage.title}</h3>
              <p className="text-xs md:text-sm font-semibold text-gray-500 mb-1 md:mb-2">{stage.subtitle}</p>
              {/* Hide full description on mobile to save space */}
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed hidden md:block">{stage.description}</p>
            </div>
            
            {isActive && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-codemao-yellow to-codemao-orange" />
            )}
          </button>
        );
      })}
    </div>
  );
};