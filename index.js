//body-parser": "^1.20.2", lê um json
// "express": "^4.19.2", pra fazer as rotas*
//"msnodesqlv8": "^4.2.1", conecta com o banco de dados
//"nodemon": "^3.1.1"  restarta o servidor


import bodyParser from "body-parser"; //importa  módulo bodyParser para processar as requisições
import sql from "msnodesqlv8"; //importa o módulo msnodesqlv8 para conectar ao banco de dados SQL Server
import express from "express"; //importa o módulo express para criar o servidor (express é o servidor)


const app = express(); //cria uma instância do app express
app.use (bodyParser.json()); //configura o aplicativo para usar o bodyparser na análise de Json       

const PORT = 3000;

//define a string de conexão para o banco de dados 
const connectionString = "server=DSN1191109157;Database=CARROS;Trusted_Connection=Yes;Driver={Sql Server Native Client 11.0}"; 

//leitura
app.get("/carros", (req, resp) =>{ //defina uma rota GET para ler todos os registros da tabela "carros"
    sql.query(connectionString, "SELECT * FROM CARS", (erro, rows) =>{// executa a consulta SQL para selecionar os registros da tabela "carros"
        if(erro){ //se houver um erro, retornar um erro, retornar um status 500 e a mensagem  de erro
            resp.status(500).json("Internal Server Erro!");
        }else{
            resp.status(200).json(rows);
        }
    });
});

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));  //inicia o servidor na porta definida e importe uma mensagem no console

app.get("/carros/:id", (req, res) => { //definir a rota GET para ler um único registro da tabela "carros" com ID específica
    const{id} = req.params; //extrair um ID dos parãmetros da URl
    sql.query(connectionString, `SELECT * FROM carros WHERE id = ${id}`, (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(200).json(rows);
        }
    });
});

app.put("/carros/:id", (req, res) => {
    const{id} = req.params;
    const{modelo, marca} = req.body;
    sql.query(connectionString, `UPDATE carros SET modelo = '${modelo}', marca = '${marca}' WHERE id = ${id}`, (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(201).json("Atualizado com sucesso!");
        }
    });
});

app.delete("/carros/:id", (req, res) => {
    const{id} = req.params;
    sql.query(connectionString, `DELETE FROM carros WHERE id = ${id}`, (erro, rows) => {
        if (erro) {
            res.status(500).json("Erro Interno de Servidor");
        } else {
            res.status(201).json("Deletado com sucesso!");
        }
    });
});