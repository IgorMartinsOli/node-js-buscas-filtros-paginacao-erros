import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";
import ErroValidacao from "../errors/ErroValidacao.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

function manipuladorDeErros (erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError) {
        new RequisicaoIncorreta().enviarResposta(res);
    } else if (erro instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(erro).enviarResposta(res);
    } else if(erro instanceof NaoEncontrado){
        erro.enviarResposta(res);
    }else{
        new ErroBase().enviarResposta(res);
    }
}

export default manipuladorDeErros;