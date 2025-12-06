import React, { useEffect, useState } from 'react';
import { BrainCircuit, Sparkles, Lightbulb } from 'lucide-react';
import { generateEducationalInsight } from '../services/gemini';
import { CodingStage, Command } from '../types';

interface AiAdvisorProps {
  stage: CodingStage;
  commands: Command[];
}

export const AiAdvisor: React.FC<AiAdvisorProps> = ({ stage, commands }) => {
  const [insight, setInsight] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Debounce the API call to avoid spamming
    const timer = setTimeout(async () => {
      if (commands.length > 0) {
        setLoading(true);
        const result = await generateEducationalInsight(stage, commands);
        setInsight(result.insight);
        setSuggestion(result.suggestion);
        setLoading(false);
      } else {
        setInsight("开始添加指令，查看教育分析！");
        setSuggestion("");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [stage, commands]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-purple-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-2xl"></div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
           <BrainCircuit size={24} />
        </div>
        <div>
           <h3 className="font-bold text-gray-800">家长 AI 顾问</h3>
           <p className="text-xs text-purple-600">由 Gemini 2.5 驱动</p>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className={`transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          <div className="flex gap-3 items-start">
             <Lightbulb className="text-codemao-yellow flex-shrink-0 mt-1" size={18} />
             <p className="text-gray-600 text-sm leading-relaxed">
               {insight || "等待输入..."}
             </p>
          </div>
        </div>

        {suggestion && (
          <div className={`bg-purple-50 p-4 rounded-xl border border-purple-100 transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex gap-2 items-center mb-2">
               <Sparkles size={16} className="text-purple-600" />
               <span className="font-bold text-purple-700 text-xs uppercase tracking-wider">成长建议</span>
            </div>
            <p className="text-purple-800 text-sm italic">
               "{suggestion}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};