import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import UploadArea from './components/UploadArea';
import RedacoesList from './components/RedacoesList';
import DesempenhoGrafico from './components/DesempenhoGrafico';
import CalendarioTarefas from './components/CalendarioTarefas';
import './App.css';

export default function App() {
  // Exemplo de dados para gráficos (pode ser integrado com backend depois)
  const competenciasExemplo = [
    { nome: 'Competência 1', nota: 180 },
    { nome: 'Competência 2', nota: 160 },
    { nome: 'Competência 3', nota: 200 },
    { nome: 'Competência 4', nota: 140 },
    { nome: 'Competência 5', nota: 180 },
  ];
  const notaTotalExemplo = 860;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1, transition: 'color 0.3s' }}>
          RedaçãoProEnem
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Plataforma moderna para avaliação de redações ENEM inspirada na Letrus
        </Typography>
        <CalendarioTarefas />
        <DesempenhoGrafico competencias={competenciasExemplo} notaTotal={notaTotalExemplo} />
        <UploadArea />
        <RedacoesList />
      </Box>
    </Container>
  );
}
