'use strict';
let cryptoUtils = require('bigint-crypto-utils');

class my_rsa{

    constructor() {
        this.publicKey = {};
        this.privateKey = {};

        //Two distinct prime numbers -> Co-Primes
        let p = this.generateRandomPrime();
        let q = this.generateRandomPrime();

        // n = p * q
        this.publicKey.n = p * q;
        this.privateKey.n= this.publicKey.n;

        //Calculate Totien function = (p-1)(q-1)
        let phi = (p-BigInt(1))*(q-BigInt(1));

        //"e" has to be coprime with phi
        this.publicKey.e = BigInt(65537);

        //Let's check if it is a coprime
        if (this.publicKey.n % this.publicKey.e === (0)) {
            console.log("La has liao pollito")
            //TODO: Make sure that if e and phi are not coprime to start again with p and q
        }

        //Calculate d=e^(-1) mod phi(n)
        this.privateKey.d = cryptoUtils.modInv(this.publicKey.e, phi);
    }


    generateRandomPrime(){
        return cryptoUtils.primeSync(100,5);
    }

    decrypt(cypher){
        this.checkLessThanN(cypher);
        // return message = c^d mod n
        return cryptoUtils.modPow(cypher, this.privateKey.d, this.publicKey.n);
    }

    sign(message){
        this.checkLessThanN(message);
        //return signature = m^d mod n
        return cryptoUtils.modPow(message, this.privateKey.d, this.publicKey.n);
    }

    encrypt(message){
        this.checkLessThanN(message);
        //return cypher = m^e mod n
        return cryptoUtils.modPow(message, this.publicKey.e, this.publicKey.n);
    }

    verify(signature){
        this.checkLessThanN(signature);
        // return message = s^e mod n
        return cryptoUtils.modPow(signature, this.publicKey.e, this.publicKey.n);
    }

    static verify(signature, e, n){
        let verification = cryptoUtils.modPow(signature, e, n)
    }

    //The message to be blinded and the public key (e,n) of the entity signing
     static blind(message, e, n){
        let r = this.generateRandomPrime();
        //TODO: check  r < n

        if(!this.checkCoPrime(n, r)){
            console.log('The numbers: ', n, ' and ', r, ' are not coPrime');
            return this.blind(message, e, n);
        }

        // return BlindMessage = m * r ^ e mod n
        return (message * cryptoUtils.modPow(r, e, n)) % n;
    }

    unBlind(cryptogram, r, n){
        //cryptogram * r^-1 mod n
        //Inverse modular -- > r^(-1) mod (n)
        let signature = (cryptogram * cryptoUtils.modInv(r,n))  %n;

        //TODO: Check that signature is valid

        return signature;
    }

    static checkCoPrime(number, otherNumber){
        return cryptoUtils.gcd(number, otherNumber) === 1
    }

    checkLessThanN(number){
        if(number > this.publicKey.n){
            console.log('La has liao pollito');
        }
    }

    static generateRandomPrime() {
        return cryptoUtils.primeSync(100,5);
    }
}
module.exports = my_rsa;
