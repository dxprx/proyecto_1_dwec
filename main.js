// Gestión (propiedades y métodos) de los siguientes objetos predefinidos: Objeto windows, Objeto String, Objeto Math, Objeto Date, Objeto Array, Objeto RegExp,
window.onload = function () {

    // Comunicación asíncrona AJAX o fecth: JSON, XML SQL (xamp)
    fetch('https://api.themotivate365.com/stoic-quote')
        .then(response => response.json())
        .then(data => {
            let cita = document.createElement('p');
            cita.textContent = data.quote;
            let autor = document.createElement('p');
            if (!data.author == '') {
                autor.textContent = '- ' + data.author;
            } else {
                autor.textContent = '- Anonymous';
            }
            document.body.append(cita);
            cita.after(autor);

            crearTabla()
        })
        // Utilización de distintos tipos de funciones y de funciones anónimas
        .catch(() => {
            let mensajeError = document.createElement('p');
            mensajeError.textContent = 'Error en la solicitud a la API';
            document.body.append(mensajeError);
            crearTabla();
        });
};




// Utilización de distintos tipos de funciones y de funciones anónimas
function crearTabla() {
    let tabla = document.createElement('table');
    // Utilización y manipulación del DOM dinámicamente
    tabla.id = 'tabla';
    tabla.setAttribute('border', '1');
    document.body.append(tabla);

    let thead = document.createElement('thead');
    tabla.append(thead);
    let theadRow = document.createElement('tr');
    thead.append(theadRow);

    let cabeceras = ['Tarea', 'Compleado'];
    // Utilización de distintos tipos de funciones y de funciones anónimas
    cabeceras.forEach(e => {

        let th = document.createElement('th');
        th.append(e);
        theadRow.append(th);

    })
    let tbody = document.createElement('tbody');
    tabla.append(tbody);

    if (Cookie.get('tareas')) {
        let tareas = Cookie.get('tareas');
        // Tipo de datos (conversión), Operadores, Estructuras de control (condicionales y bucles)
        // Gestión (propiedades y métodos) de los siguientes objetos predefinidos: Objeto windows, Objeto String, Objeto Math, Objeto Date, Objeto Array, Objeto RegExp,
        tareas.forEach(tarea => {
            let tr = document.createElement('tr');
            let tdDescripcion = document.createElement('td');
            let pDescripcion = document.createElement('p');
            let inputDescripcion = document.createElement('input');
            inputDescripcion.value = tarea.descripcion;
            inputDescripcion.hidden = true;
            tdDescripcion.append(inputDescripcion);
            pDescripcion.textContent = tarea.descripcion;
            tr.append(tdDescripcion);
            tdDescripcion.append(pDescripcion);
            // Formularios, validación, imágenes y eventos
            // Utilización y manipulación del DOM dinámicamente
            tdDescripcion.addEventListener('click', e => {
                inputDescripcion.hidden = false;
                pDescripcion.hidden = true;
                inputDescripcion.focus();
            });
            inputDescripcion.addEventListener('blur', e => {
                inputDescripcion.hidden = true;
                let nuevaDescripcion = inputDescripcion.value
                pDescripcion.textContent = nuevaDescripcion;
                pDescripcion.hidden = false;
                tarea.descripcion = nuevaDescripcion;
                Cookie.deleteCookieValueByID('tareas', tarea.id);
                Cookie.set('tareas', tarea, 365);
            })
            let tdCheckbox = document.createElement('td');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox'
            checkbox.addEventListener('change', e => {
                if (tarea.completada) {
                    tarea.completada = false;
                    pDescripcion.style.textDecoration = "none";
                    tr.classList = "";
                } else {
                    tarea.completada = true;
                    pDescripcion.style.textDecoration = "line-through";
                    tr.classList = "completada";
                }
                Cookie.deleteCookieValueByID('tareas', tarea.id);
                Cookie.set('tareas', tarea, 365);
            })
            if (tarea.completada) {
                checkbox.checked = true;
                pDescripcion.style.textDecoration = "line-through";
                tr.classList = "completada";
            }
            tdCheckbox.append(checkbox);
            tr.append(tdCheckbox);
            tabla.append(tr);
        })
    }

    let botonEliminar = document.createElement('input');
    botonEliminar.type = "button";
    botonEliminar.value = "Borrar completadas";
    tabla.after(botonEliminar);
    botonEliminar.addEventListener("click", eliminarCompletadas);


    let botonHref = document.createElement('input');
    document.body.append(botonHref);
    botonHref.type = "button";
    botonHref.value = "Agregar tarea";
    // Gestión (propiedades y métodos) de los siguientes objetos predefinidos: Objeto windows, Objeto String, Objeto Math, Objeto Date, Objeto Array, Objeto RegExp,
    botonHref.addEventListener("click", () => window.location.href = "form.html");
}


function actualizarTabla() {
    let tabla = document.getElementById('tabla');
    tabla.remove();
    crearTabla();
}

function eliminarCompletadas() {

    if (Cookie.get('tareas')) {
        let tareas = Cookie.get('tareas');
        // Tipo de datos (conversión), Operadores, Estructuras de control (condicionales y bucles)
        tareas.forEach(tarea =>{
            if(tarea.completada){
                Cookie.deleteCookieValueByID('tareas',tarea.id);
            }
        })
    }
 let trCompletadas = document.querySelectorAll('.completada');
 trCompletadas.forEach(tr =>{
    tr.remove();
 })
}








