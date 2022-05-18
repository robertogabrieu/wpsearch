const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');

class Excel{

    async handleExcelFile(file){
        return new Promise((resolve, reject) => {
            // Readable Stream.
            readXlsxFile( fs.createReadStream( file ) ).then( ( rows ) => {
                // `rows` is an array of rows
                // each row being an array of cells.
                resolve(rows)
            } );
        });
    }
}

module.exports = Excel;