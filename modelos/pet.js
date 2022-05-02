const {Schema, model} = require('mongoose');

const PetSchema = Schema ({

    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    birth_date: {
        type: Date,
        required: true
    },
    chip:{
        type: String,
        unique: true
    },
    passport:{
        type: String,
        unique: true
    },
    id_user:{
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    sex: {
        required: true,
        type: String,
    },
    sterilized: {
        required: true,
        type: Boolean,
        default: false
    },
    color:{
        type: String,
        required: true
    },
    chronic: [{
        type: String
    }],
    weight: [{
        type: Number
    }],
    raza: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Raza'
    },
    tipo: {
        type: String,
        required: true
    },
    consultas: [{
        type: Schema.Types.ObjectId,
        ref: 'Consulta'
    }],
    next_consulta: [{
        type: Schema.Types.ObjectId,
        ref: 'Consulta'
    }],
    treatment: [{
        type: Schema.Types.ObjectId,
        ref: 'Tratamiento'
    }],
    comment: [{
        type: String
    }],
    create_Date: {
        type: Date,
        required: true
    },
    delete_Date: {
        type: Date
    }
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
PetSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Pet', PetSchema);
