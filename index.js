'use strict';
let cryptoUtils = require('bigint-crypto-utils');
const privateKey = require('./privateKey');
const publicKey = require('./publicKey');

class RSA{

    generateRandomKey(){
        let publicKey;
        let privateKey;
        cryptoUtils.prime(5, 3).then(prime => {
            console.log(prime);
        });
    }
}

exports.privateKey = privateKey;
exports.publicKey = publicKey;
module.exports = RSA;


// Clase public key
// e : big init
// n: big init
// encrypt (m:bigint) --> c: bingint = m^e mod e
// verify (s:bigint) --> m : bigint  = s^e mod n

//Funcion de libreria exponenciación modular Clave pública

//Clave privada

// d: begint
// // n: bigint
// // // decrypt (c: bigint) -> m: begint
// // decrypt (c: begint) -> m: bigint =c^d
// sign (m:bigint) -> s: bigint =m^d mod n

