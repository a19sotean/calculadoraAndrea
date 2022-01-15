/**
 * Calculadora.
 * 
 * @author Andrea Solís Tejada
 */
 {

    let botones = ["CE", "DEL", "%", "+", "7", "8", "9", "-", "4", "5", "6", "x", "1", "2", "3", "/", "0", "+/-", ",", "="];

    let texto;
    let entradaDatos;

    function init() {
        calculadora.crearCalculadora();
        texto = document.getElementsByClassName("texto")[0];
        entradaDatos = acciones(entradaDatos, calculadora.arrayIds);
    }

    let calculadora = {
        numero: 0,
        signo: "",
        bandera: false,
        arrayIds: ["btnCE", "btnC", "btnPorc", "btnSuma", "btn7", "btn8", "btn9", "btnResta", "btn4", "btn5", "btn6", "btnMult", "btn1", "btn2", "btn3", "btnDiv", "btn0", "btnCambSig", "btnComa", "btnIgual"],

        crearCalculadora: function () {
            let contador = 0;
    
            let contenido = document.createElement("div");
            contenido.className = "calculadora";
    
            let elemento = document.createElement("div");
            let input = document.createElement("input");
            input.type = "text";
            input.className = "texto";
            input.id = "texto";
            input.value = 0;
    
            elemento.appendChild(input);
            contenido.appendChild(elemento);
    
            for (let i = 0; i < 5; i++) {
                elemento = document.createElement("div");
                for (let j = 0; j < 4; j++) {
                    input = document.createElement("input");
                    input.type = "button";
                    input.value = botones[contador];
                    input.className = "botones";
                    input.id = calculadora.arrayIds[contador];
    
                    contador++;
    
                    elemento.appendChild(input);
                }
                contenido.appendChild(elemento);
            }
            document.body.appendChild(contenido);
        }
    }

    function funcionalidad() {
        if (!isNaN(parseInt(this.value))) {
            if (calculadora.bandera) {
                texto.value = 0;
            }
            if (texto.value == 0 && !texto.value.includes(".")) {
                texto.value = parseFloat(this.value);
            } else {
                texto.value += parseFloat(this.value);
            }
            calculadora.bandera = false;

        } else {
            if (calculadora.signo != "" && this.value != "CE" && this.value != "+/-" && this.value != "," && this.value != "DEL" && this.value != "%") {
                operaciones();
            }
            comprobacion(this.value);
            if (this.value != "+/-" && this.value != "," && this.value != "CE" && this.value != "DEL") {
                calculadora.bandera = true;
            }
        }
    }

    function comprobacion(value) {
        calculadora.numero = acumulador(value, calculadora.numero, texto);
        switch (value) {
            case "+":
                calculadora.signo = "+";
                break;
            case "-":
                calculadora.signo = "-";
                break;
            case "x":
                calculadora.signo = "x";
                break;
            case "/":
                calculadora.signo = "/";
                break;
            case "+/-":
                texto.value = parseFloat(texto.value) * -1;
                break;
            case ",":
                if (!calculadora.bandera) {
                    if (!texto.value.includes(".")) texto.value += ".";
                }
                break;
            case "DEL":
                texto.value = texto.value.substring(0, texto.value.length - 1);
                if (texto.value.length < 1 || texto.value === "-" || texto.value === "-0.")
                    texto.value = 0;
                break;
            case "CE":
                texto.value = 0;
                calculadora.signo = "";
                break;
            case "%":
                texto.value = parseFloat(texto.value) / 100;
                break;
            case "=":
                operaciones();
                break;
        }
    }

    function acciones(entradaDatos, arrayIds) {
        entradaDatos = document.getElementsByTagName("input");
        arrayIds.forEach.call(entradaDatos, element => {
            element.addEventListener("click", funcionalidad);
        });
        return entradaDatos;
    }

    function acumulador(value, numero, texto) {
        if (value == "+" || value == "-" || value == "x" || value == "/")
            numero = parseFloat(texto.value);
        return numero;
    }

    function operaciones() {
        if (calculadora.signo != "") {
            switch (calculadora.signo) {
                case "+":
                    texto.value = parseFloat(texto.value) + calculadora.numero;
                    break;
                case "-":
                    texto.value = calculadora.numero - parseFloat(texto.value);
                    break;
                case "x":
                    texto.value = parseFloat(texto.value) * calculadora.numero;
                    break;
                case "/":
                    if (texto.value == 0)
                    calculadora.signo == 0
                    else
                        texto.value = calculadora.numero / parseFloat(texto.value);
                    break;
            }
        }
        calculadora.signo = '';
    }

    document.addEventListener("DOMContentLoaded", init);
}