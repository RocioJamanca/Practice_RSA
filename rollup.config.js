export default {
    input: 'index.js',
    output: [
        {
            file: 'index.cjs.js',
            format: 'cjs'
        },
        {
            file: 'index.esm.js',
            format: 'esm'
        }
    ],
    external: ['bigint-crypto-utils']
}
