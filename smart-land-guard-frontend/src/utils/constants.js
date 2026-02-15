export const COLORS = {
  primary: {
    deepBlue: '#0A2342',
    cyan: '#00D9FF',
    ocean: '#1E3A8A',
    electric: '#0EA5E9'
  },
  secondary: {
    emerald: '#00C9A7',
    forest: '#059669',
    mint: '#6EE7B7'
  },
  accent: {
    warning: '#FFB627',
    danger: '#EF4444',
    success: '#10B981',
    info: '#8B5CF6'
  }
};

export const PARTICLE_CONFIG = {
  count: 100,
  size: [1, 3],
  color: '#00D9FF',
  opacity: [0.1, 0.6],
  speed: [0.5, 2],
  direction: 'upward',
  lifetime: [3, 8]
};

export const MAP_CONFIG = {
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [78.4744, 17.3850], // Hyderabad
  zoom: 10,
  pitch: 45,
  bearing: 0
};

export const DASHBOARD_YEARS = [2019, 2020, 2021, 2022, 2023, 2024];

export const DASHBOARD_AREA_DATA = {
  2019: 545,
  2020: 543,
  2021: 538,
  2022: 520,
  2023: 505,
  2024: 498
};

export const DASHBOARD_CHANGE_ZONES = [
  { id: 'A', type: 'Significant', area: 15, color: 'red', description: 'Significant land-cover change' },
  { id: 'B', type: 'Significant', area: 12, color: 'red', description: 'Significant land-cover change' },
  { id: 'C', type: 'Moderate', area: 8, color: 'yellow', description: 'Moderate change (manual review suggested)' },
  { id: 'D', type: 'Stable', area: 0, color: 'green', description: 'Stable / improved water extent' }
];

export const DASHBOARD_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: '#94A3B8'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: '#fff',
      bodyColor: '#94A3B8'
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 480,
      max: 560,
      ticks: {
        color: '#94A3B8'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.05)'
      }
    },
    x: {
      ticks: {
        color: '#94A3B8'
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.05)'
      }
    }
  }
};
