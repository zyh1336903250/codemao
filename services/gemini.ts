import { GoogleGenAI, Type } from "@google/genai";
import { CodingStage, Command } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateEducationalInsight = async (
  stage: CodingStage,
  commands: Command[]
): Promise<{ insight: string; suggestion: string }> => {
  if (!apiKey) {
    return {
      insight: "缺少 API Key。请配置环境变量。",
      suggestion: "请设置您的 Gemini API key。"
    };
  }

  const commandSummary = commands.map(c => c.type).join(', ');

  const prompt = `
    你是一位面向家长的编程教育专家顾问。
    家长正在查看编程猫课程的 "${stage}" 阶段。
    当前可视化代码序列包含：${commandSummary}。

    1. 简要解释（最多2句话）这个特定阶段主要培养什么认知技能（例如：计算思维、语法、逻辑）。
    2. 给家长提供一条简短的、鼓励性的建议，告诉他们在这个阶段如何支持孩子。

    请用简体中文回答。返回 JSON 格式。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insight: { type: Type.STRING },
            suggestion: { type: Type.STRING }
          },
          required: ["insight", "suggestion"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No response text");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      insight: "这个阶段主要培养逻辑和顺序感。",
      suggestion: "鼓励孩子尝试不同的指令顺序！"
    };
  }
};

export const translateCode = async (targetStage: CodingStage, commands: Command[]): Promise<string> => {
    if (!apiKey) return "// 缺少 API Key";

    const prompt = `
      Translate this logical sequence: ${JSON.stringify(commands)}
      Into a code snippet appropriate for: ${targetStage}.
      
      If Stage is KIDS: Describe it as a story.
      If Stage is NEMO: Describe it as pseudo-blocks text.
      
      Return plain text in Chinese.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "";
    } catch (e) {
        return "生成翻译时出错。";
    }
}