// src/composables/useLogger.js
export function useLogger() {
  const logClick = async (modelName) => {
    // Không cần await để UI không bị khựng lại (gửi ngầm)
    fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: modelName })
    }).catch(err => console.warn("Log failed:", err));
  };

  return { logClick };
}