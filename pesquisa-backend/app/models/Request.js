const Model = require("./Model");
const mongoose = require('mongoose');

class Request extends Model{
    constructor(){
        super()
        const RequestSchema = mongoose.Schema({
            domain:     { type: String, require: true },
            prefix:     { type: String },
            sufix:      { type: String },
            status:     { type: Number, require: true },
            return:     { type: String, require: true },
            wp:         { type: Boolean, require: true },
            date:       { type: Date, default: Date.now }
        });
        mongoose.model('Request', RequestSchema);

        this.db = mongoose.model('Request');
    }
}

module.exports = Request;