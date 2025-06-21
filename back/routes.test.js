
import request from "supertest";
import app from "./index.js";
import sequelize from "./data/sequelize.js"; 

test("GET /space_probes - Vérifie les sondes", async () => {
  const response = await request(app).get("/api/space_probes");

  expect(response.status).toBe(200); // Vérifie que l'API répond bien
  expect(Array.isArray(response.body)).toBe(true); // Vérifie que la réponse est un tableau
  expect(response.body.length).toBeGreaterThan(0); // Vérifie qu'il y a bien des sondes en base
});

afterAll(async () => {
  await sequelize.close(); // Ferme la connexion Sequelize après les tests
});
