export enum CodingStage {
  KIDS = 'KIDS',
  NEMO = 'NEMO'
}

export interface Command {
  id: string;
  type: 'move_forward' | 'turn_right' | 'turn_left' | 'loop';
  value?: number;
  children?: Command[]; // For loops
}

export interface StageConfig {
  id: CodingStage;
  title: string;
  subtitle: string;
  description: string;
  focus: string;
  color: string;
}

export interface AiResponse {
  insight: string;
  educationalValue: string;
}