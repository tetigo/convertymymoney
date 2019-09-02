const axios = require('axios')

const getToday = () => {
    // const x = new Date().toLocaleString().split(' ')[0].split('-')
    // return x[1]+'-'+x[2]+'-'+x[0]
    const today = new Date()
    const dia = today.getDate()
    const mes = today.getMonth()+1
    const ano = today.getFullYear()
    return (mes +'-'+ dia +'-'+ ano)
}

// console.log(getToday())

/*********** api alteranativa
https://economia.awesomeapi.com.br/all/USD-BRL
**********/
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = url => axios.get(url) //retorna promise
const extractCotacao = res => res.data.value[0].cotacaoVenda 
const getCotacao = ({getToday, getCotacaoAPI, getUrl, extractCotacao}) => async() =>{
    try {
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)
        const cotacao = extractCotacao(res)
        return cotacao
    } catch (error) {
        // console.log('error:', error)        
        return ''
    }
}
// getCotacao()
//  .then((x)=>{console.log(x)})

// async function teste(){
//     const valor = await getCotacao()
//     console.log(valor)
// }
// console.log('ini')
// teste()
// console.log('fim')



module.exports = {
    getCotacaoAPI,
    getCotacao: getCotacao({getToday, getUrl, getCotacaoAPI, extractCotacao}),
    extractCotacao,
    getUrl,
    getToday,
    pure:{
        getCotacao
    }
}