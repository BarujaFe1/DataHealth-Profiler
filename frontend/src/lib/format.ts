import type { FlagSeverity, HealthStatus } from "@/lib/types";

export function formatPercent(value: number, digits = 0): string {
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatNumber(value: number | null | undefined, digits = 2): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
  }).format(value);
}

export function healthTone(status: HealthStatus): string {
  switch (status) {
    case "healthy":
      return "var(--healthy)";
    case "attention":
      return "var(--warn)";
    case "critical":
      return "var(--critical)";
    default:
      return "var(--ink)";
  }
}

export function severityTone(severity: FlagSeverity): string {
  switch (severity) {
    case "critical":
      return "critical";
    case "warning":
      return "warning";
    default:
      return "info";
  }
}
