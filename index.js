'use strict';
let cryptoUtils = require('bigint-crypto-utils');

class RSA{
    privateKey = {};
    publicKey = {};

    constructor() {
        //Two distinct prime numbers (Coprime)
        let p = this.generateRandomPrime();
        let q = this.generateRandomPrime();

        // n = p * q
        this.publicKey.n = p * q;
        this.privateKey.n= this.publicKey.n;

        //Vemos el resultado de p, q y n
        console.log("p: ", p, " q: ", q);
        console.log("n = p * q", this.publicKey.n);

        //Calculate Totien function
        let phi = (p-BigInt(1))*(q-BigInt(1));
        console.log("phi = (p-1)*(q-1)" ,phi);

        //"e" has to be coprime with phi
        this.publicKey.e = BigInt(65537);

        //Let's check if it is a coprime
        if (this.publicKey.n % this.publicKey.e === (0)) {
            console.log("La has liao pollito")
            //TODO: Make sure that if e and phi are not coprime to start again with p and q
        }

        //Calculate d=e^(-1) mod phi(n)
        this.privateKey.d = cryptoUtils.modInv(this.publicKey.e, phi);
        console.log('d: ', this.privateKey.d);
    }


    generateRandomPrime(){
        return cryptoUtils.primeSync(100,5);
    }

    decrypt(cypher){
        this.checkLessThanN(cypher);
        //c^d mod n
        let message = cryptoUtils.modPow(cypher, this.privateKey.d, this.publicKey.n);
        return message;
    }

    sign(message){
        this.checkLessThanN(message);
        //m^d mod n
        let signature = cryptoUtils.modPow(message, this.privateKey.d, this.publicKey.n);
        return signature;
    }

    encrypt(message){
        this.checkLessThanN(message);
        //m^e mod n
        let cypher = cryptoUtils.modPow(message, this.publicKey.e, this.publicKey.n);
        return cypher;
    }

    verify(signature){
        this.checkLessThanN(signature);
        // s^e mod n
        let message = cryptoUtils.modPow(signature, this.publicKey.e, this.publicKey.n);
        return message;
    }

    checkLessThanN(number){
        if(number > this.publicKey.n){
            console.log('La has liao pollito');
        }
    }
}
module.exports = RSA;

let rsa = new RSA();
let encrypted = rsa.encrypt(BigInt(123456789));
console.log('Encrypted: ', encrypted);
let message = rsa.decrypt(encrypted);
console.log('Message: ', message);
//The decrypted message is the same ad the original

let signature = rsa.sign(BigInt(1234567890));
console.log('Signature: ', signature);
let verification = rsa.verify(signature);
console.log('Verification: ', verification);
//The verification is the same as the message signed


//Método de generar claves

//generatekeys(bitLength)->private key
