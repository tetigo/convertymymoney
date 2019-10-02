const getHome = async(req, res)=>{
    const apiBC = require('../lib/api-bc')
    const cotacao = await apiBC.getCotacao()
    console.log('cotacao', cotacao)
    res.render('home', {cotacao})
}

module.exports = {
    getHome,
}

