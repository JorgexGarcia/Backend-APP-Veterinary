const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({

    name: {
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    foto: {
        type: String
    },
    rol: {
        type: String,
        default: 'USER_ROLE'
    },
    auth: {
        type: String,
        default: 'EMAIL'
    },
    list_pets: [{
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    }],
    birth_date: {
        type: Date,
        required: true
    },
    dni:{
        type: String,
        required: true,
        unique: true
    },
    phone: [{
        type: String,
        required: true
    }],
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    comment: [{
        type: String
    }],
    promociones: [{
        type: Schema.Types.ObjectId,
        ref: 'Promocion'
    }],
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
UsuarioSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Usuario', UsuarioSchema);
