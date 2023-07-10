import NaoEncontrado from "../errors/NaoEncontrado.js";
import autores from "../models/Autor.js";

class AutorController {

	static listarAutores = async (req, res) => {
		try{
			const autoresResultado = await autores.find();

			res.status(200).json(autoresResultado);
		}catch(error){
			next(error);
		}
	};

	static listarAutorPorId = async (req, res, next) => {
		const id = req.params.id;

		!id ? res.status(400).json({ message: "Id não passado" }) : null;
		try {
			const autor = await autores.findById(id);
		
			if (autor) {
			return res.status(200).send(JSON.stringify(autor));
			}
		
			next(new NaoEncontrado("Autor não encontrado"));
		} catch (error) {
			next(error)
		}
	};

	static cadastrarAutor = async (req, res, next) => {
		let autor = new autores(req.body);

		!autor ? next(new NaoEncontrado("Autor não encontrado")) : null;

		try{
			const autorSalvo = await autor.save();

			res.status(200).send(JSON.stringify(autorSalvo));
		}catch(error){
			next(error);
		}
	};

	static atualizarAutor = (req, res, next) => {
		const id = req.params.id;

		try{
			const autorAtualizado = autores.findByIdAndUpdate(id, {$set: req.body});

			!autorAtualizado ? next(new NaoEncontrado("Autor não encontrado")) : null;

			res.status(200).send(JSON.stringify(autorAtualizado));
		}catch(error){
			next(error);
		}
	};

	static excluirAutor = (req, res, next) => {
		const id = req.params.id;

		!id ? res.status(400).json({ message: "Id não passado" }) : null;

		try {
			const autorDeletado = autores.deleteOne(id);

			!autorDeletado ? next(new NaoEncontrado("Autor não encontrado")) : null;

			res.status(200).send({message: "Autor excluido com sucesso"});
		} catch (error) {
			next(error)
		}
	};
}

export default AutorController;