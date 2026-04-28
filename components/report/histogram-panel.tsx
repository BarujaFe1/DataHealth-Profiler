'use client';

import dynamic from 'next/dynamic';
import { Distribution } from '@/lib/types';
import { plotlyConfig, plotlyLayout, getHistogramTrace } from '@/lib/plotly-config';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

export default function HistogramPanel({ distribution }: { distribution?: Distribution }) {
  if (!distribution) {
    return (
      <div className="flex h-80 items-center justify-center text-sm text-[var(--text-tertiary)]">
        No distribution data available
      </div>
    );
  }

  const trace = getHistogramTrace(distribution.bins, distribution.counts);

  return (
    <div className="h-80">
      <Plot
        data={[trace]}
        layout={{
          ...plotlyLayout,
          height: 320,
          showlegend: false,
          xaxis: {
            ...plotlyLayout.xaxis,
            title: { text: 'Value' },
          },
          yaxis: {
            ...plotlyLayout.yaxis,
            title: { text: 'Count' },
          },
        }}
        config={plotlyConfig}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
