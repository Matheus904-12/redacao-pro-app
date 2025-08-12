
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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
          elevation={0}
          sx={{
            minWidth: 220,
            maxWidth: 260,
            flex: '1 1 220px',
            p: 3,
            borderRadius: 5,
            bgcolor: '#fff',
            boxShadow: '0 4px 24px rgba(108,99,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            position: 'relative',
            mb: { xs: 2, md: 0 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Box sx={{ bgcolor: card.color, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(108,99,255,0.10)' }}>
              {card.icon}
            </Box>
            <Typography variant="h6" sx={{ color: card.color, fontWeight: 600 }}>{card.label}</Typography>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#222', mb: 1 }}>{card.value}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'absolute', bottom: 18, right: 18 }}>
            <TrendingUpIcon sx={{ fontSize: 18, color: card.color }} />
            <Typography variant="body2" sx={{ color: card.color, fontWeight: 500 }}>{card.growth}</Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
