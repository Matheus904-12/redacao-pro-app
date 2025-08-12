const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
const { Document, Packer } = require('docx');
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Redacao = require('./models/Redacao');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Upload endpoint

// Upload e arquivamento
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const nomeAluno = req.body.nomeAluno || 'Aluno';
  if (!file) return res.status(400).json({ error: 'Arquivo não enviado.' });

  let texto = '';
  try {
    if (file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdfParse(dataBuffer);
      texto = data.text;
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const dataBuffer = fs.readFileSync(file.path);
      const result = await mammoth.extractRawText({ buffer: dataBuffer });
      texto = result.value;
    } else if (file.mimetype.startsWith('image/')) {
      const result = await Tesseract.recognize(file.path, 'por');
      texto = result.data.text;
    } else {
      texto = 'Formato não suportado.';
    }
    const iaDetectado = /chatgpt|gpt|openai|escrevi com ia|inteligência artificial/i.test(texto);
    const competencias = [
      { nome: 'Competência 1', nota: Math.floor(Math.random() * 200), comentario: 'Demonstrou domínio da norma culta.' },
      { nome: 'Competência 2', nota: Math.floor(Math.random() * 200), comentario: 'Compreendeu a proposta.' },
      { nome: 'Competência 3', nota: Math.floor(Math.random() * 200), comentario: 'Selecionou, relacionou e organizou argumentos.' },
      { nome: 'Competência 4', nota: Math.floor(Math.random() * 200), comentario: 'Demonstrou conhecimento dos mecanismos linguísticos.' },
      { nome: 'Competência 5', nota: Math.floor(Math.random() * 200), comentario: 'Elaborou proposta de intervenção.' }
    ];
    // Arquivar no MongoDB
    const redacao = new Redacao({
      nomeAluno,
      texto,
      iaDetectado,
      competencias,
      arquivoOriginal: file.originalname,
    });
    await redacao.save();
    res.json({ texto, iaDetectado, competencias });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao processar arquivo.' });
  } finally {
    fs.unlinkSync(file.path);
  }
});

// Listar redações arquivadas
app.get('/redacoes', async (req, res) => {
  try {
    const lista = await Redacao.find().sort({ dataEnvio: -1 }).limit(100);
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar redações.' });
  }
});

app.get('/', (req, res) => {
  res.send('API RedaçãoProEnem rodando!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
