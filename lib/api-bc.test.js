const api = require('./api-bc')
const axios = require('axios')

//mockar o axios
jest.mock('axios')

test('getCotacaoAPI', ()=>{
    //assinatura igual ao usado de verdade:
    //res.data.value[0].cotacaoVenda 
    const res = {
        data:{
            value:[
                {cotacaoVenda: 3.90}
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    api.getCotacaoAPI('url')
        .then(resp=>{
            expect(resp).toEqual(res)
            expect(axios.get.mock.calls[0][0]).toBe('url')
            console.log(axios.get.mock)
            console.log('################')
            console.log(resp)
        })
})

test('extractCotacao', ()=>{
    const cotacao = api.extractCotacao(
        {
            data:{
                value:[
                    {cotacaoVenda: 3.90}
                ]
            }
        }
    )
    expect(cotacao).toBe(3.90)
    console.log(cotacao)
})

test('getUrl', ()=>{
    const data = '04-22-2019'
    const url = api.getUrl(data)
    expect(url).toEqual(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`)
})

test('getToday',()=>{
    const today = new Date()
    console.log(today)
    const dia = today.getDate()
    const mes = today.getMonth()+1
    const ano = today.getFullYear()
    const data = (mes +'-'+ dia +'-'+ ano)
    const pegou = api.getToday(today)
    expect(pegou).toEqual(data)
    console.log('veio: ',pegou)
    console.log('esperado: ', data)

})

describe('getToday', ()=>{
    const RealDate = global.Date

    function mockDate(data){
        // global.Date = class extends RealDate{
        //     constructor(){
        //         return new RealDate(data)
        //     }
        // }
        //mesma construção
        class Teste extends RealDate{
            constructor(){
                return new RealDate(data)
            }
        }
        global.Date = Teste
    }

    afterEach(()=>{
        global.Date = RealDate
    })

    test('getToday', ()=>{
        const data = '2019-01-01T12:00:00Z'
        mockDate(data)
        const today = api.getToday()
        expect(today).toEqual('1-1-2019')
    })
})

test('getCotacao', ()=>{
    const res = {
        data:{
            value:[
                {cotacaoVenda: 3.90}
            ]
        }
    }
    const getToday = jest.fn()
    const getUrl = jest.fn()
    const getCotacaoAPI = jest.fn()
    const extractCotacao = jest.fn()

    getToday.mockReturnValue('01-01-2019')
    getUrl.mockReturnValue('url')
    getCotacaoAPI.mockResolvedValue(res)
    extractCotacao.mockReturnValue(3.9)

    api.pure
        .getCotacao({getToday, getUrl, getCotacaoAPI, extractCotacao})
        ()
        .then(res =>{
            expect(res).toBe(3.9)
            console.log(res)
        })


})


test('getCotacao2', ()=>{
    const res = { //testando catch
        // data:{
        //     value:[
        //         {cotacaoVenda: 3.90}
        //     ]
        // }
    }
    const getToday = jest.fn()
    const getUrl = jest.fn()
    const getCotacaoAPI = jest.fn()
    const extractCotacao = jest.fn()

    getToday.mockReturnValue('01-01-2019')
    getUrl.mockReturnValue('url')
    getCotacaoAPI.mockReturnValue(Promise.reject('err'))
    // getCotacaoAPI.mockRejectedValue('')
    extractCotacao.mockReturnValue(3.9)

    api.pure
        .getCotacao({getToday, getUrl, getCotacaoAPI, extractCotacao})
        ()
        .then(res =>{
            expect(res).toBe('')
        })
        .catch(err => {
            console.log(err)
        })
})


//pode-se executar a promise dentro de um async/await
// async function teste(){
//     const teste = await api.getCotacao('08-26-2019')
//     console.log(teste)
//     const teste2 = await api.getCotacao('12-12-2012')
//     console.log(teste2)
// }
// console.log('inicio')
// teste()
// console.log('fim')

//pode-se executar a promise direto
// api.getCotacao('04-22-2019')
//  .then((x)=>{
//      console.log(x)
//  })
