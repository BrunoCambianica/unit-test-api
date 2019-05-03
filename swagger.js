module.exports = {
    swaggerDefinition: {
        info: {
            description: 'Unit test api',
            title: 'NodeJS WEB API',
            version: '1.0.0',
        },
        host: 'localhost: 8080',
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'
        ],
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/*.js'] //Path to the API handle folder
};
