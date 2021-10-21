'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Item.belongsToMany(models.User, {through: 'cart', foreignKey: 'itemId'})
      models.Item.belongsTo(models.Shop, {foreignKey: "shopId"});
    }
  };
  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    store: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};