// Gestión (propiedades y métodos) de los siguientes objetos predefinidos: Objeto windows, Objeto String, Objeto Math, Objeto Date, Objeto Array, Objeto RegExp,
window.onload = function () {
    // Comunicación asíncrona AJAX o fecth: JSON, XML SQL (xamp)
    fetch('https://fakerapi.it/api/v1/persons?_quantity=3')
        .then(response => response.json())
        .then(e => {

            e.data.forEach(data => {
                let faker = data.firstname;
                let img = document.createElement('img');
                img.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${faker}`;
                img.width = 100;
                document.body.append(img);

            })

            crearFormulario();
        })
        // Utilización de distintos tipos de funciones y de funciones anónimas
        .catch(() => {
            let mensajeError = document.createElement('p');
            mensajeError.textContent = 'Error en la solicitud a la API';
            document.body.append(mensajeError);
            crearFormulario();
        });

};

function crearFormulario() {
    // Formularios, validación, imágenes y eventos
    // Utilización y manipulación del DOM dinámicamente
    let form = document.createElement('form');
    form.id = 'form';

    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Escribe una tarea';
    form.appendChild(input);

    let submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Agregar tarea';
    form.appendChild(submitButton);

    // Formularios, validación, imágenes y eventos
    // Utilización de distintos tipos de funciones y de funciones anónimas
    form.onsubmit = function (event) {
        event.preventDefault();
        añadirTarea(input.value);
        window.location.href = "index.html";
    };

    document.body.appendChild(form);
}

function añadirTarea(descripcion) {
    let nuevaTarea = new Tarea(descripcion, false);
    // Almacenamiento (localstorage, sessiónstorage o cookies)
    Cookie.set('tareas', nuevaTarea, 365);
}