'use strict';
let cryptoUtils = require('bigint-crypto-utils');
const privateKey = require('./privateKey');
const publicKey = require('./publicKey');

class RSA{

    privateKey;
    publicKey={};



    constructor() {
        this.publicKey.n = BigInt.max;


        //Two distinct prime numbers (Coprime)
        let p = this.generateRandomPrime();
        let q = this.generateRandomPrime();

        // n = p * q
        this.publicKey.n = cryptoUtils.modPow(p,q,this.publicKey.n)
        console.log(this.publicKey.n)

    }


    generateRandomPrime(){

        return cryptoUtils.primeSync(12,5);
    }
}

exports.privateKey = privateKey;
exports.publicKey = publicKey;
module.exports = RSA;

let rsa= new RSA();







// Clase public key
// e : big init
// n: big init
// encrypt (m:bigint) --> c: bingint = m^e mod e
// verify (s:bigint) --> m : bigint  = s^e mod n

//Funcion de libreria exponenciación modular Clave pública

//Clave privada

// d: beginti
// n: bigint
//  decrypt (c: bigint) -> m: begint
//  decrypt (c: begint) -> m: bigint =c^d
// sign (m:bigint) -> s: bigint =m^d mod n


//Método de generar claves

//generatekeys(bitLength)->private key
