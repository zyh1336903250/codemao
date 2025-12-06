import React, { useState } from 'react';
import { StageSelector } from './components/StageSelector';
import { CodeEditor } from './components/CodeEditor';
import { Visualizer } from './components/Visualizer';
import { AiAdvisor } from './components/AiAdvisor';
import { STAGES } from './constants';
import { CodingStage, Command } from './types';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<CodingStage>(CodingStage.KIDS);
  const [commands, setCommands] = useState<Command[]>([]);
  
  // Game State
  const [position, setPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [target, setTarget] = useState({ x: 3, y: 3 });
  const [isRunning, setIsRunning] = useState(false);

  // Handlers
  const handleAddCommand = (cmd: Command) => {
    if (isRunning) return;
    setCommands(prev => [...prev, cmd]);
  };

  const handleClear = () => {
    if (isRunning) return;
    setCommands([]);
    setPosition({ x: 0, y: 0, rotation: 0 });
  };

  const handleRun = async () => {
    if (isRunning || commands.length === 0) return;
    setIsRunning(true);
    
    // Reset before running
    let currentPos = { x: 0, y: 0, rotation: 0 };
    setPosition(currentPos);
    
    // Small delay to show reset
    await new Promise(r => setTimeout(r, 500));

    // Execute logic
    for (const cmd of commands) {
      if (cmd.type === 'move_forward') {
        // Normalize rotation to 4 directions
        const normRot = (currentPos.rotation % 360 + 360) % 360;
        
        // Update model logic for rotation visual
        // Let's simplify: 0 = East, 90 = South, 180 = West, 270 = North
        if (normRot === 0) currentPos.x = Math.min(4, currentPos.x + 1);
        if (normRot === 90) currentPos.y = Math.min(4, currentPos.y + 1);
        if (normRot === 180) currentPos.x = Math.max(0, currentPos.x - 1);
        if (normRot === 270) currentPos.y = Math.max(0, currentPos.y - 1);
        
      } else if (cmd.type === 'turn_right') {
        currentPos.rotation += 90;
      } else if (cmd.type === 'turn_left') {
        currentPos.rotation -= 90;
      } else if (cmd.type === 'loop') {
         // Visualize loop pause
         await new Promise(r => setTimeout(r, 300));
      }

      setPosition({ ...currentPos });
      // Wait for animation
      await new Promise(r => setTimeout(r, 800));
    }

    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 p-4 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6 md:mb-12 text-center">
          <h1 className="text-2xl md:text-5xl font-display font-bold text-codemao-dark mb-2 md:mb-4">
            从 <span className="text-codemao-orange">积木</span> 到 <span className="text-codemao-blue">代码</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto">
            直观展示孩子如何从 <strong>Kids</strong> 的图标编程，过渡到 <strong>Nemo</strong> 的积木编程。
          </p>
        </header>

        {/* Stage Selection */}
        <StageSelector 
          currentStage={currentStage} 
          onChange={(s) => {
            setCurrentStage(s);
            handleClear(); // Clear code when switching to avoid incompatible logic for this simple demo
          }} 
          stages={STAGES} 
        />

        {/* Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-8 md:mb-12">
          
          {/* Left: Code Input */}
          {/* On mobile, we want this to take appropriate height but not fixed 600px if content is small */}
          <div className="lg:col-span-5 h-[500px] md:h-[600px]">
            <CodeEditor 
              stage={currentStage}
              commands={commands}
              onAddCommand={handleAddCommand}
              onRun={handleRun}
              onClear={handleClear}
              isRunning={isRunning}
            />
          </div>

          {/* Right: Visualizer & AI */}
          <div className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
            <div className="w-full">
               <Visualizer 
                 position={position} 
                 target={target} 
                 stage={currentStage} 
               />
            </div>
            
            <div className="flex-shrink-0">
              <AiAdvisor stage={currentStage} commands={commands} />
            </div>
          </div>

        </div>

        {/* Footer info */}
        <footer className="text-center text-gray-400 text-xs md:text-sm pb-4 md:pb-8">
           <p>© 编程猫成长路径可视化. Built with Gemini API.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;