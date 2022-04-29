const {Schema, model} = require('mongoose');

const ConsejoSchema = Schema ({

    description:{
        type: String,
        required: true
    },
    foto: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    id_user:{
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
ConsejoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Consejo', ConsejoSchema);
