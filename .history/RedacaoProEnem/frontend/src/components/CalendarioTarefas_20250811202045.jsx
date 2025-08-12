import React, { useState } from 'react';
import { Paper, Typography, Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function CalendarioTarefas() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState({ title: '', date: '' });

  function handleDateClick(info) {
    setNovaTarefa({ title: '', date: info.dateStr });
    setOpen(true);
  }

  function handleAddTarefa() {
    setEvents([...events, { ...novaTarefa }]);
    setOpen(false);
  }

  return (
    <Paper elevation={4} sx={{ p: 3, mb: 3, borderRadius: 4, background: 'linear-gradient(120deg, #fffde7 0%, #fff 100%)', boxShadow: '0 8px 32px rgba(255,193,7,0.12)' }}>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>Calendário de Aplicação de Redações</Typography>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        height={400}
        headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Adicionar Tarefa</DialogTitle>
        <DialogContent>
          <TextField
            label="Título da Redação/Tarefa"
            fullWidth
            sx={{ mb: 2 }}
            value={novaTarefa.title}
            onChange={e => setNovaTarefa({ ...novaTarefa, title: e.target.value })}
          />
          <TextField
            label="Data"
            fullWidth
            value={novaTarefa.date}
            disabled
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleAddTarefa} disabled={!novaTarefa.title}>
            Adicionar
          </Button>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
