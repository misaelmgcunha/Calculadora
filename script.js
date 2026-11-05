let ValorExibido = document.getElementById('valor')
let PrimeiraOP = true
let Zona = ""

function AddValor(valor) {
    if (PrimeiraOP === true) {
        ValorExibido.innerText = ''
        PrimeiraOP = false
    }

    ValorExibido.innerText += valor
    Zona += valor
}

function AddOperador(operador) {
    if (PrimeiraOP === true) {
        return
    }

    if (ValorExibido.innerText.at(-1) == '+' || ValorExibido.innerText.at(-1) == '-' || ValorExibido.innerText.at(-1) == '*' || ValorExibido.innerText.at(-1) == '/' || ValorExibido.innerText.at(-1) == ',') {
        return
    }

    ValorExibido.innerText += operador
    Zona += operador
}

function Clear() {
    ValorExibido.innerText = 0
    Zona = ""
    PrimeiraOP = true
}

function Backspace() {
    if (PrimeiraOP === true) {
        return
    }

    ValorExibido.innerText = ValorExibido.innerText.slice(0, -1)
    Zona = Zona.slice(0, -1)
}

function Resultado() {
    try {
        let Calculo = eval(Zona)
        if (!Number.isInteger(Calculo)){
            Calculo = Calculo.toFixed(2)
        }
        Zona = Calculo
        ValorExibido.innerText = Zona
    } catch {
        ValorExibido.innerText = 'Erro'
        Zona = ""
        PrimeiraOP = true
    }
}