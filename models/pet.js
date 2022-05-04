const {Schema, model} = require('mongoose');

const PetSchema = Schema ({

    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    birthDate: {
        type: Date,
        required: true
    },
    chip:{
        type: String,
        unique: true
    },
    passport:{
        type: String,
        unique: true
    },
    idUser:{
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sex: {
        required: true,
        type: String,
    },
    sterilized: {
        required: true,
        type: Boolean
    },
    color:{
        type: String,
        required: true
    },
    chronic: [{
        type: String
    }],
    weight: [{
        type: Number
    }],
    race: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Breed'
    },
    type: {
        type: String,
        required: true
    },
    queries: [{
        type: Schema.Types.ObjectId,
        ref: 'Queries'
    }],
    nextQueries: [{
        type: Schema.Types.ObjectId,
        ref: 'Queries'
    }],
    treatment: [{
        type: Schema.Types.ObjectId,
        ref: 'Treatment'
    }],
    comment: [{
        type: String
    }],
    createDate: {
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
PetSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Pet', PetSchema);
