const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000
const connStr = "server=thanos-web.database.windows.net;user id=andrelivee;password=@andre123;Trusted_Connection=false;Encrypt=true;TrustServerCertificate=True;Database=Carros;Connection timeout=6000"
const sql = require("mssql");

//fazendo a conexão global
sql.connect(connStr)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err));

   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(bodyParser.json());


//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

function execSQLQuery(sqlQry, res){
    GLOBAL.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}

router.get('/carros', (req, res) =>{
    execSQLQuery('SELECT * FROM Cliente', res);
})

app.listen(port);
console.log('API funcionando!');