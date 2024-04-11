const runSimulation = require("./simulation");

// Puerto donde se ejecuta la aplicación Express
const port = process.env.PORT || 8000;

// Número de instancias de simulación con la que se desea ejecutar concurrentemente
const numInstances = 2;

// Ejecución de múltiples instancias de la simulación de manera concurrente
const runSimulations = async () => {
    const simulationPromises = Array.from({ length: numInstances }, () =>
        runSimulation(port)
    );

    try {
        await Promise.all(simulationPromises);
        console.log("Simulation finished");
    } catch (error) {
        console.error("Simulation failed:", error);
    }
};

// Llamado a la función para ejecutar las simulaciones
runSimulations();
