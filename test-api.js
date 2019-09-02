const axios = require('axios')

let x = new Date().toLocaleString().split(' ')[0].split('-')
console.log(x)
let monta = x[1]+'-'+(x[2]-1)+'-'+x[0]

console.log(monta)
console.log(typeof(monta))

// monta = '8-27-2019'

const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${monta}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

axios
    .get(url)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

