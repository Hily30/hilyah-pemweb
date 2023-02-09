const knex = require('knex')({
    client: 'mysql',
    connection: {
        // host: '127.0.0.1',
        // port: 3306,
        // user: 'root',
        // password: '',
        // database: 'hilyah-crud',
        host: 'sql12.freemysqlhosting.net',
        port: 3306,
        user: 'sql12596922',
        password: 'B484VXvzgc',
        database: 'sql12596922'
    }
})

export default knex