// fetch est disponible nativement dans le navigateur.

// Repérer le formulaire,
const form = document.getElementById("formMission");

// Construire l'envoi du formulaire
form.addEventListener("submit", async function(event) {
  
  const missionName = document.getElementById("name").value;
// Console.log  
  console.log("missionName (front) :", missionName);
  if (missionName === "") {
    //Empêcher soumission du formulaire par défaut si la mission n'est pas nomée
    event.preventDefault(); // bloquer
    alert("Le nom de la mission doit être indiqué"); // alerter
    return; // stopper
  }
  // Empêcher la soumission par défaut
  event.preventDefault();

  //Récupérer les données du formulaire et construire un objet js
  const formData = new FormData(event.target);
  const objectData = {};
  formData.forEach((value, key) => {
    objectData[key] = value;
// Console.log
    console.log(event.target);
  });

  console.log("Données envoyées au back :", {
  missionName,
  missionStartYear,
  missionEndYear,
  missionObjective,
  missionImageUrl
  });

  //Envoyé l'objet au backend via fetch

  try {
    const res = await fetch("http://localhost:3000/api/missions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objectData),
    });
    // Lire la réponse du backend
    const dataMission = await res.json();
// Console.log
    console.log("Réponse du back :", dataMission);
    if (!res.ok) {
      return alert(
        "La mission n'a pas été créée : " + (dataMission.errorMessage || ""),
      );
    }
    alert("Mission créée avec succès");
    document.getElementById("missionForm").reset();
  } catch (error) {
// Console.log
    console.error("Erreur réseau :", error);
    alert("Erreur : impossible de contacter le serveur.");
  }
});
