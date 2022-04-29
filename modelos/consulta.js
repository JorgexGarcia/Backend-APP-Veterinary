const {Schema, model} = require('mongoose');

const ConsultaSchema = Schema ({

    tipo: {
        type: String,
        required: true
    },
    id_pet:{
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    },
    id_user:{
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    description: {
        type: String,
        required: true
    },
    informes: [{
        tipo: String,
        url: {type: String, required: true}
    }],
    service: {
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    first_observation: {
        type: String
    },
    tests: {
        type: String
    },
    treatment: [{
        type: Schema.Types.ObjectId,
        ref: 'Tratamiento'
    }],
    diagnostic: {
        type: String
    },
    finish: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true
    }
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
ConsultaSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Consulta', ConsultaSchema);
