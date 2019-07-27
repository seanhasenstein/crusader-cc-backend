const mongoose = require('mongoose');
const resolvers = require('../season.resolvers');
const Season = require('../season.model');

describe.only('Season Resolvers', () => {
  test('season query gets one by id in args', async () => {
    const season = await Season.create({
      sport: 'Cross Country',
      year: '2019',
      studentAthletes: ['a', 'b', 'c'],
      isActive: true
    });

    const args = { id: season._id };

    const result = await resolvers.Query.season(null, args);

    expect(`${result._id}`).toBe(`${season._id}`);
  });

  test('seasons query gets all seasons', async () => {
    const season = await Season.create([
      {
        sport: 'Cross Country',
        year: '2019',
        studentAthletes: ['a', 'b', 'c'],
        isActive: true
      },
      {
        sport: 'Track & Field',
        year: '2018',
        studentAthletes: ['a', 'b', 'c'],
        isActive: false
      }
    ]);

    const result = await resolvers.Query.seasons();

    expect(result.length).toBe(2);
  });

  test('newSeason creates a new season', async () => {
    const args = {
      input: {
        sport: 'Cross Country',
        year: '2019',
        studentAthletes: ['a', 'b', 'c'],
        isActive: true
      }
    };

    const result = await resolvers.Mutation.newSeason(null, args);

    Object.keys(args.input).forEach(field => {
      expect(`${result[field]}`).toBe(`${args.input[field]}`);
    });
  });

  test('updateSeason updates existing season from args', async () => {
    const season = await Season.create({
      sport: 'Cross Country',
      year: '2019',
      studentAthletes: ['a', 'b', 'c'],
      isActive: true
    });

    const args = {
      id: season._id,
      input: { isActive: false }
    };

    const result = await resolvers.Mutation.updateSeason(null, args);

    expect(`${result._id}`).toBe(`${season._id}`);
    expect(result.isActive).toBe(false);
  });

  test('removeSeason removes existing season from args', async () => {
    const season = await Season.create({
      sport: 'Cross Country',
      year: '2019',
      studentAthletes: ['a', 'b', 'c'],
      isActive: true
    });

    const args = {
      id: season._id
    };

    const result = await resolvers.Mutation.removeSeason(null, args);

    expect(`${result._id}`).toBe(`${args.id}`);
  });
});
