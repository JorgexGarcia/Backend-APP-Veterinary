const {Schema, model} = require('mongoose');

const RazaSchema = Schema ({

    name: {
        type: String,
        required: true
    },
    problems: [{
        type: String
    }],
    type: {
        type: String,
        required: true
    },
    features: [{
        type: String
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
RazaSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Raza', RazaSchema);
