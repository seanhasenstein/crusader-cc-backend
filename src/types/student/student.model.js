const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		claimedFreeShirt: {
			type: Boolean,
			required: true,
			default: false
		}
	}
);

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
