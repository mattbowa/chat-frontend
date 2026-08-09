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
  allowed_domains: string[];
  bot_name: string;
  primary_color: string;
  logo_url: string | null;
}>) => api.patch("/settings", data);

// Integrations
export const listIntegrations = () => api.get("/integrations");

export const upsertWebsite = (data: { site_url: string }) =>
  api.put("/integrations/website", data);

export const triggerSync = (id: string) => api.post(`/integrations/${id}/sync`);

export const deleteIntegration = (id: string) => api.delete(`/integrations/${id}`);

// Analytics
export const getAnalytics = () => api.get("/analytics/usage");

// Contact
export const submitContact = (data: { name: string; email: string; message: string; source?: string }) =>
  api.post("/public/contact", data);

export const listContactSubmissions = () => api.get("/contact/submissions");

// Chat sessions
export const listSessions = () => api.get("/chat/sessions");
export const getSession = (id: string) => api.get(`/chat/sessions/${id}`);

// Curated answers (Q&A pairs)
export type QAPair = {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
};

export const listQAPairs = () => api.get<QAPair[]>("/qa");

export const createQAPair = (data: { question: string; answer: string }) =>
  api.post<QAPair>("/qa", data);

export const updateQAPair = (id: string, data: { question: string; answer: string }) =>
  api.patch<QAPair>(`/qa/${id}`, data);

export const deleteQAPair = (id: string) => api.delete(`/qa/${id}`);
