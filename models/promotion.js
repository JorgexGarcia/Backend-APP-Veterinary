const {Schema, model} = require('mongoose');

const PromotionSchema = Schema ({

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
    startDate: {
        type: Date,
        required: true
    },
    finishDate: {
        type: Date,
        required: true
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
PromotionSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Promotion', PromotionSchema);
