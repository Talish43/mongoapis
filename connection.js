var mysql      = require('mysql');
var connection = mysql.createConnection({
  port: 3306,
  host     : 'localhost',
  user     : 'id19035300_talishjam',
  password : 'uE>qLwlbG9M~-lL%',
  database : 'id19035300_myfirstdb'
});
 
connection.connect((err) => {
    if (!err) {
        console.log('Connected');
    }
    else{
        console.log(err);
    }
})


module.exports = connection;