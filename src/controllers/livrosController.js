import livros from "../models/Livro.js";

class LivroController {

	static listarLivros = async (req, res, next) => {
		try{
			const livrosResultados = await livros.find()
			.populate("autor")
			.exec();

			res.status(200).json(livrosResultados);
		}catch(error){
			next(error);
		}
	};

	static listarLivroPorId = async (req, res, next) => {
		const id = req.params.id;

		!id ? res.status(400).json({ message: "Id não passado" }) : null;
		try{
			const livro = await livros.findById(id);

			res.status(200).send(JSON.stringify(livro));
		}catch(error){
			next(error);
		}
	};

	static cadastrarLivro = async (req, res, next) => {
		let livro = new livros(req.body);

		!livro ? res.status(400).json({ message: "Livro não passado" }) : null;

		try{
			const livroSalvo = await livro.save();

			res.status(200).send(JSON.stringify(livroSalvo));
		}catch(error){
			next(error);
		}

	};

	static atualizarLivro = (req, res) => {
		const id = req.params.id;

		!id || !req.body ? res.status(400).json({ message: "Id ou dados não passados" }) : null;

		try{
			const livroAtualizado = livros.findByIdAndUpdate(id, {$set: req.body});

			res.status(200).send(JSON.stringify(livroAtualizado));
		}catch(error){
			next(error);
		}
	};

	static excluirLivro = (req, res, next) => {
		const id = req.params.id;

		!id ? res.status(400).json({ message: "Id não passado" }) : null;

		try {
			livros.findByIdAndDelete(id);

			res.status(200).send({message: "Livro excluido com sucesso"});
		} catch (error) {
			next(error)
		}
	};

	static listarLivroPorEditora = (req, res, next) => {
		const editora = req.query.editora;

		!editora ? res.status(400).json({ message: "Editora não passado" }) : null;

		try{
			const livrosPorEditora = livros.find({"editora": editora});

			res.status(200).send(JSON.stringify(livrosPorEditora));
		}catch(error){
			next(error)
		}
	};
}

export default LivroController;