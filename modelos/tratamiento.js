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
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    name: {
        required: true,
        type: String
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
TratamientoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Tratamiento', TratamientoSchema);
