import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function DashboardCards({ totalAlunos, totalEntregues, totalNaoEntregues, totalAnalisadas }) {
  const cards = [
    {
      label: 'Alunos',
      value: totalAlunos,
      icon: <GroupIcon sx={{ color: '#6C63FF', fontSize: 32 }} />,
      color: '#6C63FF',
      growth: '+10%',
    },
    {
      label: 'Redações Entregues',
      value: totalEntregues,
      icon: <AssignmentTurnedInIcon sx={{ color: '#43a047', fontSize: 32 }} />,
      color: '#43a047',
      growth: '+25%',
    },
    {
      label: 'Não Entregues',
      value: totalNaoEntregues,
      icon: <EmojiEventsIcon sx={{ color: '#FFD600', fontSize: 32 }} />,
      color: '#FFD600',
      growth: '+5%',
    },
    {
      label: 'Analisadas',
      value: totalAnalisadas,
      icon: <AssignmentTurnedInIcon sx={{ color: '#6C63FF', fontSize: 32 }} />,
      color: '#6C63FF',
      growth: '+20%',
    },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
      {cards.map((card, idx) => (
        <Paper
          key={idx}
          elevation={2}
          sx={{
            minWidth: 240,
            maxWidth: 280,
            flex: '1 1 240px',
            p: 4,
            borderRadius: 6,
            bgcolor: '#fff',
            boxShadow: '0 4px 24px rgba(108,99,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'relative',
            mb: { xs: 2, md: 0 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ bgcolor: card.color, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
              {card.icon}
            </Box>
            <Typography variant="subtitle1" sx={{ color: card.color, fontWeight: 600, fontSize: 18 }}>{card.label}</Typography>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#222', mb: 2, fontSize: 36 }}>{card.value}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'absolute', bottom: 24, right: 24 }}>
            <TrendingUpIcon sx={{ fontSize: 20, color: card.color }} />
            <Typography variant="body2" sx={{ color: card.color, fontWeight: 500, fontSize: 15 }}>{card.growth}</Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
