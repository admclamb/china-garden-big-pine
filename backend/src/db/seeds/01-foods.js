const FOODS_DATA = require('./01-foods.json');
exports.seed = function (knex) {
  console.log(FOODS_DATA);
  return knex
    .raw('TRUNCATE TABLE foods RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('foods').insert(FOODS_DATA);
    });
};
