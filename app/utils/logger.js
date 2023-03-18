const pino = require('pino')

const transport = pino.transport({
    targets: [
        {
            target: 'pino/file',
            options: { destination: `${__dirname}/app.log` }
        },
        {
            target: 'pino/file'
        }
    ]
})

const logger = pino(
    {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
    },
    transport
)

module.exports.logger = logger
