var ReverseMd5 = require('reverse-md5');
var md5 = require('md5');
var crypto = require('crypto')


const md5_encrypt = (val) => {
    //console.log('get', val)
    return md5(val)
}

const md5_decrypt = (val) => {
    var rev = crypto.createHash('md5').update('Santhosh').digest('hex')
    return rev
}

 
module.exports={
	md5_encrypt,
	md5_decrypt
}
