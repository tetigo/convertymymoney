const convert = (cotacao, qtd)=>{
    return cotacao * qtd
}

const toMoney = valor =>{
    return parseFloat(valor).toFixed(4)
}

module.exports = {
    convert,
    toMoney
}