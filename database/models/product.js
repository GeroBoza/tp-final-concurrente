"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsToMany(models.Order, {
                as: "orders",
                through: models.Order_items,
                foreignKey: "productId",
                otherKey: "orderId",
            });
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            price: DataTypes.INTEGER,
            stock: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
