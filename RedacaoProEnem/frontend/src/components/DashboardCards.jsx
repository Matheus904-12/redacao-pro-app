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
      growth: '+0%',
    },
    {
      label: 'Redações Entregues',
      value: totalEntregues,
      icon: <AssignmentTurnedInIcon sx={{ color: '#43a047', fontSize: 32 }} />,
      color: '#43a047',
      growth: '+0%',
    },
    {
      label: 'Não Entregues',
      value: totalNaoEntregues,
      icon: <EmojiEventsIcon sx={{ color: '#FFD600', fontSize: 32 }} />,
      color: '#FFD600',
      growth: '+0%',
    },
    {
      label: 'Analisadas',
      value: totalAnalisadas,
      icon: <AssignmentTurnedInIcon sx={{ color: '#6C63FF', fontSize: 32 }} />,
      color: '#6C63FF',
      growth: '+0%',
    },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
      {cards.map((card, idx) => (
        <Paper
          key={idx}
          elevation={2}
          sx={{
            minWidth: 220,
            maxWidth: 260,
            flex: '1 1 220px',
            p: 3,
            borderRadius: 2,
            bgcolor: '#fff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'relative',
            mb: { xs: 2, md: 0 },
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            ':hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 12px 36px rgba(0,0,0,0.1)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Box sx={{ bgcolor: card.color, borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1, opacity: 0.1 }}>
              {card.icon}
            </Box>
            <Typography variant="subtitle2" sx={{ color: card.color, fontWeight: 600, fontSize: 16 }}>{card.label}</Typography>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#222', mb: 1, fontSize: 28 }}>{card.value}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, ml: 1 }}>
            <TrendingUpIcon sx={{ fontSize: 22, color: card.color, verticalAlign: 'middle' }} />
            <Typography variant="body2" sx={{ color: card.color, fontWeight: 600, fontSize: 15 }}>{card.growth}</Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
