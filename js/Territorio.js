const $d = document;
const $Provincias = $d.getElementById("prov");
const $Cantones = $d.getElementById("can");
const $Distritos = $d.getElementById("dis");

/*
function provincia() {
    fetch("https://ubicaciones.paginasweb.cr/provincias.json")
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json =>{
        if (json.provincias) {
            var $options = '<option value="Selecciona una provincia">Select Provincia</option>';
            json.provincias.forEach(element => $options += `<option value="${element.nombre}">${element.nombre}</option>`);
            $Provincias.innerHTML = $options; 
        } else {
            console.error('No se encontraron provincias en los datos recibidos.');
        }
    })
    .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
    });
}

$d.addEventListener("DOMContentLoaded", provincia)
*/

/*
function provincia() {
    fetch("https://ubicaciones.paginasweb.cr/provincias.json")
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json =>{
        var $options = '<option value="">Selecciona una provincia</option>';
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                const provincia = json[key];
                $options += `<option value="${provincia}">${provincia}</option>`;
            }
        }
        $Provincias.innerHTML = $options; 
    })
    .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
    });
}
*/

function provincia() {
    fetch("https://ubicaciones.paginasweb.cr/provincias.json")
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        var $options = '<option value="">Selecciona una provincia</option>';
        Object.values(json).forEach(provincia => {
            $options += `<option value="${provincia}">${provincia}</option>`;
        });
        $Provincias.innerHTML = $options; 
    })
    .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
    });
}

$d.addEventListener("DOMContentLoaded", provincia)

function cargarCantones(provincia) {
    fetch(`https://ubicaciones.paginasweb.cr/provincia/${provincia}/cantones.json`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        var $options = '<option value="">Selecciona un cantón</option>';
        Object.values(json).forEach(canton => {
            $options += `<option value="${canton}">${canton}</option>`;
        });
        $Cantones.innerHTML = $options;
    })
    .catch(error => {
        console.error('Error al obtener los cantones de la API:', error);
    });
}

function cargarDistritos(provincia, canton) {
    fetch(`https://ubicaciones.paginasweb.cr/provincia/${provincia}/canton/${canton}/distritos.json`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        var $options = '<option value="">Selecciona un distrito</option>';
        Object.values(json).forEach(distrito => {
            $options += `<option value="${distrito}">${distrito}</option>`;
        });
        $Distritos.innerHTML = $options;
    })
    .catch(error => {
        console.error('Error al obtener los distritos de la API:', error);
    });
}

$Provincias.addEventListener('change', function() {
    const provinciaSeleccionada = this.value;
    if (provinciaSeleccionada !== "") {
        cargarCantones(provinciaSeleccionada);
    } else {
        $Cantones.innerHTML = '<option value="">Selecciona un cantón</option>';
        $Distritos.innerHTML = '<option value="">Selecciona un distrito</option>';
    }
});

$Cantones.addEventListener('change', function() {
    const provinciaSeleccionada = $Provincias.value;
    const cantonSeleccionado = this.value;
    if (cantonSeleccionado !== "") {
        cargarDistritos(provinciaSeleccionada, cantonSeleccionado);
    } else {
        $Distritos.innerHTML = '<option value="">Selecciona un distrito</option>';
    }
});

