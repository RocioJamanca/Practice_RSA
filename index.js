'use strict';
let cryptoUtils = require('bigint-crypto-utils');

class my_rsa{

    constructor() {
        this.publicKey = {};
        this.privateKey = {};

        //Two distinct prime numbers (Coprime)
        let p = this.generateRandomPrime();
        let q = this.generateRandomPrime();

        // n = p * q
        this.publicKey.n = p * q;
        this.privateKey.n= this.publicKey.n;

        //Vemos el resultado de p, q y n
        // console.log("p: ", p, " q: ", q);
        // console.log("n = p * q", this.publicKey.n);

        //Calculate Totien function
        let phi = (p-BigInt(1))*(q-BigInt(1));
        // console.log("phi = (p-1)*(q-1)" ,phi);

        //"e" has to be coprime with phi
        this.publicKey.e = BigInt(65537);

        //Let's check if it is a coprime
        if (this.publicKey.n % this.publicKey.e === (0)) {
            console.log("La has liao pollito")
            //TODO: Make sure that if e and phi are not coprime to start again with p and q
        }

        //Calculate d=e^(-1) mod phi(n)
        this.privateKey.d = cryptoUtils.modInv(this.publicKey.e, phi);
        // console.log('d: ', this.privateKey.d);
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

    //The message to be blinded and the public key (e,n) of the entity signing
     blind(message, e, n){
        // Generate r
        let r = this.generateRandomPrime();

        //Check that r and n are co-prime
        if(!this.checkCoPrime(n, r)){
            console.log('The numbers: ', n, ' and ', r, ' are not coPrime');
            //return this.blind(message, e, n);
        }

         //r=2 e=5 n=20 m=10
        let blindMessage = (message * cryptoUtils.modPow(r,e,n)) %n;
        //32 mod 20  = 12
         // 12 *10 = 120
        //BindMessage = m * r ^ e mod n
        return blindMessage;
    }

    unBlind(cryptogram, r, n){
        //cryptogram * r^-1 mod n
        //Invers modular -- > r^(-1) mod (n)
        let validSignature = (cryptogram * cryptoUtils.modInv(r,n))  %n;
        return validSignature;
    }

    static checkCoPrime(number, otherNumber){
        return cryptoUtils.gcd(number, otherNumber) === 1
    }

    checkLessThanN(number){
        if(number > this.publicKey.n){
            console.log('La has liao pollito');
        }
    }

    //Used for encoding strings
    static zeroPad(n, w){
        while(n.toString().length<w) n = '0' + n;
        return n;
    }

    static encodeString(string){
        let number = "999";
        for(let i = 0; i < string.length; i++){
            let char = this.zeroPad(string.charCodeAt(i), 3);
            number = number + char;
        }
        return BigInt(number);
    }

    static decodeString(number){
        let stringNumber = number.toString();
        let characterNum = stringNumber.length / 3;
        let decoded = "";
        for(let i = 1; i < characterNum; i++){
            let character = stringNumber.substr(i * 3, 3);
            decoded += String.fromCharCode(Number(character));
        }
        return decoded;
    }

    static generateRandomPrime() {
        return cryptoUtils.primeSync(100,5);
    }
}
module.exports = my_rsa;

// let rsa = new my_rsa();
// let encrypted = rsa.encrypt(BigInt(123456789));
// console.log('Encrypted: ', encrypted);
// let message = rsa.decrypt(encrypted);
// console.log('Message: ', message);
// //The decrypted message is the same ad the original
//
// let signature = rsa.sign(BigInt(1234567890));
// console.log('Signature: ', signature);
// let verification = rsa.verify(signature);
// console.log('Verification: ', verification);
// //The verification is the same as the message signed
//
// let encoded = my_rsa.encodeString('Hola això és una prova per veure que funciona correctament la codificació');
// console.log('Encoded: ', encoded);
// let decoded = my_rsa.decodeString(encoded);
// console.log('Decoded: ', decoded);
