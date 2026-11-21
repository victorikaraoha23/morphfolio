import "server-only";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";

let cachedProvider: ReturnType<typeof createOpenRouter> | undefined;

export function getOpenRouter() {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  cachedProvider ??= createOpenRouter({
    apiKey,
    appName: "MorphFolio",
    appUrl: process.env.NEXT_PUBLIC_APP_URL
  });

  return cachedProvider;
}

export function getAnalysisModelId() {
  const modelId = process.env.OPENROUTER_ANALYSIS_MODEL?.trim();

  if (!modelId) {
    throw new Error("OPENROUTER_ANALYSIS_MODEL is not configured.");
  }

  return modelId;
}
