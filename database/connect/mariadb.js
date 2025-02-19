const mariadb = require('mysql');

const conn = mariadb.createConnection(
    {
        host : 'svc.sel4.cloudtype.app',
        port:32097,
        user:'root',
        password:'1902',
        database:'winners'
    }
);

module.exports = conn;