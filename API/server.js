import app from './app.js';

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});