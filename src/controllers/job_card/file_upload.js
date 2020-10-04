const fs = require('fs');
const pool = require('../../config/db.js')
const csv = require('fast-csv');
const app = require('../../routers/routers.js')
const multer = require('multer');

 
global.__basedir = __dirname;
 
//  Multer Upload Storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	   cb(null, __basedir)
	},
	filename: (req, file, cb) => {
	   cb(null, file.originalname)
	}
});
 
const upload = multer({storage: storage});



// -> Import CSV File to MySQL database
function importCsvData2MySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = []
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            // console.log(data)
            csvData.push(data);
            
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
                    for(i=0;i<csvData.length;i++)
                        {
                            pool.query('insert into public.tb_m_jobcard (plant_code,order_number,part_number,customer_code,customer_name,issued_qty,per_day_qty) values ($1,$2,$3,$4,$5,$6,$7) on conflict(plant_code,order_number) do update set part_number = excluded.part_number,customer_code = excluded.customer_code,customer_name=excluded.customer_name',csvData[i])                                                           
                        }
            
			fs.unlinkSync(filePath)
        });
     stream.pipe(csvStream);
}

module.exports = {importCsvData2MySQL,storage,upload};
