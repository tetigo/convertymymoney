const express = require('express')
const app = express()
const path = require('path')

const convert = require('./lib/convert')
// const  { convert } = require('./lib/convert')
// const  { toMoney } = require('./lib/convert')
const apiBC = require('./lib/api-bc')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res)=>{
    const cotacao = await apiBC.getCotacao()
    console.log('cotacao', cotacao)
    res.render('home', {cotacao})
})

app.get('/cotacao', (req, res)=>{
    console.log(req.query)
    // const cotacao = req.query.cotacao
    // const qtd = req.query.qtd
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
})

app.listen(3000, err=>{
    if(err){
        console.log('erro')
    }else{
        console.log('online...')
    }
})