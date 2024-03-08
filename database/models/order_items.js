"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order_items extends Model {
        static associate(models) {
            Order_items.belongsTo(models.Order, {
                as: "order",
                foreignKey: "orderId",
            });
        }
    }
    Order_items.init(
        {
            quantity: DataTypes.INTEGER,
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Order",
                    key: "id",
                },
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Product",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "Order_items",
        }
    );
    return Order_items;
};
