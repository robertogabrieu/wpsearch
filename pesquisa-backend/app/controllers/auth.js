require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

function auth(req) {
  //esse teste abaixo deve ser feito no seu banco de dados
  if (req.body.email === "teste@teste.com" && req.body.password === "1234") {
    //auth ok
    const id = 1; //esse id viria do banco de dados
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: (3600000 * 48), // expires in 1hour
    });
    return { auth: true, token: token, message: "Login efetuado com sucesso!" };
  }

  return { error: true, message: "Login inválido!" };
}

module.exports = auth