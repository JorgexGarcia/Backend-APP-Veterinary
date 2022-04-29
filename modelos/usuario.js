const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({

    nombre: {
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
        type: 'USER_ROLE' | 'ADMIN_ROLE' | 'BOSS_ROLE' | 'DOCTOR_ROLE',
        required: true,
        default: 'USER_ROLE'
    },
    auth: {
        type: 'EMAIL' | 'GOOGLE',
        default: 'EMAIL',
        required: true
    },
    list_animal: [{
        id: {required:true,
            type: Schema.Types.ObjectId,
            ref: 'Pet'}
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
        type: String,
        required: true
    }],
    promociones: [{
        id: {required:true,
            type: Schema.Types.ObjectId,
            ref: 'Promocion'}
    }]
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
UsuarioSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Usuario', UsuarioSchema);
