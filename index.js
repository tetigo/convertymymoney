const express = require('express')
const app = express()
const path = require('path')

const homeController = require('./controllers/home')
const cotacaoController = require('./controllers/cotacao')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', homeController.getHome)
app.get('/cotacao', cotacaoController.getCotacao)

app.listen(3000, err=>{
    if(err){
        console.log('erro')
    }else{
        console.log('online...')
    }
})