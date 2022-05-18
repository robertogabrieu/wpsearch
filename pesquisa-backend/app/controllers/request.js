const Excel = require('../services/Excel');
const Url = require('../services/Url');
const RequestModel = require('../models/Request');

class Request{
  constructor(){
    this.db = new RequestModel().db;
    this.Url = new Url();
  }

  async makeRequest(req, res){
    let file = req.file.path;
    let prefix = JSON.parse(req.body.prefix);
    let sufix = JSON.parse(req.body.sufix);

    const rows = await new Excel().handleExcelFile(file);
    for(let x = 0; x < rows.length; x++){
      let url = rows[x][0]
      this.urlSanitized = this.Url.sanitizeUrl(url)

      for(let y = 0; y < prefix.length; y++){
        this.prefix = prefix[y].value

        for(let z = 0; z < sufix.length; z++){

          this.sufix = sufix[z].value
          this.url = this.prefix + this.urlSanitized + this.sufix;
          this.requestReturn = await this.Url.getdata(this.url)
          if(this.requestReturn.data) await this.handleMongoInsert();

        }

      }
    }
    return res.status(200).json({message: "O processo está sendo executado!"});
  }

  async handleMongoInsert(){
    await this.db.findOne({ 
      domain:   this.urlSanitized,
      prefix:   this.prefix,
      sufix:    this.sufix
    }).then(async (data) => {
      if(!data){
        await this.db({
          domain:   this.urlSanitized,
          prefix:   this.prefix,
          sufix:    this.sufix,
          status:   this.requestReturn.status,
          wp:       this.requestReturn.wp,
          return:   this.requestReturn.data
        }).save().then().catch((err) => {
          console.log(err);
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  async listRequest(req, res){
    await this.db.find({}).exec().then((data) => {
      return res.status(200).json(data);
    }).catch((err) => {
      console.log(err);
    });
  }
}

module.exports = Request