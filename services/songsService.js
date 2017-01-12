'use strict'
const db = require('../database');
exports.find = (query = {}) => {
  return db.Songs.findAll({
       where: query
   });
};
exports.create = (song) => {
   const model = db.Songs.build(song);
   return model.validate()
       .then(err => {
          if (err) {
              return Promise.reject(err);
          }
          return model.save();
      });
};
exports.update = (song) => {
   const model = db.Songs.build(song);
   return model.validate()
       .then(err => {
          if (err) {
              return Promise.reject(err);
          }
          return model.save();
      });
};
exports.findByArtist = (query = {}) => {
  return db.Songs.findAll({
       where: {
         artist : query.name
       }

   });
};
exports.delete = (query = {}) => {
  return db.Songs.destroy({
       where: {
         id : query.id
       }

   });
};
exports.deleteAll = () => {
  return db.Songs.destroy({
       where: {
         id : query.id
       }

   });
};
