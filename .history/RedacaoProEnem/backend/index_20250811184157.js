const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
const { Document } = require('docx');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'Arquivo não enviado.' });

  let texto = '';
  try {
    if (file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdfParse(dataBuffer);
      texto = data.text;
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // DOCX
      texto = 'Texto extraído do DOCX (simulado)';
      // TODO: Implementar extração real
    } else if (file.mimetype.startsWith('image/')) {
      const result = await Tesseract.recognize(file.path, 'por');
      texto = result.data.text;
    } else {
      texto = 'Formato não suportado.';
    }
    // TODO: Detectar uso de IA e avaliar competências
    res.json({ texto, iaDetectado: false, competencias: [] });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao processar arquivo.' });
  } finally {
    fs.unlinkSync(file.path);
  }
});

app.get('/', (req, res) => {
  res.send('API RedaçãoProEnem rodando!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
