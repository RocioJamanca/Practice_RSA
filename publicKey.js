'use strict';
const cryptoUtils = require("bigint-crypto-utils");



class PublicKey {

    e = BigInt("5");
    n = BigInt("5");



// e : big init
// n: big init
// encrypt (m:bigint) --> c: bingint = m^e mod e
// verify (s:bigint) --> m : bigint  = s^e mod n
}

module.exports = PublicKey;

