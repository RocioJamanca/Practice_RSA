const fs=  require('fs');

const a = "hello";


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

