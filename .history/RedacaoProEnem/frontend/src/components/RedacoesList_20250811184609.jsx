import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getRedacoes } from '../services/api';

export default function RedacoesList() {
  const [redacoes, setRedacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRedacoes() {
      setLoading(true);
      const lista = await getRedacoes();
      setRedacoes(lista);
      setLoading(false);
    }
    fetchRedacoes();
  }, []);

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>Redações Arquivadas</Typography>
      {loading ? <Typography>Carregando...</Typography> : (
        <List>
          {redacoes.map((r, idx) => (
            <React.Fragment key={r._id}>
              <ListItem alignItems="flex-start">
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
    </Paper>
  );
}
