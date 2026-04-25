import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercentage(num: number, decimals: number = 1): string {
  return `${num.toFixed(decimals)}%`;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function getHealthColor(score: number): string {
  if (score >= 90) return 'text-[oklch(75%_0.15_145)]';
  if (score >= 75) return 'text-[oklch(80%_0.12_120)]';
  if (score >= 60) return 'text-[oklch(75%_0.14_85)]';
  if (score >= 40) return 'text-[oklch(65%_0.18_45)]';
  return 'text-[oklch(60%_0.2_25)]';
}

export function getHealthBgColor(score: number): string {
  if (score >= 90) return 'bg-[oklch(75%_0.15_145)]/10';
  if (score >= 75) return 'bg-[oklch(80%_0.12_120)]/10';
  if (score >= 60) return 'bg-[oklch(75%_0.14_85)]/10';
  if (score >= 40) return 'bg-[oklch(65%_0.18_45)]/10';
  return 'bg-[oklch(60%_0.2_25)]/10';
}

export function getHealthLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Fair';
  if (score >= 40) return 'Poor';
  return 'Critical';
}

export function getSeverityColor(severity: 'critical' | 'warning' | 'info'): string {
  switch (severity) {
    case 'critical':
      return 'text-[oklch(60%_0.2_25)]';
    case 'warning':
      return 'text-[oklch(65%_0.18_45)]';
    case 'info':
      return 'text-[oklch(55%_0.12_195)]';
  }
}

export function getSeverityBgColor(severity: 'critical' | 'warning' | 'info'): string {
  switch (severity) {
    case 'critical':
      return 'bg-[oklch(60%_0.2_25)]/10';
    case 'warning':
      return 'bg-[oklch(65%_0.18_45)]/10';
    case 'info':
      return 'bg-[oklch(55%_0.12_195)]/10';
  }
}
