module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['./e2e/**/*.ts', './support/*.ts'],
        format: ['progress'],
        paths: ['./e2e/**/*.feature'],
    }
};