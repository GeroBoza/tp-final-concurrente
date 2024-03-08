"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsToMany(models.Product, {
                as: "products",
                through: models.Order_items,
                foreignKey: "orderId",
                otherKey: "productId",
            });
            Order.hasMany(models.Order_items, {
                as: "items",
                foreignKey: "orderId",
            });
        }
    }
    Order.init(
        {
            status: {
                type: DataTypes.STRING,
                defaultValue: "failed",
            },
            amount: DataTypes.DECIMAL,
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
