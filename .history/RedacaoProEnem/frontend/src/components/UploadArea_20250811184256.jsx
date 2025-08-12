import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';

export default function UploadArea() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleFileChange(e) {
    const f = e.target.files[0];
    setFile(f);
    if (f && f.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  }

  function handleUpload() {
    // TODO: Enviar arquivo para backend
    alert('Upload simulado!');
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Envie sua redação (PDF, DOC, imagem)
      </Typography>
      <input
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        onChange={handleFileChange}
        style={{ marginBottom: 16 }}
      />
      {preview && (
        <Box sx={{ mb: 2 }}>
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200 }} />
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file}>
        Enviar
      </Button>
    </Paper>
  );
}
