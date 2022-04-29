const {Schema, model} = require('mongoose');

const RazaSchema = Schema ({

    nombre: {
        type: String,
        required: true
    },
    problems: [{
        type: String
    }],
    tipo: {
        type: String,
        required: true
    },
    features: [{
        type: String
    }]

});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
RazaSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Raza', RazaSchema);
