/**
 * Calculadora.
 * 
 * @author Andrea Solís Tejada
 */
{

    let arrayIds = ["btnCE", "btnC", "btnPorc", "btnSuma", "btn7", "btn8", "btn9", "btnResta", "btn4", "btn5", "btn6", "btnMult", "btn1", "btn2", "btn3", "btnDiv", "btn0", "btnCambSig", "btnComa", "btnIgual"]

    let botones = ["CE", "DEL", "%", "+", "7", "8", "9", "-", "4", "5", "6", "x", "1", "2", "3", "/", "0", "+/-", ",", "="];

    let numero;
    let texto;
    let signo = "";
    let bandera = false;
    let entradaDatos;

    function init() {
        crearCalculadora();
        texto = document.getElementsByClassName("texto")[0];
        entradaDatos = acciones(entradaDatos, arrayIds);
    }

    let crearCalculadora = function () {
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
                input.type = "botones";
                input.value = botones[contador];
                input.className = "botones";
                input.id = arrayIds[contador];

                contador++;

                elemento.appendChild(input);
            }
            contenido.appendChild(elemento);
        }
        document.body.appendChild(contenido);
    }

    function funcionalidad() {
        if (!isNaN(parseInt(this.value))) {
            if (bandera) {
                texto.value = 0;
            }
            if (texto.value == 0 && !texto.value.includes(".")) {
                texto.value = parseFloat(this.value);
            } else {
                texto.value += parseFloat(this.value);
                bandera = false;
            }

        } else {
            comprobacion(this.value);
            if (this.value != "+/-" && this.value != "," && this.value != "CE" && this.value != "DEL") {
                bandera = true;
            }
        }
    }

    function comprobacion(value) {
        numero = acumulador(value, numero, texto);
        switch (value) {
            case "+":
                signo = "+";
                break;
            case "-":
                signo = "-";
                break;
            case "x":
                signo = "x";
                break;
            case "/":
                signo = "/";
                break;
            case "+/-":
                texto.value = parseFloat(texto.value) * -1;
                break;
            case ",":
                if (!bandera) {
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
                signo = "";
                break;
            case "%":
                texto.value = parseFloat(texto.value) / 100;
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

    document.addEventListener("DOMContentLoaded", init);
}