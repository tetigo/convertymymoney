const getCotacao = (req, res)=>{
    console.log(req.query)
    // const cotacao = req.query.cotacao
    // const qtd = req.query.qtd
    const convert = require('../lib/convert')
    const {cotacao, qtd} = req.query
   
    if(cotacao && qtd){
        const conversao = convert.convert(cotacao, qtd)
        
        console.log(convert.toMoney(conversao))

        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            qtd: convert.toMoney(qtd),
            conversao: convert.toMoney(conversao)
        })
    }else{
        res.render('cotacao', {
            error: 'Valores inválidos'
        })
    }
}


module.exports = {
    getCotacao,
}