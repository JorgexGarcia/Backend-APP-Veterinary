const {Schema, model} = require('mongoose');

const UserSchema = Schema ({

    name: {
        type: String,
        required: true
    },
    lastName:{
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
    img: {
        imgId: {type: String},
        url: {type: String}
    },
    rol: {
        type: String,
        default: 'USER_ROLE'
    },
    auth: {
        type: String,
        default: 'EMAIL'
    },
    listPets: [{
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    }],
    birthDate: {
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
    promotions: [{
        type: Schema.Types.ObjectId,
        ref: 'Promotion'
    }],
    active: {
        type: Boolean,
        default: true,
    },
    deleteDate: {
        type: Date
    },
    deleteUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deleteReason: {
        type: String
    }
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
UserSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('User', UserSchema);
