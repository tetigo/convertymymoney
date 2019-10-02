const init = () =>{
    const router = require('express').Router()
    const homeRouter = require('../routes/home')
    const cotacaoRouter = require('../routes/cotacao')
    router.use(homeRouter())
    router.use(cotacaoRouter())
    return router
}

module.exports = init


