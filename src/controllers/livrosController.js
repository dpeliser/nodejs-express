import livros from '../models/Livro.js';

export default class LivroController {

  static listarLivros = (req, res) => {
    livros.find()
      .populate('autor')
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  }

  static listarLivroPorId = (req, res) => {
    const { id } = req.params;
    livros.findById(id)
      .populate('autor', 'nome')
      .exec((err, livro) => {
        if (err) {
          res.status(400).send({ message: `Id do livro não localizado: ${err.message}` });
        } else {
          res.status(200).send(livro);
        }
    });
  }

  static cadastrarLivro = (req, res) => {
    const livro = new livros(req.body);

    livro.save(err => {
      if (err) {
        res.status(500).send({ message: `Falha ao cadastrar livro: ${err.message}`});
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  };

  static atualizarLivro = (req, res) => {
    const { id } = req.params;

    livros.findByIdAndUpdate(id, { $set: req.body }, err => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).send({ message: 'Livro atualizado com sucesso' });
      }
    });
  };

  static excluirLivro = (req, res) => {
    const { id } = req.params;
    livros.findByIdAndDelete(id, err => {
      if (err) {
        res.status(500).send({ message: `Erro ao excluir livro: ${err.message}` });
      } else {
        res.status(200).send({ message: 'Livro excluído com sucesso' });
      }
    });
  };

  static listarLivroPorEditora = (req, res) => {
    const { editora } = req.query;
    livros.find({ 'editora': editora }, {}, (err, livros) => {
      res.status(200).send(livros);
    });
  }

}