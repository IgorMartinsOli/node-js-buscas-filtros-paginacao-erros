import RequicisaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequicisaoIncorreta {
    constructor(error) {
        const mensagensErro = Object.values(error.errors)
            .map(error => error.message)
            .join("; ")
        super(`Os seguinte erros foram encontrados: ${mensagensErro}`);
    }
}

export default ErroValidacao;