const courseSchema = {
    querystring: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            course: { type: 'string' }
        },
        required: [ 'course' ]
    }
}

module.exports = {
    courseSchema
}
