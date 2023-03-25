const mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');


const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['super-admin','admin','user'],
        default: 'user' 
    },
    status: {
        type: String,
        enum: ['active', 'deactive'],
        default: 'active'
    },
    mobileNo:{ type:String },
});



userSchema.pre('save', function(next){

	var user = this;
	var SALT_FACTOR = 5;

	if(!user.isModified('password')){
		return next();
	}

	bcrypt.genSalt(SALT_FACTOR, function(err, salt){

		if(err){
			return next(err);
		}

		bcrypt.hash(user.password, salt, function(err, hash){

			if(err){
				return next(err);
			}

			user.password = hash;
			next();

		});

	});

});

userSchema.methods.comparePassword = function(passwordAttempt, cb){

	bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){

		if(err){
			return cb(err);
		} else {
			cb(null, isMatch);
		}
	});

}

module.exports = mongoose.model('user', userSchema);
