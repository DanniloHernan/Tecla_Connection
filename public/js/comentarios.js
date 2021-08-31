class Coment{
    constructor(nombre, comentario, fecha, id_comentario){
        this._nombre = nombre;
        this._id_comentario = id_comentario;
        this._comentario = comentario;
        this._fecha = fecha;
    }
    get nombre(){
        return this._nombre;
    }
    set nombre(nombre){
        this._nombre = nombre;
    }
    get id_comentario(){
        return this._id_comentario;
    }
    set id_comentario(id_comentario){
        this._id_comentario = id_comentario;
    }
    get comentario(){
        return this._comentario;
    }
    set comentario(comentario){
        this._comentario = comentario;
    }
    get fecha(){
        return this._fecha;
    }
    set fecha(fecha){
        this._fecha = this.fecha;
    }
}