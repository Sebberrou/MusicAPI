'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Songs', {
       title: {
          type: DataTypes.STRING,
          validate: {notEmpty: {msg: "-> Missing title"}}
       },
       album: {
           type: DataTypes.STRING,
           validate: {notEmpty: {msg: "-> Missing album"}}
       },
       artist: {
           type: DataTypes.STRING,
           validate: {notEmpty: {msg: "-> Missing artist"}}
       },
       year: { type: DataTypes.INTEGER },
       bpm: { type: DataTypes.INTEGER }
   });
};
