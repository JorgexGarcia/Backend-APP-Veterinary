const {Schema, model} = require('mongoose');

const ConsultaSchema = Schema ({

    type: {
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
    reports: [{
        type_report: {type: String},
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
ConsultaSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Consulta', ConsultaSchema);
