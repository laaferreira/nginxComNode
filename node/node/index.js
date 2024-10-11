const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connectionInsert = mysql.createConnection(config)

const insert = `INSERT INTO people(name) values('Usuario1');`
connectionInsert.query(insert)
connectionInsert.end()

app.get('/', (req, res) => {

    const connection = mysql.createConnection(config)
    const sql = `select * from  people;`

    connection.query(
        sql,
        function select(error, results, fields) {
            if(error) {
                console.log(error);
                connection.end();
                              
            }
            if(results.length > 0) {
                //console.log(results);
                results = JSON.stringify(results)
                res.send("<h1>Full Cycle Rocks!!</h1> </br></br>"+ results)
            } else {
                console.log('No data');
            }
            connection.end();
        });
})

app.listen(port, ()=> {
    console.log("Rodando" + port)
})