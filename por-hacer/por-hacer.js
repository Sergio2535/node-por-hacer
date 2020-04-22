const fs = require('fs');


let ListadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(ListadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err)
    });
}

const cargarDB = () => {

    try {

        ListadoPorHacer = require('../db/data.json');
    } catch (error) {
        ListadoPorHacer = [];
    }
    // console.log(ListadoPorHacer)
}

const getListado = () => {
    cargarDB();
    return ListadoPorHacer;
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };
    ListadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

const actualizar = (descripcion, completado) => {

    cargarDB();

    let index = ListadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        ListadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = ListadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (ListadoPorHacer.length === nuevoListado) {
        return false;
    } else {
        ListadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}