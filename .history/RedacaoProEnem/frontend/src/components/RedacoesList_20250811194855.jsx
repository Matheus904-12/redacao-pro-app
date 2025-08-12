
import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, TextField, Button, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ptBR from 'date-fns/locale/pt-BR';

import { getRedacoes } from '../services/api';
import { exportRedacoesCsv } from '../utils/exportCsv';
import { exportRedacoesPdf } from '../utils/exportPdf';
import RedacaoDetalhe from './RedacaoDetalhe';

export default function RedacoesList() {
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [filtroIa, setFiltroIa] = useState('todos');
  const [filtroComp, setFiltroComp] = useState('');
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

  const filtradas = redacoes.filter(r => {
    const nomeMatch = r.nomeAluno.toLowerCase().includes(busca.toLowerCase());
    const dataMatch = (!dataInicio || new Date(r.dataEnvio) >= dataInicio) && (!dataFim || new Date(r.dataEnvio) <= dataFim);
    const iaMatch = filtroIa === 'todos' || (filtroIa === 'sim' && r.iaDetectado) || (filtroIa === 'nao' && !r.iaDetectado);
    const compMatch = !filtroComp || r.competencias.some(c => c.nome.toLowerCase().includes(filtroComp.toLowerCase()));
    return nomeMatch && dataMatch && iaMatch && compMatch;
  });
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
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <DatePicker
            label="Data início"
            value={dataInicio}
            onChange={setDataInicio}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
          <DatePicker
            label="Data fim"
            value={dataFim}
            onChange={setDataFim}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
          <TextField
            label="IA detectada"
            select
            size="small"
            value={filtroIa}
            onChange={e => setFiltroIa(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value="todos">Todos</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </TextField>
          <TextField
            label="Competência"
            variant="outlined"
            size="small"
            value={filtroComp}
            onChange={e => setFiltroComp(e.target.value)}
          />
        </Box>
      </LocalizationProvider>
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
