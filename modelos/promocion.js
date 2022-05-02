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
    }
}, {
    collection: 'Promociones'
});

//Para cambiar el nombre a un atributo o no visualizar uno que no quieres
PromocionSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Promocion', PromocionSchema);
