
var precioProducto = {
    "Flor1": "10350",
    "Flor2": "11450",
    "Flor3": "10550",
    "Flor4": "9550",
    "Flor5": "10750",
    "Arreglo1": "19000",
    "Arreglo2": "20000",
    "Arreglo3": "15000",
    "Arreglo4": "18000",
    "Arreglo5": "13500",
    "Caja1": "20000",
    "Caja2": "10125",
    "Caja3": "12250",
    "Caja4": "13250",
    "Caja5": "15500"
};

window.onload = cargaInicial;

function obtenerPrecio(codigo) {
    return precioProducto[codigo] || "0";
}

function Limpiar() {
    document.getElementById("prov").value = "";
    document.getElementById("can").value = "";
    document.getElementById("dis").value = "";
    document.getElementById("cantidad").value = "0";
    document.getElementById("producto").value = "";
    document.getElementById("tamanio").value = "";
}

function registrarProducto() {

    var cantidad = parseInt(document.getElementById("cantidad").value);
    var producto = document.getElementById("producto").value;
    var tamaño = document.getElementById("tamanio").value;
    
    if (cantidad <= 0 || producto === "" || tamaño === "") {
        alert("Por favor seleccione cantidad, producto y tamaño válidos.");
        return;
    }
    
    var precio = parseFloat(obtenerPrecio(producto));
    var totalLinea = cantidad * precio;
    
    if (tamaño === "Medium") {
        totalLinea *= 1.1; 
    } else if (tamaño === "Large") {
        totalLinea *= 1.15; 
    }
    
    var fila = "<tr><td>" + cantidad + "</td><td>" + producto + "</td><td>" + tamaño + "</td><td>" + precio.toFixed(2) + "</td><td>" + totalLinea.toFixed(2) + "</td></tr>";
    
    document.getElementById("datos").innerHTML += fila;
    
    var totalAPagar = calcularTotalAPagar();
    
    document.getElementById("txtTotal").value = totalAPagar.toFixed(2);
}

function calcularTotalAPagar() {
    var totalAPagar = 0;
    
    var filas = document.getElementById("datos").getElementsByTagName("tr");
    for (var i = 0; i < filas.length; i++) {
        var totalLinea = parseFloat(filas[i].getElementsByTagName("td")[4].innerText);
        totalAPagar += totalLinea;
    }
    
    var provSeleccionada = document.getElementById("prov").value;
    if (provSeleccionada === "Puntarenas" || provSeleccionada === "Guanacaste" || provSeleccionada === "Limón") {
        totalAPagar += 10000;
    }
    
    return totalAPagar;
}

