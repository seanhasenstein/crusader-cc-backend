const Student = require('./student.model');

const student = (_, args) => {
  const student = Student.findById(args.id)
    .lean()
    .exec();
  return student;
};

const students = () => {
  const students = Student.find({})
    .lean()
    .exec();
  return students;
};

const newStudent = (_, args) => {
  const { firstName, lastName } = args.input;
  const student = Student.create({ firstName, lastName });
  return student;
};

const updateStudent = async (_, args) => {
  const update = args.input;
  const student = await Student.findByIdAndUpdate(args.id, update, {
    new: true
  })
    .lean()
    .exec();
  return student;
};

const removeStudent = (_, args) => {
  return Student.findByIdAndRemove(args.id)
    .lean()
    .exec();
};

module.exports = {
  Query: {
    student,
    students
  },
  Mutation: {
    newStudent,
    updateStudent,
    removeStudent
  },
  Student: {
    id(student) {
      return `${student._id}`;
    }
  }
};
