const mongoose = require('mongoose');

const mongoUrl = `mongodb://${process.env.MONGO_URL}/wpfinder`;

class Model {
    constructor(){
        console.log(mongoUrl);
        mongoose.Promise = global.Promise;
        mongoose.connect(mongoUrl).then(() => {
            console.log(`MongoDB conectado.`);
        }).catch((err) => {
            console.log(`Erro ao conectar no banco de dados: ${err}`);
            return `Erro ao conectar no banco de dados.`;
        });
    } 
}

module.exports = Model;