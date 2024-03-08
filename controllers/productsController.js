const controller = {
    getAllProducts: async (req, res) => {
        const products = await Product.findAll({
            include: ["orders"],
        });

        res.send(products);
    },
};

module.exports = controller;
