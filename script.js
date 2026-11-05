let ValorExibido = document.getElementById('valor')
let PrimeiraOP = true
let Zona = ""

function AddValor(valor) {
    if (PrimeiraOP === true) {
        ValorExibido.innerText = ''
        PrimeiraOP = false
    }

    if (valor === ',') {
        let partes = Zona.split(/[\+\-\*\/\%]/)
        let ultimoNumero = partes[partes.length - 1]
        if (ultimoNumero.includes('.')) {
            return
        }
    }

    if (valor === ',') {
        if (ValorExibido.innerText === '' || ['+', '-', '×', '÷', '%'].includes(ValorExibido.innerText.at(-1))) {
            ValorExibido.innerText += '0'
            Zona += '0'
        }
        ValorExibido.innerText += ','
        Zona += '.'
        return
    }

    ValorExibido.innerText += valor
    Zona += valor
}

function AddOperador(operador) {
    if (PrimeiraOP === true) {
        if (operador === '-') {
            ValorExibido.innerText = '-'
            Zona = '-'
            PrimeiraOP = false
        }
        return
    }

    let ultimoCaractere = ValorExibido.innerText.at(-1)
    if (['+', '-', '\u00D7', '÷', ','].includes(ultimoCaractere)) {
        return
    }

    if (operador == '/') {
        ValorExibido.innerText += '÷'
        Zona += '/'
    } else if (operador == '*') {
        ValorExibido.innerHTML += '\u00D7'
        Zona += '*'
    } else if (operador == '//') {
        ValorExibido.innerText += '%'
        Zona += '%'
    } else {
        ValorExibido.innerText += operador
        Zona += operador
    }
}

function Clear() {
    ValorExibido.innerText = '0'
    Zona = ""
    PrimeiraOP = true
}

function Backspace() {
    if (PrimeiraOP === true) {
        return
    }

    let removidoVisual = ValorExibido.innerText.slice(-1)
    ValorExibido.innerText = ValorExibido.innerText.slice(0, -1)
    
    if (removidoVisual === '÷') {
        Zona = Zona.slice(0, -1)
    } else if (removidoVisual === '\u00D7') {
        Zona = Zona.slice(0, -1)
    } else {
        Zona = Zona.slice(0, -1)
    }

    if (ValorExibido.innerText === '' || Zona === '') {
        PrimeiraOP = true
        ValorExibido.innerText = '0'
        Zona = ""
    }
}

function Resultado() {
    try {
        if (PrimeiraOP === true) {
            return
        }

        let expressaoProcessada = Zona.replace(/([0-9\.]+)([\+\-])([0-9\.]+)%/g, function(match, p1, p2, p3) {
            return p1 + p2 + '(' + p1 + ' * ' + p3 + ' / 100)';
        });

        expressaoProcessada = expressaoProcessada.replace(/([0-9\.]+)([\*\/])([0-9\.]+)%/g, function(match, p1, p2, p3) {
            return p1 + p2 + '(' + p3 + ' / 100)';
        });

        expressaoProcessada = expressaoProcessada.replace(/([0-9\.]+)%/g, function(match, p1) {
            return '(' + p1 + ' / 100)';
        });

        if (expressaoProcessada.includes('/0')) {
            throw new Error("Divisão por zero");
        }

        let Calculo = eval(expressaoProcessada)

        if (isNaN(Calculo) || !isFinite(Calculo)) {
            throw new Error("Resultado inválido");
        }

        if (!Number.isInteger(Calculo)) {
            Calculo = Number(Calculo).toFixed(2)
        }
        
        Calculo = String(Calculo).replace(".", ",")
        Zona = String(Calculo).replace(",", ".")
        ValorExibido.innerText = Zona   
    } catch {
        ValorExibido.innerText = 'Erro'
        Zona = ""
        PrimeiraOP = true
    }
}