import ErroBase from "./ErroBase.js";

class RequicisaoIncorreta extends ErroBase {
    constructor(message = "Um ou mais dados fornecidos estão incorretos") {
        super(message, 400);
    }
}

export default RequicisaoIncorreta;