import type { DemoDataset, ProfileReport } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type DemoSource = "api" | "static";

async function parseError(response: Response): Promise<string> {
  try {
    const payload = await response.json();
    const detail = payload.detail as
      | { error?: string; detail?: string | null }
      | string
      | undefined;
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

async function fetchStaticCatalog(): Promise<DemoDataset[]> {
  const response = await fetch("/demo-reports/catalog.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Static demo catalog unavailable");
  }
  return response.json();
}

async function fetchStaticDemo(demoId: string): Promise<ProfileReport> {
  const response = await fetch(`/demo-reports/${demoId}.json`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Static demo not found: ${demoId}`);
  }
  return response.json();
}

export async function probeApiHealth(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1500);
    const response = await fetch(`${API_BASE}/api/health`, {
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timer);
    return response.ok;
  } catch {
    return false;
  }
}

export async function fetchDemos(): Promise<{ demos: DemoDataset[]; source: DemoSource }> {
  try {
    const response = await fetch(`${API_BASE}/api/demos`, { cache: "no-store" });
    if (!response.ok) throw new Error(await parseError(response));
    return { demos: await response.json(), source: "api" };
  } catch {
    const demos = await fetchStaticCatalog();
    return { demos, source: "static" };
  }
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

export async function profileDemo(
  demoId: string,
): Promise<{ report: ProfileReport; source: DemoSource }> {
  try {
    const response = await fetch(`${API_BASE}/api/profile/demo/${demoId}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error(await parseError(response));
    return { report: await response.json(), source: "api" };
  } catch {
    return { report: await fetchStaticDemo(demoId), source: "static" };
  }
}

export function getApiBase(): string {
  return API_BASE;
}
