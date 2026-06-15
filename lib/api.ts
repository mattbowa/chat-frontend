import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const register = (data: { tenant_name: string; tenant_slug: string; email: string; password: string }) =>
  api.post<{ access_token: string }>("/auth/register", data);

export const login = (data: { email: string; password: string }) =>
  api.post<{ access_token: string }>("/auth/login", data);

export const getMe = () => api.get("/auth/me");

// Documents
export const uploadDocument = (file: File) => {
  const form = new FormData();
  form.append("file", file);
  return api.post("/documents/upload", form);
};

export const listDocuments = () => api.get("/documents");

export const deleteDocument = (id: string) => api.delete(`/documents/${id}`);

export const getDocumentDownloadUrl = (id: string) =>
  `${api.defaults.baseURL}/documents/${id}/download`;

// Settings
export const getSettings = () => api.get("/settings");

export const updateSettings = (data: Partial<{
  system_prompt: string;
  model: string;
  temperature: number;
  top_k_chunks: number;
  max_response_tokens: number;
  fallback_message: string;
  suggested_questions: string[];
  bot_name: string;
  primary_color: string;
  logo_url: string | null;
}>) => api.patch("/settings", data);

// Analytics
export const getAnalytics = () => api.get("/analytics/usage");

// Chat sessions
export const listSessions = () => api.get("/chat/sessions");
export const getSession = (id: string) => api.get(`/chat/sessions/${id}`);
