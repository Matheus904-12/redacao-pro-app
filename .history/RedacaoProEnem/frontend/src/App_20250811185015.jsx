import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import UploadArea from './components/UploadArea';
import RedacoesList from './components/RedacoesList';
import './App.css';

export default function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          RedaçãoProEnem
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
          Plataforma para avaliação de redações ENEM inspirada na Letrus
        </Typography>
        <UploadArea />
        <RedacoesList />
      </Box>
    </Container>
  );
}
