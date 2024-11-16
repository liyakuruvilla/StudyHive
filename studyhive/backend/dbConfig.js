const config = {
    user: 'sa',
    password: 'YourStrong!Passw0rd',
    server: 'localhost',
    database: 'master'
    ,
    port: 1433,
    options: {
        encrypt: true, 
        enableArithAbort: true, // it ensures that any arithmetic errors (such as divide-by-zero errors) will terminate the query.
        trustServerCertificate: true,
    }
};
module.exports = config;
