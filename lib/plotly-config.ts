export const plotlyConfig = {
  displayModeBar: false,
  responsive: true,
};

export const plotlyLayout = {
  font: {
    family: 'Geist, system-ui, -apple-system, sans-serif',
    size: 12,
    color: 'oklch(22% 0.01 85)',
  },
  paper_bgcolor: 'transparent',
  plot_bgcolor: 'transparent',
  margin: { t: 20, r: 20, b: 40, l: 50 },
  xaxis: {
    gridcolor: 'oklch(92% 0.008 85)',
    linecolor: 'oklch(85% 0.01 85)',
    zerolinecolor: 'oklch(85% 0.01 85)',
  },
  yaxis: {
    gridcolor: 'oklch(92% 0.008 85)',
    linecolor: 'oklch(85% 0.01 85)',
    zerolinecolor: 'oklch(85% 0.01 85)',
  },
  colorway: [
    'oklch(55% 0.12 195)',
    'oklch(65% 0.1 195)',
    'oklch(75% 0.08 195)',
  ],
};

export function getHistogramTrace(bins: number[], counts: number[]) {
  return {
    x: bins,
    y: counts,
    type: 'bar' as const,
    marker: {
      color: 'oklch(55% 0.12 195)',
      line: {
        color: 'oklch(48% 0.12 195)',
        width: 1,
      },
    },
  };
}
