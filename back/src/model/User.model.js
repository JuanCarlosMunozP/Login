import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName: {
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique: [true,'email already exists'],
        lowercase:true,
        trim:true,
        maxlength: [100,'Email cannot exceed 100 characters'],
        minlength: [5,'Email must be at least 5 characters'],
    },
    password:{
        type:String,
        required:[true,'password already exists'],
        trim:true,
        validate: [
            {
                validator: function(password) {
                    return password.length >= 8;
                },
                message: 'Password must be at least characters long'
            },
            {
                validator:function(password) {
                    return /(?=.*[a-z])(?=.[A-Z])(?=.*\d)/.test(password);
                },
                message: 'Password must contain at least one lowercase letter, one uppercase letter and one number.'
            }
        ]
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin','superadmin'],
    }
},{
    timestamps:true
})

export default mongoose.model('User',UserSchema);
