const {Schema, model} = require('mongoose');

const AidSchema = Schema ({

    description:{
        type: String,
        required: true
    },
    img: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    idUser:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
AidSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Aid', AidSchema);
