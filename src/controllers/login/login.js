const con = require('../../config/db.js');
const common = require('../../config/jwtTokenConfig');
const middleware = require('../../middleware/md5_E_D');
const jwt = require('jsonwebtoken');


//Post Method
const auth = (request, response) => {
	var username = request.body.username;
	var password = request.body.password;
	var msg='';
	// console.log(username);
	// console.log(password);
	response.setHeader("Content-Type", "text/html")

	//Encrypted Data
	var encryptPass= middleware.md5_encrypt(password);
	
	//JWT Token 
	const user = {
		"username": username,
		"password": password
	}
	const accessToken = jwt.sign(user,common.accessTokenSecret,{ expiresIn: common.tokenLife});


	if (username && password) {
		con.query('SELECT * FROM user WHERE last_name = ? AND password = ?', [username, encryptPass], function(error, results, fields) {
			if (results.length > 0) {
				// request.session.loggedin = true;
				// request.session.username = username;
				
				msg="Success"
				jsonData = {msg:msg,accessToken:accessToken}
				response.json(jsonData);
				console.log(jsonData)
			} else {
				msg="Incorrect Username and/or Password!"
				jsonData = {msg:msg}
				response.json(jsonData);
				console.log(jsonData)
			}			
			response.end();
		});
	} else {
		msg="Please enter Username and Password!"
		jsonData = {msg:msg}
		response.json(jsonData);
		console.log(jsonData)
		response.end();
	}
}

//Get Method
const home = (request, response) => {
	//console.log('response :',response.req.headers)

	// if (request.session.loggedin) {
	// 	response.send('Welcome back, ' + request.session.username + '!');
	// } else {
	// 	response.send('Please login to view this page!');
	// }
	response.send('Welcome back, ' + response.req.user.username + '!');
	response.end();
}

//Get Method
const logout = (request, response) => {
	
	//console.log(response);
	jwt.destroy(accessToken)
	response.status(200).send({ auth: false, accessToken: null });
}

module.exports={
	auth,
	home,
	logout
}
