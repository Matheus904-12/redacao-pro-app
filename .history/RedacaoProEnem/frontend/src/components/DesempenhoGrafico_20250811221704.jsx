import React from 'react';
import { Paper, Typography, Box, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// Exemplo de alunos destaque
const destaques = [
  {
    nome: 'Ana Souza',
    nota: 980,
    titulo: 'A importância da educação no Brasil',
    iaDetectado: false,
    correcaoIa: true,
  },
  {
    nome: 'Lucas Silva',
    nota: 940,
    titulo: 'Desafios da inclusão social',
    iaDetectado: true,
    correcaoIa: true,
  },
  {
    nome: 'Mariana Lima',
    nota: 910,
    titulo: 'Violência urbana e juventude',
    iaDetectado: false,
    correcaoIa: false,
  },
];

export default function DesempenhoGrafico() {
  return (
    <Paper elevation={4} sx={{ p: 3, mb: 3, borderRadius: 2, background: 'linear-gradient(120deg, #e3f2fd 0%, #fff 100%)', boxShadow: '0 8px 32px rgba(25,118,210,0.12)' }}>
      <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: 700, fontSize: 22 }}>
        Destaques das Redações
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
        {destaques.map((aluno, idx) => (
          <Paper key={idx} elevation={1} sx={{ p: 2.5, borderRadius: 2, minWidth: 220, maxWidth: 260, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: '#6C63FF', width: 36, height: 36 }}>{aluno.nome[0]}</Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{aluno.nome}</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>{aluno.titulo}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#222', mt: 1 }}>{aluno.nota}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              {aluno.correcaoIa ? (
                <VerifiedUserIcon sx={{ color: '#43a047' }} />
              ) : (
                <CheckCircleIcon sx={{ color: '#FFD600' }} />
              )}
              {aluno.iaDetectado ? (
                <ErrorIcon sx={{ color: '#d32f2f' }} />
              ) : (
                <CheckCircleIcon sx={{ color: '#43a047' }} />
              )}
              <Typography variant="caption" sx={{ ml: 1 }}>
                {aluno.correcaoIa ? 'Correção IA' : 'Correção Humana'} / {aluno.iaDetectado ? 'Usou IA' : 'Sem IA'}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
}
