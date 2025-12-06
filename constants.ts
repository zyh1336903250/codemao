import { CodingStage, StageConfig } from "./types";

export const STAGES: Record<CodingStage, StageConfig> = {
  [CodingStage.KIDS]: {
    id: CodingStage.KIDS,
    title: "Kids 幼儿版",
    subtitle: "图标 & 符号编程",
    description: "无需识字。通过直观的符号，让孩子理解序列、逻辑和因果关系，培养计算思维萌芽。",
    focus: "逻辑思维",
    color: "#FFC800"
  },
  [CodingStage.NEMO]: {
    id: CodingStage.NEMO,
    title: "Nemo 小学版",
    subtitle: "积木块编程",
    description: "向结构化过渡。像搭积木一样拼接指令，可视化地学习参数、循环和条件判断。",
    focus: "计算概念",
    color: "#4A90E2"
  }
};