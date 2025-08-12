import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import UploadArea from './components/UploadArea';
import RedacoesList from './components/RedacoesList';
import DesempenhoGrafico from './components/DesempenhoGrafico';
import CalendarioTarefas from './components/CalendarioTarefas';
import DashboardCards from './components/DashboardCards';
import DashboardBarChart from './components/DashboardBarChart';
import Navbar from './components/Navbar';
import './App.css';

export default function App() {
  // Exemplo de dados para dashboard (depois integrar com backend)
  const totalAlunos = 120;
  const totalEntregues = 80;
  const totalNaoEntregues = 30;
  const totalAnalisadas = 60;
  const competenciasExemplo = [
    { nome: 'Competência 1', nota: 180 },
    { nome: 'Competência 2', nota: 160 },
    { nome: 'Competência 3', nota: 200 },
    { nome: 'Competência 4', nota: 140 },
    { nome: 'Competência 5', nota: 180 },
  ];
  const notaTotalExemplo = 860;

  return (
    <>
      <Navbar />
      <Box sx={{ pt: { xs: 9, sm: 10 }, background: 'linear-gradient(120deg, #e3eaf6 0%, #f7f9fb 100%)', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <DashboardCards
              totalAlunos={totalAlunos}
              totalEntregues={totalEntregues}
              totalNaoEntregues={totalNaoEntregues}
              totalAnalisadas={totalAnalisadas}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
              <Box sx={{ flex: 2, minWidth: 340 }}>
                <DesempenhoGrafico competencias={competenciasExemplo} notaTotal={notaTotalExemplo} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 340, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <DashboardBarChart />
                <CalendarioTarefas />
              </Box>
            </Box>
            <UploadArea />
            <RedacoesList />
          </Box>
        </Container>
      </Box>
    </>
  );
}
