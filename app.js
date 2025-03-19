// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.


// Lista donde se almacenarán los nombres ingresados por el usuario
let amigos = [];

// Se ejecuta cuando el documento HTML ha cargado completamente
document.addEventListener("DOMContentLoaded", function () {
    // Se agrega un evento para detectar cuando el usuario presiona "Enter" en el campo de entrada
    document.getElementById("amigo").addEventListener("keydown", function (event) {
        if (event.key === "Enter") { // Si la tecla presionada es "Enter"
            agregarAmigo(); // Se ejecuta la función para agregar un amigo
        }
    });
});

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const input = document.getElementById("amigo"); // Se obtiene el campo de entrada
    const nombre = input.value.trim(); // Se obtiene el valor ingresado y se eliminan espacios en blanco al inicio y al final

    // Si el usuario no ingresó ningún nombre, muestra una alerta y sale de la función
    if (!nombre) {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    // Verifica si el nombre ya ha sido agregado a la lista
    if (amigos.includes(nombre)) {
        alert("Este nombre ya ha sido agregado. Intenta con otro.");
        return;
    }

    amigos.push(nombre); // Agrega el nombre a la lista de amigos
    input.value = ""; // Limpia el campo de entrada
    actualizarLista(); // Llama a la función para actualizar la lista en la interfaz
}

// Función para actualizar la lista en pantalla
function actualizarLista() {
    const lista = document.getElementById("listaAmigos"); // Obtiene el elemento <ul> donde se mostrarán los nombres
    lista.innerHTML = ""; // Borra los nombres previos para actualizar la lista

    // Recorre la lista de amigos y los muestra en la interfaz
    amigos.forEach((amigo, index) => {
        const li = document.createElement("li"); // Crea un nuevo elemento <li>
        li.textContent = `${index + 1}. ${amigo}`; // Asigna el texto con la posición y el nombre del amigo

        // Crea un botón "Eliminar" para cada nombre
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "x"; // Texto del botón
        botonEliminar.classList.add("btn-eliminar"); // Se le asigna una clase CSS para su estilo
        botonEliminar.onclick = () => eliminarAmigo(index); // Se asigna la función de eliminar cuando se haga clic

        li.appendChild(botonEliminar); // Se añade el botón dentro del <li>
        lista.appendChild(li); // Se agrega el <li> a la lista visible en la página
    });

    actualizarBotonSortear(); // Se actualiza el estado del botón "Sortear Amigo"
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(indice) {
    // Confirma con el usuario si realmente desea eliminar el nombre
    if (confirm("¿Seguro que deseas eliminar este amigo?")) {
        amigos.splice(indice, 1); // Elimina el amigo en la posición indicada
        actualizarLista(); // Se actualiza la lista en pantalla
    }
}

// Función para seleccionar aleatoriamente un amigo de la lista
function sortearAmigo() {
    // Si hay menos de 2 amigos, muestra un mensaje y no realiza el sorteo
    if (amigos.length < 2) {
        alert("Se necesitan al menos 2 amigos para realizar el sorteo.");
        return;
    }

    // Genera un número aleatorio entre 0 y la cantidad de amigos en la lista
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceAleatorio]; // Se obtiene el amigo en la posición aleatoria

    // Muestra el amigo seleccionado en la página dentro del elemento <li>
    document.getElementById("resultado").innerHTML = `<li>${amigoSorteado}</li>`;
}

// Función para reiniciar la aplicación y borrar la lista
function reiniciarAplicacion() {
    // Confirma con el usuario si realmente desea reiniciar todo
    if (confirm("¿Seguro que deseas reiniciar la aplicación?")) {
        amigos = []; // Vacía la lista de amigos
        actualizarLista(); // Refresca la lista en pantalla
        document.getElementById("resultado").innerHTML = ""; // Borra el resultado del sorteo
    }
}

// Función para desactivar el botón "Sortear Amigo" si hay menos de 2 nombres
function actualizarBotonSortear() {
    const botonSortear = document.getElementById("btnSortear"); // Obtiene el botón
    botonSortear.disabled = amigos.length < 2; // Lo desactiva si hay menos de 2 amigos en la lista
}
