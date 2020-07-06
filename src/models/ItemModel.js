'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    title: DataTypes.STRING
  });
  // 关联表
  // Item.associate = function (models) {
  //   models.Item.belongsTo(models.User, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Item;
};
