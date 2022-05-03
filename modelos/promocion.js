const {Schema, model} = require('mongoose');

const PromocionSchema = Schema ({

    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    img: {
        type: String
    },
    start_date: {
        type: Date,
        required: true
    },
    finish_date: {
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
}, {
    collection: 'promociones'
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
PromocionSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Promocion', PromocionSchema);
