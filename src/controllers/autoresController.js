import autores from '../models/Autor.js';

export default class AutorController {

  static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  }

  static listarAutorPorId = (req, res) => {
    const { id } = req.params;
    autores.findById(id, (err, autor) => {
      if (err) {
        res.status(400).send({ message: `Id do autor não localizado: ${err.message}` });
      } else {
        res.status(200).send(autor);
      }
    });
  }

  static cadastrarAutor = (req, res) => {
    const autor = new autores(req.body);

    autor.save(err => {
      if (err) {
        res.status(500).send({ message: `Falha ao cadastrar autor: ${err.message}`});
      } else {
        res.status(201).send(autor.toJSON());
      }
    });
  };

  static atualizarAutor = (req, res) => {
    const { id } = req.params;

    autores.findByIdAndUpdate(id, { $set: req.body }, err => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).send({ message: 'Autor atualizado com sucesso' });
      }
    });
  };

  static excluirAutor = (req, res) => {
    const { id } = req.params;
    autores.findByIdAndDelete(id, err => {
      if (err) {
        res.status(500).send({ message: `Erro ao excluir autor: ${err.message}` });
      } else {
        res.status(200).send({ message: 'Autor excluído com sucesso' });
      }
    });
  };

}