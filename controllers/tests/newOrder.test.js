const { Product } = require("../../database/models");

const axios = require("axios");
const { Op } = require("sequelize");

const API_ENDPOINT = "http://localhost:8000";

describe("newOrder", () => {
    it("should create a new order successfully", async () => {
        const data = { amount: 100, items: [1, 2, 3] }; // Ejemplo de datos para la orden

        // Se setea el stock de los 3 productos en 10
        await Product.update(
            {
                stock: 10,
            },
            {
                where: {
                    [Op.or]: [{ id: 1 }, { id: 2 }, { id: 3 }],
                },
            }
        );

        // Realiza la solicitud al endpoint
        const response = await axios.post(`${API_ENDPOINT}/orders/new`, data);

        expect(response.status).toBe(200);

        //Se valida que el stock se haya descontado de manera correcta
        const products = await Product.findAll();
        console.log(products);
        expect(parseInt(products[0].stock)).toBe(9);
        expect(parseInt(products[1].stock)).toBe(9);
        expect(parseInt(products[2].stock)).toBe(9);
    });

    it("should handle error when product is out of stock", async () => {
        const data = { amount: 100, items: [1, 2, 3] };

        //Se setea el stock en 0
        await Product.update(
            {
                stock: 0,
            },
            {
                where: {
                    id: 1,
                },
            }
        );

        try {
            // Realiza la solicitud al endpoint
            await axios.post(`${API_ENDPOINT}/orders/new`, data);
        } catch (error) {
            // Captura el error y verifica si es el esperado
            expect(error.response.status).toBe(500);
            expect(error.response.data.msg).toBe("Transaction error");
        }
    });

    it("should handle error when more than one product are out of stock", async () => {
        const data = { amount: 100, items: [1, 2, 3] };
        try {
            await Product.update(
                {
                    stock: 0,
                },
                {
                    where: {
                        [Op.or]: [{ id: 1 }, { id: 3 }],
                    },
                }
            );
            await axios.post(`${API_ENDPOINT}/orders/new`, data);
        } catch (error) {
            expect(error.response.status).toBe(500);
            expect(error.response.data.msg).toBe("Transaction error");
        }
    });
});
