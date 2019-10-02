
const init = () =>{
    const router = require('express').Router()
    const homeController = require('../controllers/home')
    router.get('/', homeController.getHome)
    return router
}

module.exports = init

