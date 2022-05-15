const https = require('https');
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');

// wrap node's https.get stream call as a promise
// note: assumes utf-8 encoded data payload to get.
async function getdata(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      res.setEncoding('utf8');
      let data = '';
      res.on('data', (chunk) => {
        data = data + chunk;
      });
      res.on('end', () => {
        if(data.indexOf('/wp-admin/') !== -1)
          resolve(true);
        else
          resolve(false);
      })
    }).on('error', (e) => {
      reject(false);
    });
  });
}

async function handleExcelFile(file){
  // Readable Stream.
  await readXlsxFile( fs.createReadStream( file ) ).then( async ( rows ) => {
    // `rows` is an array of rows
    // each row being an array of cells.
    console.log(typeof rows)
    console.log(rows.length)
    for(i = 0; i < rows.length; i++){
      url = rows[i][0]
      data = await getdata(url)
      if(data){
        console.log('É feito em wp! '+url)
      }else{
        console.log('Não é feito em wp :( '+url)
      }
    }
  } );
}

module.exports = {
  handleExcelFile
}