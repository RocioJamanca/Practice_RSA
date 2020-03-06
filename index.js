'use strict';
let cryptoUtils = require('bigint-crypto-utils');
const privateKey = require('./privateKey');
const publicKey = require('./publicKey');

class RSA{

    privateKey;
    publicKey={};



    constructor() {

        //Two distinct prime numbers (Coprime)
        let p = this.generateRandomPrime();
        let q = this.generateRandomPrime();

        // n = p * q
        this.publicKey.n = p*q;
        this.privateKey.n= this.publicKey.n;

        //Vemos el resultado de p, q y n
        console.log("p: ",p," q: ",q);
        console.log("n = p * q" ,this.publicKey.n);

        //Calculate Totien function
        let phi = (p-BigInt(1))*(q-BigInt(1));
        console.log("phi = (p-1)*(q-1)" ,phi);

        //Coprime of Phi as "e"
        this.publicKey.e = BigInt(65537);

        //Let's check if it is a coprime
        if (this.publicKey.n%this.publicKey.e === (0))
        {
            console.log("La has liao pollito")
        }

        //Calculate d=e^(-1) mod phi(n)
        this.privateKey.d = cryptoUtils.modInv(this.publicKey.e,phi);


    }


    generateRandomPrime(){
        return cryptoUtils.primeSync(10,5);
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
