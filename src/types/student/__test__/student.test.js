const mongoose = require('mongoose');
const resolvers = require('../student.resolvers');
const Student = require('../student.model');

describe('Student Resolvers', () => {
  test('Student query gets on by id in args', async () => {
    const id = mongoose.Types.ObjectId();
    const student = await Student.create({
      id,
      firstName: 'Sean',
      lastName: 'Hasenstein'
    });

    const result = await resolvers.Query.student(null, { id: student._id });
    expect(`${result._id}`).toBe(`${student._id}`);
    expect(result.firstName).toBe(student.firstName);
    expect(result.lastName).toBe(student.lastName);
    expect(result.claimedFreeShirt).toBe(false);
  });

  test('Students query gets all students', async () => {
    const students = await Student.create([
      {
        id: mongoose.Types.ObjectId,
        firstName: 'Jonah',
        lastName: 'Jurss'
      },
      {
        id: mongoose.Types.ObjectId,
        firstName: 'Matt',
        lastName: 'Witte'
      },
      {
        id: mongoose.Types.ObjectId,
        firstName: 'Hans',
        lastName: 'Gruben'
      },
      {
        id: mongoose.Types.ObjectId,
        firstName: 'Dominic',
        lastName: 'Wiladsen'
      }
    ]);

    const result = await resolvers.Query.students();
    expect(result).toHaveLength(4);
  });

  test('NewStudent creates a new student from args', async () => {
    const args = {
      input: {
        firstName: 'Sean',
        lastName: 'Hasenstein'
      }
    };

    const result = await resolvers.Mutation.newStudent(null, args);
    const newStudent = await Student.findById(result.id)
      .lean()
      .exec();

    Object.keys(args.input).forEach(field => {
      expect(newStudent[field]).toEqual(args.input[field]);
    });
  });

  test('UpdateStudent updates existing student from args', async () => {
    const student = await Student.create({
      firstName: 'Sean',
      lastName: 'Hasenstein'
    });

    const args = {
      id: student._id,
      input: { claimedFreeShirt: true }
    };

    const result = await resolvers.Mutation.updateStudent(null, args);

    expect(`${result._id}`).toBe(`${student._id}`);
    expect(result.claimedFreeShirt).toBe(true);
  });

  test('RemoveStudent removes existing student from args', async () => {
    const student = await Student.create({
      firstName: 'Sean',
      lastName: 'Hasenstein'
    });

    const args = {
      id: student._id
    };

    const result = await resolvers.Mutation.removeStudent(null, args);
    const students = await resolvers.Query.students();

    expect(`${result._id}`).toBe(`${student._id}`);
    expect(students).toHaveLength(0);
  });
});
