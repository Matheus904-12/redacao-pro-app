// Serviço para integração com o backend
const API_URL = 'http://localhost:3001';

export async function uploadRedacao(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
}
