
const init = () =>{
    const router = require('express').Router()
    const cotacaoController = require('../controllers/cotacao')
    router.get('/cotacao', cotacaoController.getCotacao)
    return router
}

module.exports = init

