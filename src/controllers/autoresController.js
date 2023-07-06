import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {

	static listarAutores = async (req, res) => {
		try{
			const autoresResultado = await autores.find();

			res.status(200).json(autoresResultado);
		}catch(error){
			res.status(500).json({
				message: "Erro interno no servidor",
				error: error.message,
				stack: error.stack
			});
		}
	};

	static listarAutorPorId = async (req, res) => {
		const id = req.params.id;

		!id ? res.status(400).json({ message: "Id não passado" }) : null;
		try{
			const autor = await autores.findById(id);

			if(autor){
				res.status(200).send(JSON.stringify(autor));
			}
			
			res.status(404).json({message: "Autor não encontrado"});
		}catch(error){
			if(error instanceof mongoose.Error.CastError){
				res.status(400).send({
					message: "Id fornecidos está incorreto!"
				});
			}
			res.status(500).send({
				message: "Erro interno no servidor",
				error: error.message,
				stack: error.stack
			});
			
		}
	};

	static cadastrarAutor = async (req, res) => {
		let autor = new autores(req.body);

		!autor ? res.status(400).json({ message: "Autor não passado" }) : null;

		try{
			const autorSalvo = await autor.save();

			res.status(200).send(JSON.stringify(autorSalvo));
		}catch(error){
			res.status(500).json({
				message: "Erro interno no servidor",
				error: error.message,
				stack: error.stack
			});
		}
	};

	static atualizarAutor = (req, res) => {
		const id = req.params.id;

		!id || !req.body ? res.status(400).json({ message: "Id ou dados não passados" }) : null;

		try{
			const autorAtualizado = autores.findByIdAndUpdate(id, {$set: req.body});

			res.status(200).send(JSON.stringify(autorAtualizado));
		}catch(error){
			res.status(500).json({
				message: "Erro interno no servidor",
				error: error.message,
				stack: error.stack
			});
		}
	};

	static excluirAutor = (req, res) => {
		const id = req.params.id;

		!id ? res.status(400).json({ message: "Id não passado" }) : null;

		try {
			autores.deleteOne(id);

			res.status(200).send({message: "Autor excluido com sucesso"});
		} catch (error) {
			res.status(500).json({
				message: "Erro interno no servidor",
				error: error.message,
				stack: error.stack
			});
		}
	};
}

export default AutorController;