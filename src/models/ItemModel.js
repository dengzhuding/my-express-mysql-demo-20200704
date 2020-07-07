'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    recordId: {
      type: DataTypes.INTEGER,
      field: 'record_id',
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    state: {
      type: DataTypes.INTEGER,
      field: 'state'
    }
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
