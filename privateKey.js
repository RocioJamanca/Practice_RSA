'use strict';
let cryptoUtils = require('bigint-crypto-utils');

class privateKey {
    // d;
    // publicKey;

    decrypt(c){
        let m = cryptoUtils.modPow(c, this.d, this.publicKey.n);
    }

    sign(m){
        let s = cryptoUtils.modPow(m, this.d, this.publicKey.n);
    }

}

module.exports = privateKey;
