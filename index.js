const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes())

app.listen(3000, err=>{
    if(err){
        console.log('erro')
    }else{
        console.log('online...')
    }
})

