const fp = require('fastify-plugin')

module.exports = fp(async function(fastify, options) {
    fastify.decorate('validateUserPass', (user, pass) => {
        if(user === 'steve' && pass === '123') return 'success'
        return 'error'
    })
})