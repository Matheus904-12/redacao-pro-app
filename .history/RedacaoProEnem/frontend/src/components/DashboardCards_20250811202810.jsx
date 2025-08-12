import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export default function DashboardCards({ totalAlunos, totalEntregues, totalNaoEntregues, totalAnalisadas }) {
  const cards = [
    {
      label: 'Alunos',
      value: totalAlunos,
      icon: <GroupIcon sx={{ color: '#6C63FF', fontSize: 32 }} />,
      color: 'primary.main',
    },
    {
      label: 'Redações Entregues',
      value: totalEntregues,
      icon: <AssignmentTurnedInIcon sx={{ color: '#43a047', fontSize: 32 }} />,
      color: 'info.main',
    },
    {
      label: 'Não Entregues',
      value: totalNaoEntregues,
      icon: <EmojiEventsIcon sx={{ color: '#FFD600', fontSize: 32 }} />,
      color: 'secondary.main',
    },
    {
      label: 'Analisadas',
      value: totalAnalisadas,
      icon: <AssignmentTurnedInIcon sx={{ color: '#6C63FF', fontSize: 32 }} />,
      color: 'primary.main',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cards.map((card, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 4 }}>
            <Box sx={{ mb: 1 }}>{card.icon}</Box>
            <Typography variant="h6" sx={{ color: card.color, fontWeight: 600 }}>{card.label}</Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>{card.value}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
