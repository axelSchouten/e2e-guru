module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['./src/e2e/**/*.ts', './src/support/*.ts'],
        format: ['progress'],
        paths: ['./src/e2e/**/*.feature'],
    }
};