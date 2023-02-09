// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    // development: {
    //     client: 'mysql',
    //     connection: {
    //         host: '127.0.0.1',
    //         port: 3306,
    //         user: 'root',
    //         password: '',
    //         database: 'hilyah-crud'
    //     }
    // },

    development: {
        client: 'mysql',
        connection: {
            host: 'sql12.freemysqlhosting.net',
            port: 3306,
            user: 'sql12596922',
            password: 'B484VXvzgc',
            database: 'sql12596922'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: 'sql12.freemysqlhosting.net',
            port: 3306,
            user: 'sql12596922',
            password: 'B484VXvzgc',
            database: 'sql12596922'
        }
    },

};