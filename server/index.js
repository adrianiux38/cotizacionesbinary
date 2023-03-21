require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const PDFDocument = require('pdfkit');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



// Create connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// Connect
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('MySQL Connected...');
  }
});

// Get services
app.get('/getData', (req, res) => {
  let sql = 'SELECT * FROM servicios';
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(results));
    }
  });
});

// Create service
app.post('/createService', async (req, res) => {
    const { nombre, descripcion, precio, esquema } = req.body;
    let sql = `INSERT INTO servicios (nombre, descripcion, precio, esquema) VALUES ('${nombre}', '${descripcion}', '${precio}', '${esquema}')`;
    db.query(sql, (err, result) => {
        if (err) {
        console.log(err);
        } else {
        res.json({mensaje: "Datos enviados a BDD"});
        }
    });
    
    
});

// Create quotation
app.post('/createQuotation', (req, res) => {
    console.log(req.body["quotation"])
  //let sql = `INSERT INTO cotizaciones (cantidad, total) values ('${req.body["quotation"]["quantity"]}', '${req.body["quotation"]["totalPrice"]}')`;
  /*
  let query = db.query(sql,(err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Quotation created...');
    }
  });
  */
});

// Download PDF
app.get('/downloadPDF', (req, res) => {
  let sql = 'SELECT * FROM cotizaciones';
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      // Create PDF
      let doc = new PDFDocument();
      doc.pipe(fs.createWriteStream('quotation.pdf'));

      doc.fontSize(25).text('Quotation', {
        underline: true
      });

      doc.moveDown();

      doc.fontSize(15).text('Servicios:');
      doc.moveDown();
      let total = 0;
      for (let i = 0; i < results.length; i++) {
        total += results[i].precio * results[i].cantidad * results[i].meses;
        let servicio = results[i].nombre + ' (' + results[i].esquema + ')';
        doc.text(servicio);
        doc.text('Precio: $' + results[i].precio + ' x ' + results[i].cantidad + ' x ' + results[i].meses + ' = $' + (results[i].precio * results[i].cantidad * results[i].meses))
      }

      doc.moveDown();
      doc.fontSize(20).text('Total: $' + total);
      doc.end();

      // Send PDF
      res.download('quotation.pdf');
    }
  });
});

const port = 3001;

app.listen(port, () => {
  console.log('Server started on port ' + port);
});