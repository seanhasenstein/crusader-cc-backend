const Season = require('./season.model');

const season = async (_, args) => {
  return await Season.findById(args.id)
    .lean()
    .exec();
};

const seasons = async () => {
  return await Season.find({})
    .lean()
    .exec();
};

const newSeason = async (_, args) => {
  const { sport, year, studentAthletes, isActive } = args.input;
  return await Season.create({
    sport,
    year,
    studentAthletes,
    isActive
  });
};

const updateSeason = async (_, args) => {
  const update = args.input;
  return await Season.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec();
};

const removeSeason = async (_, { id }) => {
  return await Season.findByIdAndRemove(id)
    .lean()
    .exec();
};

module.exports = {
  Query: {
    season,
    seasons
  },
  Mutation: {
    newSeason,
    updateSeason,
    removeSeason
  }
};
