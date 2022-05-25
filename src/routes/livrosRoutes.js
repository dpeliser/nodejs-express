import express from 'express';
import LivroController from '../controllers/livrosController.js';

const router = express.Router();

router
  .get('/livros', LivroController.listarLivros)
  .get('/livros/busca', LivroController.listarLivroPorEditora)
  .post('/livros', LivroController.cadastrarLivro)
  .get('/livros/:id', LivroController.listarLivroPorId)
  .put('/livros/:id', LivroController.atualizarLivro)
  .delete('/livros/:id', LivroController.excluirLivro);

  export default router;