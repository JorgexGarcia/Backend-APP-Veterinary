const {Schema, model} = require('mongoose');

const BreedSchema = Schema ({

    name: {
        type: String,
        required: true
    },
    problems: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    features: {
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
BreedSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Breed', BreedSchema);
