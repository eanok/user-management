
//Connection Pool
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

});

//routs controller
exports.view = (req, res) => {
    //connect DB
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID' + connection.threadId);


        //user table connection
        connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
            //when done with the connection release it
            connection.release();

            if (!err) {
                let removedUser = req.query.removed;
                res.render('home', { rows, removedUser });
                // res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });

}






//search names

exports.find = (req, res) => {
    //connect DB
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID' + connection.threadId);

        let searchTerm = req.body.search;

        //user table connection
        connection.query('SELECT * FROM user WHERE first_name LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {
            //when done with the connection release it
            connection.release();

            if (!err) {
                res.render('home', { rows });
            } else {

                console.log(err);
            }
            console.log('the data : \n', rows);
        });
    });
}



//add user page
exports.addUser = (req, res) => {
    res.render('add-user');
}


//add user page
exports.createUser = (req, res) => {
    const { first_name, last_name, phone, email, comment } = req.body
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID' + connection.threadId);

        let searchTerm = req.body.search;

        //user table connection
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, phone = ?, email =?, comment =?', [first_name, last_name, phone, email, comment], (err, rows) => {
            //when done with the connection release it
            connection.release();

            if (!err) {
                res.render('add-user', { alert: 'User Added Successfully' });
            } else {

                console.log(err);
            }
            console.log('the data : \n', rows);
        });
    });
}


//edit user page render
exports.editUser = (req, res) => {
    //connect DB
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID' + connection.threadId);


        //user table connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with the connection release it
            connection.release();

            if (!err) {
                res.render('edit-user', { rows });
            } else {

                console.log(err);
            }
            console.log('the data : \n', rows);
        });
    });

}



//edit user page render
exports.updateUser = (req, res) => {
    const { first_name, last_name, email, phone, comment } = req.body;
    //connect DB
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID' + connection.threadId);


        //user table connection
        connection.query('UPDATE user SET first_name = ?, last_name = ?, phone = ?, email = ?, comment = ? WHERE id = ?', [first_name, last_name, phone, email, comment, req.params.id], (err, rows) => {
            //when done with the connection release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('connected as ID' + connection.threadId);


                    //user table connection
                    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
                        //when done with the connection release it
                        connection.release();

                        if (!err) {
                            res.render('edit-user', { rows, alert: `User Details Successfully updated.` });
                        } else {

                            console.log(err);
                        }
                        console.log('the data : \n', rows);
                    });
                });

            } else {

                console.log(err);
            }
            // console.log('the data : \n', rows);
        });
    });
}




//delete user 
exports.delete = (req, res) => {
    //connect DB
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID' + connection.threadId);


        //user table connection
        connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with the connection release it
            connection.release();

            if (!err) {
                let removedUser = encodeURIComponent('User successfully removed.');
                res.redirect('/?removed=' + removedUser);
                // res.redirect('/');

                // res.redirect('/')
            } else {
                console.log(err);
            }
            console.log('the data : \n', rows);
        });
    });

}







// View Users
exports.viewall = (req, res) => {

    // User the connection
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('view-user', { rows });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);
    });

}




//delete user 
exports.viewall = (req, res) => {
    //connect DB
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('connected as ID' + connection.threadId);


        //user table connection
        // User the connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            if (!err) {
                res.render('view-user', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });

}