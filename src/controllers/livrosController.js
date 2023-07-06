import livros from "../models/Livro.js";

class LivroController {

	static listarLivros = async (req, res) => {
		try{
			const livrosResultados = await livros.find()
			.populate("autor")
			.exec();

			res.status(200).json(livrosResultados);
		}catch(error){
			res.status(500).json({
				message: "Erro interno no servidor",
				error: error.message,
				stack: error.stack
			});
		}
	};

	static listarLivroPorId = async (req, res) => {
		const id = req.params.id;

		!id ? res.status(400).json({ message: "Id não passado" }) : null;
		try{
			const livro = await livros.findById(id);

			res.status(200).send(JSON.stringify(livro));
		}catch(error){
			res.status(500).json({
				message: "Erro interno no servidor",
				error: error.message,
				stack: error.stack
			});
		}
	};

	static cadastrarLivro = async (req, res) => {
		let livro = new livros(req.body);

		!livro ? res.status(400).json({ message: "Livro não passado" }) : null;

		try{
			const livroSalvo = await livro.save();

			res.status(200).send(JSON.stringify(livroSalvo));
		}catch(error){
			res.status(500).json({
				message: "Erro interno no servidor",
				error: error.message,
				stack: error.stack
			});
		}

	};

	static atualizarLivro = (req, res) => {
		const id = req.params.id;

		!id || !req.body ? res.status(400).json({ message: "Id ou dados não passados" }) : null;

		try{
			const livroAtualizado = livros.findByIdAndUpdate(id, {$set: req.body});

			res.status(200).send(JSON.stringify(livroAtualizado));
		}catch(error){
			res.status(500).json({
				message: "Erro interno no servidor",
				error: error.message,
				stack: error.stack
			});
		}
	};

	static excluirLivro = (req, res) => {
		const id = req.params.id;

		!id ? res.status(400).json({ message: "Id não passado" }) : null;

		try {
			livros.findByIdAndDelete(id);

			res.status(200).send({message: "Livro excluido com sucesso"});
		} catch (error) {
			res.status(500).json({
				message: "Erro interno no servidor",
				error: error.message,
				stack: error.stack
			});
		}
	};

	static listarLivroPorEditora = (req, res) => {
		const editora = req.query.editora;

		!editora ? res.status(400).json({ message: "Editora não passado" }) : null;

		try{
			const livrosPorEditora = livros.find({"editora": editora});

			res.status(200).send(JSON.stringify(livrosPorEditora));
		}catch(error){
			res.status(500).json({
				message: "Erro interno no servidor",
				error: error.message,
				stack: error.stack
			});
		}
	};
}

export default LivroController;