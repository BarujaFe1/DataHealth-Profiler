import type { ApiErrorBody, DemoDataset, ProfileReport } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function parseError(response: Response): Promise<string> {
  try {
    const payload = await response.json();
    const detail = payload.detail as ApiErrorBody | string | undefined;
    if (typeof detail === "string") return detail;
    if (detail && typeof detail === "object") {
      return [detail.error, detail.detail].filter(Boolean).join(" — ");
    }
    if (payload.error) return String(payload.error);
  } catch {
    // fall through
  }
  return `Request failed (${response.status})`;
}

export async function fetchDemos(): Promise<DemoDataset[]> {
  const response = await fetch(`${API_BASE}/api/demos`, { cache: "no-store" });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}

export async function profileUpload(file: File): Promise<ProfileReport> {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch(`${API_BASE}/api/profile`, {
    method: "POST",
    body,
  });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}

export async function profileDemo(demoId: string): Promise<ProfileReport> {
  const response = await fetch(`${API_BASE}/api/profile/demo/${demoId}`, {
    method: "POST",
  });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}

export function getApiBase(): string {
  return API_BASE;
}
