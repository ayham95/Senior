const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new error('password cannot contain "password"')
            }
        }  
    },
   email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new error('email is invalid')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new error('age must be a positive number')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

userSchema.methods.generateAuthToken= async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() },'seniorproject')

    user.tokens=user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({ email:email })

    if(!user){
        throw new Error('unable to ligin!')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('unable to login!')
    }

    return user
}

//hash the password before saving
userSchema.pre('save', async function (next){
    const user=this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }

    next()
})

const User=mongoose.model('User',userSchema)

module.exports=User