const {Schema, model} = require('mongoose');

const TratamientoSchema = Schema ({

    start_date: {
        type: Date,
        required: true
    },
    finish_date: {
        type: Date
    },
    description: {
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
    nombre: {
        required: true,
        type: String
    }
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
TratamientoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Tratamiento', TratamientoSchema);
