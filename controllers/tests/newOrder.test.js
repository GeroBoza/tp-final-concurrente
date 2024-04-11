const {
    Order,
    Order_items,
    Product,
    sequelize,
} = require("../../database/models"); // Asegúrate de importar correctamente tus modelos y Sequelize

const ordersController = require("../ordersController");

describe("ordersController.newOrder function", () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = {
            body: {
                amount: 100, // Define los datos de prueba aquí
                items: [1, 2, 3], // Define los productos de prueba aquí
            },
        };
        mockRes = {
            status: jest.fn(() => mockRes),
            send: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new order successfully", async () => {
        const mockTransaction = {};
        sequelize.transaction.mockResolvedValueOnce(mockTransaction);
        Order.create.mockResolvedValueOnce({ id: 1 }); // Define el valor de retorno esperado para Order.create

        Product.findByPk.mockResolvedValueOnce({ id: 1, stock: 10 }); // Define el valor de retorno esperado para Product.findByPk

        await ordersController.newOrder(mockReq, mockRes);

        expect(sequelize.transaction).toHaveBeenCalledTimes(1);
        expect(Order.create).toHaveBeenCalledTimes(1);
        expect(Order_items.create).toHaveBeenCalledTimes(
            mockReq.body.items.length
        );
        expect(Product.findByPk).toHaveBeenCalledTimes(
            mockReq.body.items.length
        );
        expect(Product.update).toHaveBeenCalledTimes(mockReq.body.items.length);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith({ msg: "Succeed" });
    });

    it("should handle error when product is out of stock", async () => {
        const mockTransaction = {};
        sequelize.transaction.mockResolvedValueOnce(mockTransaction);
        Order.create.mockResolvedValueOnce({ id: 1 });

        Product.findByPk.mockResolvedValueOnce({ id: 1, stock: 0 }); // Define el valor de retorno esperado para un producto fuera de stock

        await ordersController.newOrder(mockReq, mockRes);

        expect(sequelize.transaction).toHaveBeenCalledTimes(1);
        expect(Order.create).toHaveBeenCalledTimes(1);
        expect(Order_items.create).not.toHaveBeenCalled();
        expect(Product.findByPk).toHaveBeenCalledTimes(1);
        expect(Product.update).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({
            error: new Error("Product out of stock"),
            msg: "Transaction error",
        });
    });

    it("should handle transaction rollback", async () => {
        sequelize.transaction.mockRejectedValueOnce(
            new Error("Transaction error")
        );

        await ordersController.newOrder(mockReq, mockRes);

        expect(sequelize.transaction).toHaveBeenCalledTimes(1);
        expect(Order.create).not.toHaveBeenCalled();
        expect(Order_items.create).not.toHaveBeenCalled();
        expect(Product.findByPk).not.toHaveBeenCalled();
        expect(Product.update).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({
            error: new Error("Transaction error"),
            msg: "Transaction error",
        });
    });
});
