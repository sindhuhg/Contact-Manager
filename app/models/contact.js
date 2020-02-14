const mongoose = require('mongoose')
const validator= require('validator')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    name: {
        type: String, 
        required: true 
    },
    email: {
        type: String ,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return 'invalid email format'
            }
        }
    }, 
    mobile: {
        type: String, 
        required: true,
        minlength: 10, 
        maxlength: 10,
        validate:{
            validator:function(value){
            return validator.isNumeric(value)
        },
        message:function(){
            return 'invalid number format'
        }
    }
    }, 
    category: {
        type: String,
        required: true, 
        enum: ['work', 'home']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact