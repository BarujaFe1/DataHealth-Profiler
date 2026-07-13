"use client";

import { useCallback, useRef, useState } from "react";

interface UploadZoneProps {
  disabled?: boolean;
  onFile: (file: File) => void;
}

export function UploadZone({ disabled, onFile }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const acceptFile = useCallback(
    (file: File | undefined) => {
      if (!file || disabled) return;
      if (!file.name.toLowerCase().endsWith(".csv")) {
        window.alert("Only .csv files are supported in V1.");
        return;
      }
      onFile(file);
    },
    [disabled, onFile],
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      className={`upload-zone ${dragging ? "is-dragging" : ""} ${disabled ? "is-disabled" : ""}`}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(event) => {
        if (disabled) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        acceptFile(event.dataTransfer.files?.[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="sr-only"
        disabled={disabled}
        onChange={(event) => acceptFile(event.target.files?.[0])}
      />
      <p className="upload-kicker">Drop a CSV here</p>
      <p className="upload-title">Inspect dataset health in seconds</p>
      <p className="upload-hint">
        Max 10 MB · up to 50,000 rows · V1 supports CSV only
      </p>
      <span className="upload-cta">Choose file</span>
    </div>
  );
}
