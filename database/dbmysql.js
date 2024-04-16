const mysql = require('mysql');
class MySql {
    constructor(){
        this.con = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'Company'
        });
        this.con.connect((err)=>{
            if(err){
                console.log('Error')
            }
            else{
                console.log('Connected to MysqlDB')
            }
        })
    }
    //insert
    async insert(query) {
        return new Promise((resole, reject) => {
            this.con.query(query, (error, result, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resole(result);
                }
            })
        })
    }

//read
    async read(query) {
        return new Promise((resole, reject) => {
            this.con.query(query,(error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resole(result);
                }
            })
        })
    }

//update
    async update(id,updatedUser,query) {
        return new Promise((resole, reject) => {
            this.con.query(query, [updatedUser,id],(error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resole(result);
                }
            })
        })
    }

//delete
    async delete(id,query) {
        return new Promise((resole, reject) => {
            this.con.query(query,[id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resole(result);
                }
            })
        })
    }

    
}
module.exports = MySql;


