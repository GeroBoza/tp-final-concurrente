const {
    sequelize,
    Order,
    Order_items,
    Product,
} = require("../database/models");

const controller = {
    getAllOrders: async (req, res) => {
        const orders = await Order.findAll({
            include: ["items"],
        });

        res.send(orders);
    },

    newOrder: async (req, res) => {
        let transaction;
        try {
            transaction = await sequelize.transaction();

            const data = req.body;
            const newOrder = await Order.create(
                {
                    status: "finished",
                    amount: data.amount,
                },
                { transaction: transaction }
            );

            for (const item of data.items) {
                await Order_items.create(
                    {
                        quantity: 1,
                        productId: item,
                        orderId: newOrder.id,
                    },
                    { transaction: transaction }
                );

                const product = await Product.findByPk(item, {
                    transaction: transaction,
                });

                if (product.stock > 0) {
                    await Product.update(
                        { stock: product.stock - 1 },
                        { where: { id: product.id }, transaction: transaction }
                    );
                } else {
                    throw new Error("Product out of stock");
                }
            }

            await transaction.commit();
            res.status(200).send({ msg: "Succeed" });
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            res.status(500).send({ error, msg: "Transaction error" });
        }
    },
};

module.exports = controller;
