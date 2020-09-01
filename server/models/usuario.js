const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        require: [true, 'La constraseña es obligatoria']
    },
    img: {
        type: String,
        require: false
    }, //No es obligatoria
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }, //default: 'USER_ROLE'
    estado: {
        type: Boolean,
        default: true
    }, //Boolean
    google: {
        type: Boolean,
        default: false
    } //Boolean
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })


module.exports = mongoose.model('Usuario', usuarioSchema);