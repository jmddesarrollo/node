class Usuarios {
    constructor() {
        this.personas = [];
    }

    getPersona(id) {
        // Buscar el id de la persona dentro de array, devolviendo un solo registro.
        // undefined si no encuentra persona.
        let persona = this.personas.filter(persona => {
            return persona.id === id;
        })[0];

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => {
            return persona.sala === sala;
        });

        return personasEnSala;
    }

    agregarPersonas(id, nombre, sala) {
        let persona = {
            id: id,
            nombre: nombre,
            sala: sala
        }

        this.personas.push(persona);

        return this.personas;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);

        this.personas = this.personas.filter(persona => {
            return persona.id != id;
        });

        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}