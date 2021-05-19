'use strict'



const path = require('path')
const fastify = require('fastify')({
  logger: {
    prettyPrint: true
  }
})
const port = process.env.PORT || 3000
const { courseSchema } = require('./schemas')
const auth = require('./plugins/auth')

fastify.register(auth, {
  username: 'admin'
})

fastify.register(require('point-of-view'), {
  engine: {
    handlebars: require('handlebars')
  }
})

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
})


fastify.get('/', { schema: courseSchema }, (request, reply) => {
  const name = request.query.name || 'Anonymous'
  const course = request.query.course

  const validateUserPass = fastify.validateUserPass('steven', '123')
  console.log(':::::::::::::::::::::::::::::::::::::::::')
  fastify.log.info(validateUserPass)

  reply.view('/templates/index.hbs', { name, course })
})

async function start () {
  await fastify.listen(port)
}

start().catch(err => {
  fastify.log.error(err)
  process.exit(1)
})
