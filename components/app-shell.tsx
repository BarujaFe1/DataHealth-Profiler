'use client';

import { useReducer, useState } from 'react';
import TopBar from './top-bar';
import EmptyState from './empty-state';
import LoadingState from './loading-state';
import ErrorState from './error-state';
import UploadDropzone from './upload-dropzone';
import DemoDatasetButton from './demo-dataset-button';
import HealthScoreCard from './report/health-score-card';
import DatasetMetaCard from './report/dataset-meta-card';
import SummaryStatCard from './report/summary-stat-card';
import AttentionCallout from './report/attention-callout';
import ColumnTable from './report/column-table';
import ColumnDetailDrawer from './report/column-detail-drawer';
import { appReducer } from '@/lib/reducer';
import { simulateProcessing } from '@/lib/mock-data';
import { ColumnProfile } from '@/lib/types';

export default function AppShell() {
  const [state, dispatch] = useReducer(appReducer, { status: 'idle' });
  const [selectedColumn, setSelectedColumn] = useState<ColumnProfile | null>(null);

  const handleUpload = async (file: File) => {
    dispatch({ type: 'UPLOAD_START', fileName: file.name });
    
    setTimeout(() => {
      dispatch({ type: 'UPLOAD_COMPLETE' });
    }, 100);

    try {
      const report = await simulateProcessing();
      dispatch({ type: 'PROCESS_SUCCESS', report });
    } catch (error) {
      dispatch({ 
        type: 'PROCESS_ERROR', 
        message: error instanceof Error ? error.message : 'Failed to process dataset' 
      });
    }
  };

  const handleDemoClick = async () => {
    dispatch({ type: 'UPLOAD_START', fileName: 'customer_transactions_2024.csv' });
    
    setTimeout(() => {
      dispatch({ type: 'UPLOAD_COMPLETE' });
    }, 100);

    try {
      const report = await simulateProcessing();
      dispatch({ type: 'PROCESS_SUCCESS', report });
    } catch (error) {
      dispatch({ 
        type: 'PROCESS_ERROR', 
        message: 'Failed to load demo dataset' 
      });
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    setSelectedColumn(null);
  };

  const handleColumnSelect = (columnName: string) => {
    if (state.status === 'success') {
      const column = state.report.columns.find(c => c.name === columnName);
      if (column) {
        setSelectedColumn(column);
      }
    }
  };

  const handleCloseDrawer = () => {
    setSelectedColumn(null);
  };

  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      <TopBar />
      
      <main className="mx-auto max-w-7xl px-6 py-8">
        {state.status === 'idle' && (
          <div className="space-y-6">
            <EmptyState />
            <div className="mx-auto max-w-2xl space-y-4">
              <UploadDropzone onUpload={handleUpload} />
              <DemoDatasetButton onClick={handleDemoClick} />
            </div>
          </div>
        )}

        {state.status === 'uploading' && (
          <LoadingState fileName={state.fileName} />
        )}

        {state.status === 'processing' && (
          <LoadingState fileName={state.fileName} />
        )}

        {state.status === 'error' && (
          <ErrorState message={state.message} onRetry={handleReset} />
        )}

        {state.status === 'success' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                  Data Health Report
                </h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {state.report.datasetName}
                </p>
              </div>
              <button
                onClick={handleReset}
                className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--interactive-secondary)]"
              >
                New Analysis
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <HealthScoreCard health={state.report.overallHealth} />
              <DatasetMetaCard 
                summary={state.report.summary}
                datasetName={state.report.datasetName}
                uploadedAt={state.report.uploadedAt}
              />
              <SummaryStatCard
                label="Columns Analyzed"
                value={state.report.summary.columnCount}
                icon={
                  <svg
                    className="h-5 w-5 text-[var(--text-tertiary)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                    />
                  </svg>
                }
              />
            </div>

            {state.report.attentionItems.length > 0 && (
              <AttentionCallout items={state.report.attentionItems} />
            )}

            <ColumnTable 
              columns={state.report.columns}
              onColumnSelect={handleColumnSelect}
            />
          </div>
        )}
      </main>

      <ColumnDetailDrawer
        column={selectedColumn}
        isOpen={selectedColumn !== null}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
