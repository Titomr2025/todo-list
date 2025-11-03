
let tareas = [
    { id: 1, descripcion: "Estudiar JavaScript", completado: false },
    { id: 2, descripcion: "Hacer ejercicio", completado: true },
    { id: 3, descripcion: "Leer un libro", completado: false }
];

let contador = 4;

function mostrarTareas() {
    let lista = document.getElementById('listaTareas');
    lista.innerHTML = '';
    
    for (let i = 0; i < tareas.length; i++) {
        let fila = document.createElement('tr');
        
        if (tareas[i].completado) {
            fila.innerHTML = `
                <td>${tareas[i].id}</td>
                <td><span class="texto-tachado">${tareas[i].descripcion}</span> <span class="estado-realizado">REALIZADO</span></td>
                <td><input type="checkbox" checked onclick="marcarTarea(${i})"></td>
                <td><button class="btn-eliminar" onclick="eliminarTarea(${i})">✖</button></td>
            `;
        } else {
            fila.innerHTML = `
                <td>${tareas[i].id}</td>
                <td>${tareas[i].descripcion}</td>
                <td><input type="checkbox" onclick="marcarTarea(${i})"></td>
                <td><button class="btn-eliminar" onclick="eliminarTarea(${i})">✖</button></td>
            `;
        }
        
        lista.appendChild(fila);
    }
    
    actualizarContadores();
}

function agregarTarea() {
    let input = document.getElementById('descripcionTarea');
    let descripcion = input.value;
    
    if (descripcion != '') {
        let nueva = {
            id: contador,
            descripcion: descripcion,
            completado: false
        };
        
        tareas.push(nueva);
        contador++;
        input.value = '';
        mostrarTareas();
    }
}

function eliminarTarea(indice) {
    tareas.splice(indice, 1);
    mostrarTareas();
}

function marcarTarea(indice) {
    tareas[indice].completado = !tareas[indice].completado;
    mostrarTareas();
}

function actualizarContadores() {
    let total = tareas.length;
    let realizadas = tareas.filter(function(tarea) {
        return tarea.completado == true;
    }).length;
    
    document.getElementById('totalTareas').textContent = total;
    document.getElementById('tareasRealizadas').textContent = realizadas;
}

document.getElementById('agregarTarea').onclick = agregarTarea;

document.getElementById('descripcionTarea').onkeypress = function(e) {
    if (e.key == 'Enter') {
        agregarTarea();
    }
}

mostrarTareas();
