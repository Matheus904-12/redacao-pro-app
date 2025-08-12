import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Bar, Radar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Tooltip, Legend);

export default function DesempenhoGrafico({ competencias, notaTotal }) {
  const labels = competencias.map(c => c.nome);
  const notas = competencias.map(c => c.nota);

  const radarData = {
    labels,
    datasets: [
      {
        label: 'Competências ENEM',
        data: notas,
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        borderColor: '#1976d2',
        pointBackgroundColor: '#1976d2',
      },
    ],
  };

  const barData = {
    labels: ['Nota Geral'],
    datasets: [
      {
        label: 'Nota ENEM',
        data: [notaTotal],
        backgroundColor: '#43a047',
      },
    ],
  };

  return (
  <Paper elevation={4} sx={{ p: 3, mb: 3, borderRadius: 2, background: 'linear-gradient(120deg, #e3f2fd 0%, #fff 100%)', boxShadow: '0 8px 32px rgba(25,118,210,0.12)' }}>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>Desempenho do Aluno</Typography>
      <Radar data={radarData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 1000 } } }} />
    </Paper>
  );
}
