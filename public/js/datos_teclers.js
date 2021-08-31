class Tecler{
    constructor(nombres, apellidos, id_tecler, titular, imagen){
        this._nombres = nombres;
        this._id_tecler = id_tecler;
        this._apellidos = apellidos;
        this._titular = titular;
        this._imagen = imagen;
    }
    get nombres(){
        return this._nombres;
    }
    set nombres(nombres){
        this._nombres = nombres;
    }
    get id_tecler(){
        return this._id_tecler;
    }
    set id_tecler(id_tecler){
        this._id_tecler = id_tecler;
    }
    get apellidos(){
        return this._apellidos;
    }
    set apellidos(apellidos){
        this._apellidos = apellidos;
    }
    get titular(){
        return this._titular;
    }
    set titular(titular){
        this._titular = titular;
    }
    get imagen(){
        return this._imagen;
    }
    set imagen(imagen){
        this._imagen = imagen;
    }
}