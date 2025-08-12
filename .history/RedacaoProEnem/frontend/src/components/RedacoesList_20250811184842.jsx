
import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, TextField } from '@mui/material';
import { Button, Box } from '@mui/material';

import { getRedacoes } from '../services/api';
import { exportRedacoesCsv } from '../utils/exportCsv';
import { exportRedacoesPdf } from '../utils/exportPdf';
import RedacaoDetalhe from './RedacaoDetalhe';

export default function RedacoesList() {
  const [redacoes, setRedacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [selecionada, setSelecionada] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchRedacoes() {
      setLoading(true);
      const lista = await getRedacoes();
      setRedacoes(lista);
      setLoading(false);
    }
    fetchRedacoes();
  }, []);

  const filtradas = redacoes.filter(r => r.nomeAluno.toLowerCase().includes(busca.toLowerCase()));

  function handleOpenDetalhe(redacao) {
    setSelecionada(redacao);
    setModalOpen(true);
  }
  function handleCloseDetalhe() {
    setModalOpen(false);
    setSelecionada(null);
  }


  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>Redações Arquivadas</Typography>
      <TextField
        label="Buscar por nome do aluno"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => exportRedacoesCsv(filtradas)}
          disabled={filtradas.length === 0}
        >
          Exportar CSV
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => exportRedacoesPdf(filtradas)}
          disabled={filtradas.length === 0}
        >
          Exportar PDF
        </Button>
      </Box>
      {loading ? <Typography>Carregando...</Typography> : (
        <List>
          {filtradas.map((r, idx) => (
            <React.Fragment key={r._id}>
              <ListItem alignItems="flex-start" button onClick={() => handleOpenDetalhe(r)}>
                <ListItemText
                  primary={r.nomeAluno}
                  secondary={
                    <>
                      <Typography variant="body2" color={r.iaDetectado ? 'error' : 'success.main'}>
                        {r.iaDetectado ? 'IA detectada' : 'Sem IA'}
                      </Typography>
                      <Typography variant="body2">Arquivo: {r.arquivoOriginal}</Typography>
                      <Typography variant="body2">Enviado: {new Date(r.dataEnvio).toLocaleString()}</Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>Trecho: {r.texto.slice(0, 120)}...</Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
      <RedacaoDetalhe open={modalOpen} onClose={handleCloseDetalhe} redacao={selecionada} />
    </Paper>
  );
}
