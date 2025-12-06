import React from 'react';
import { CodingStage, Command } from '../types';
import { ArrowUp, RotateCw, RotateCcw, Repeat, Play, Trash2 } from 'lucide-react';

interface CodeEditorProps {
  stage: CodingStage;
  commands: Command[];
  onAddCommand: (cmd: Command) => void;
  onRun: () => void;
  onClear: () => void;
  isRunning: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  stage, 
  commands, 
  onAddCommand, 
  onRun, 
  onClear,
  isRunning
}) => {
  
  // -- KIDS STAGE RENDERER --
  if (stage === CodingStage.KIDS) {
    return (
      <div className="bg-codemao-yellow/10 p-4 md:p-6 rounded-2xl h-full flex flex-col border-2 border-codemao-yellow/20">
        <h4 className="font-display font-bold text-codemao-dark mb-2 md:mb-4 text-base md:text-lg flex items-center gap-2">
          <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-codemao-yellow flex items-center justify-center text-white text-xs md:text-sm">1</span>
          指令面板
        </h4>
        
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-8">
          <button 
            onClick={() => onAddCommand({ id: crypto.randomUUID(), type: 'move_forward' })}
            className="bg-white p-3 md:p-4 rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all flex flex-col items-center justify-center gap-1 md:gap-2 border-b-4 border-codemao-yellow active:border-b-0 active:translate-y-1"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
              <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="font-bold text-gray-600 text-sm md:text-base">前进</span>
          </button>

          <button 
            onClick={() => onAddCommand({ id: crypto.randomUUID(), type: 'turn_right' })}
            className="bg-white p-3 md:p-4 rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all flex flex-col items-center justify-center gap-1 md:gap-2 border-b-4 border-codemao-orange active:border-b-0 active:translate-y-1"
          >
             <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
              <RotateCw className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="font-bold text-gray-600 text-sm md:text-base">转向</span>
          </button>
        </div>

        <div className="flex-1 bg-white rounded-xl p-3 md:p-4 shadow-inner overflow-y-auto mb-4 relative min-h-[100px]">
          <div className="absolute top-2 left-3 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">指令序列</div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-4">
             {commands.length === 0 && <span className="text-gray-400 italic text-sm">点击上方按钮...</span>}
             {commands.map((cmd, idx) => (
               <div key={cmd.id} className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 border border-gray-200 font-bold shadow-sm animate-in zoom-in duration-200">
                  {cmd.type === 'move_forward' && <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />}
                  {cmd.type === 'turn_right' && <RotateCw className="w-4 h-4 md:w-5 md:h-5" />}
                  {cmd.type === 'turn_left' && <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />}
               </div>
             ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button 
             onClick={onRun}
             disabled={isRunning}
             className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-green-200 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Play fill="white" className="w-5 h-5" /> <span className="text-sm md:text-base">运行</span>
          </button>
          <button 
             onClick={onClear}
             className="bg-red-100 hover:bg-red-200 text-red-500 font-bold p-3 rounded-xl transition-all active:scale-95"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // -- NEMO STAGE RENDERER --
  if (stage === CodingStage.NEMO) {
    return (
      <div className="bg-blue-50 p-4 md:p-6 rounded-2xl h-full flex flex-col border-2 border-blue-100">
         <h4 className="font-display font-bold text-codemao-dark mb-2 md:mb-4 text-base md:text-lg flex items-center gap-2">
          <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs md:text-sm">2</span>
          积木构建
        </h4>

        <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-2 scrollbar-hide">
           <button 
            onClick={() => onAddCommand({ id: crypto.randomUUID(), type: 'move_forward', value: 1 })}
            className="flex-shrink-0 bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-bold shadow-sm hover:shadow-md hover:bg-blue-600 text-xs md:text-sm flex items-center gap-1 md:gap-2 active:scale-95 transition-transform"
          >
            <ArrowUp size={14} /> 前进
          </button>
          <button 
             onClick={() => onAddCommand({ id: crypto.randomUUID(), type: 'turn_right', value: 90 })}
            className="flex-shrink-0 bg-purple-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-bold shadow-sm hover:shadow-md hover:bg-purple-600 text-xs md:text-sm flex items-center gap-1 md:gap-2 active:scale-95 transition-transform"
          >
            <RotateCw size={14} /> 右转
          </button>
          <button 
             onClick={() => onAddCommand({ id: crypto.randomUUID(), type: 'loop', value: 3 })}
            className="flex-shrink-0 bg-orange-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-bold shadow-sm hover:shadow-md hover:bg-orange-600 text-xs md:text-sm flex items-center gap-1 md:gap-2 active:scale-95 transition-transform"
          >
            <Repeat size={14} /> 重复
          </button>
        </div>

        <div className="flex-1 bg-slate-200 rounded-xl p-3 md:p-4 shadow-inner overflow-y-auto mb-4 relative min-h-[100px]">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           <div className="flex flex-col gap-1 relative z-10">
              {/* Start Block */}
              <div className="bg-yellow-500 text-white p-2 rounded-t-lg rounded-br-lg font-bold text-xs md:text-sm shadow-sm w-32 md:w-40 flex items-center gap-2 mb-2">
                <Play size={12} fill="white" /> 当开始被点击
              </div>

              {commands.map((cmd) => (
                <div key={cmd.id} className="animate-in slide-in-from-left duration-200">
                    <div className={`
                      p-2 md:p-3 rounded-lg text-white font-bold text-xs md:text-sm shadow-sm flex items-center gap-2 border-l-4 border-black/20
                      ${cmd.type === 'move_forward' ? 'bg-blue-500' : ''}
                      ${cmd.type === 'turn_right' ? 'bg-purple-500' : ''}
                      ${cmd.type === 'loop' ? 'bg-orange-500' : ''}
                    `}>
                       {cmd.type === 'move_forward' && <><ArrowUp size={14} /> 移动(1步)</>}
                       {cmd.type === 'turn_right' && <><RotateCw size={14} /> 右转(90度)</>}
                       {cmd.type === 'loop' && <><Repeat size={14} /> 重复(3次)</>}
                    </div>
                    {/* Visual Connector for Blocks */}
                    <div className={`h-2 w-4 ml-4 bg-black/10 ${cmd.type === 'loop' ? 'h-4 md:h-6 border-l-4 border-orange-500 bg-transparent' : ''}`}></div>
                </div>
              ))}
              {commands.length === 0 && <div className="text-gray-400 text-xs md:text-sm ml-4 mt-2">拖拽积木到这里...</div>}
           </div>
        </div>

        <div className="flex gap-3">
          <button 
             onClick={onRun}
             disabled={isRunning}
             className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-green-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Play fill="white" className="w-5 h-5" /> <span className="text-sm md:text-base">运行</span>
          </button>
          <button 
             onClick={onClear}
             className="bg-red-100 hover:bg-red-200 text-red-500 font-bold p-3 rounded-xl transition-all active:scale-95"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};