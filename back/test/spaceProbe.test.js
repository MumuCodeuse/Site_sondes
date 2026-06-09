import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import app from "../app.js"; 

import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

// Déclarer un test, Appeler la route, vérifier la réponse
// Se positionner dans le terminal, sans avoir express de lancé et taper "npm test". Le raccourci sur la ligne 14 ne fonctionne pas.


it('POST /firstLogin doit renvoyer un token', async () => {
  const res = await request(app)
    .post('/api/firstLogin')
    .send({
      emailForm: "m.libellule@gmail.fr",
      temporaryPassword: "Casimir, l'île aux enfants"
    });

    // revoir la sécurité : mot de passe en dur dans le test.
  console.log(res.status, res.body);
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.token).toBeDefined();

  const decoded = jwt.decode(res.body.token);
  expect(decoded.emailAdmin).toBe("m.libellule@gmail.fr");
});


// describe('API sondes spatiales', () => {
//   it('GET /space_probes doit retourner un tableau', async () => {
//     const res = await request(app).get('/api/space_probes');
//     console.log(res.body);
//     expect(res.status).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });
// });
// -----------
// it('POST /space_probes doit créer une sonde', async () => {
//   const res = await request(app)
//     .post('/space_probes')
//     .send({ name: 'Voyager 1', launchDate: '1977-09-05' });
//    console.log(res.body);
//   expect(res.status).toBe(201);
//   expect(res.body.name).toBe('Voyager 1');
// });
// ------------
//   it('PUT /space_probes/:id doit mettre à jour une sonde', async () => {
//     const res = await request(app)
//       .put('/space_probes/1')
//       .send({ name: 'Voyager 1 Updated' });
//     expect(res.status).toBe(200);
//     expect(res.body.name).toBe('Voyager 1 Updated');
//   });

// -----------
// it('POST /api/space_probe doit créer Cassini-Huygens', async () => {
//   const newProbe = {
//     space_probe_name: 'Cassini-Huygens',
//     space_probe_year_launch: 1997,
//     space_probe_launcher: 'Titan IVB/Centaur',
//     space_probe_objective: 'Étudier Saturne et ses lunes',
//     space_probe_comment: 'Mission conjointe NASA/ESA/ASI',
//     space_probe_operating_state: 'Terminée',
//     space_probe_means_propulsion_energy: 'Énergie nucléaire (RTG)',
//     space_probe_image_url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Cassini_spacecraft_model.png'
//   };

//   const res = await request(app)
//     .post('/api/space_probe')
//     .send(newProbe);

//   expect(res.status).toBe(201);
//   expect(res.body).toHaveProperty('space_probe_id');
//   expect(res.body.space_probe_name).toBe('Cassini-Huygens');
// });
// -------------

// describe("API sondes spatiales - suppression", () => {
//   it("DELETE /api/space_probe/:id doit supprimer une sonde existante", async () => {
//     // ⚡ Choisis un ID de sonde déjà présent en base
//     const probeId = 11; // par exemple, remplace par l'ID réel

//     const res = await request(app).delete(`/api/space_probe/${probeId}`);

//     // Vérifie que la suppression est OK
//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty("message");
//     expect(res.body.message).toMatch(/supprimée/i);
//   });

  /*it('DELETE /api/space_probe/:id doit renvoyer 404 si la sonde n’existe pas', async () => {
    const res = await request(app)
      .delete('/api/space_probe/99999'); // ID inexistant

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/introuvable/i);
});
*/
//});
