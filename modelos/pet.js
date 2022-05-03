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
        type: Boolean
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
    race: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Raza'
    },
    type: {
        type: String,
        required: true
    },
    queries: [{
        type: Schema.Types.ObjectId,
        ref: 'Consulta'
    }],
    next_queries: [{
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
    active: {
        type: Boolean,
        default: true,
    },
    delete_date: {
        type: Date
    },
    delete_user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    delete_reason: {
        type: String
    }
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
PetSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Pet', PetSchema);
