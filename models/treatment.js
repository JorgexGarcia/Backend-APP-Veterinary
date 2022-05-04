const {Schema, model} = require('mongoose');

const TreatmentSchema = Schema ({

    startDate: {
        type: Date,
        required: true
    },
    finishDate: {
        type: Date
    },
    description: {
        type: String,
        required: true
    },
    idPet:{
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Pet'
    },
    idUser:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        required: true,
        type: String
    },
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
TreatmentSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Treatment', TreatmentSchema);
