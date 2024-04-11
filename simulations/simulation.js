const axios = require("axios");

function rand(min, max) {
    max = max + 1;
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomArrayOfProductsId() {
    const array = [];
    const maxElements = 3;

    for (let i = 0; i < maxElements; i++) {
        // Generar un número aleatorio del 1 al 1000
        const randomNumber = Math.floor(Math.random() * 1000) + 1;
        // Agregar el número aleatorio al array
        array.push(randomNumber);
    }

    return array;
}

async function runSimulation(port) {
    while (true) {
        console.log("Running simulation");
        await new Promise((resolve) => setTimeout(resolve, rand(1_000, 5_000)));

        const data = {
            amount: rand(1000, 25000),
            items: [1, 2, 3],
        };

        try {
            const res = await axios.post(
                `http://localhost:${port}/orders/new`,
                data
            );
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = runSimulation;
