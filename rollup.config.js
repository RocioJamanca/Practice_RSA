export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'index.cjs.js',
            format: 'csj'
        },
        {
            file: 'index.esm.js',
            format: 'esm'
        }
    ],
    external: ['bigint-crypto-utils']
}
