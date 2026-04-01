// fetch est disponible nativement dans le navigateur.

// Repérer le formulaire,
const form = document.getElementById("formMission");

// Construire l'envoi du formulaire
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formDataForm = new FormData(form);

  // Récupérer les clés/valeurs de chaque input
  const missionName = formDataForm.get("missionName");
  const missionStartYear = formDataForm.get("missionStartYear");
  const missionEndYear = formDataForm.get("missionEndYear");
  const missionObjective = formDataForm.get("missionObjective");
  const missionImageUrl = formDataForm.get("missionImageUrl");

  // console.log("missionName (front) :", missionName);
  if (missionName.length === 0) {
    //Empêcher soumission du formulaire par défaut si la mission n'est pas nommée
    event.preventDefault();
    alert("Le nom de la mission doit être indiqué"); // alerter
    return; // stopper
  }

  // Construction de l'objet envoyé au backend
  const missionData = {
    missionName,
    missionStartYear,
    missionEndYear,
    missionObjective,
    missionImageUrl,
  };

  // console.log("Données envoyées au back :", {
  //   missionName,
  //   missionStartYear,
  //   missionEndYear,
  //   missionObjective,
  //   missionImageUrl,
  // });

  //Envoyé l'objet au backend via fetch
  try {
    const res = await fetch("http://localhost:3000/api/missions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(missionData),
    });
    // Lire la réponse du backend

    const resFetchDataMission = await res.json();
    // Console.log
    console.log("Réponse du back :", resFetchDataMission);
    if (!res.ok) {
      return alert(
        "La mission n'a pas été créée : " +
          (resFetchDataMission.errorMessage || ""),
      );
    }
    alert("Mission créée avec succès");
    form.reset();
  } catch (error) {
    // Console.log
    console.error("Erreur réseau :", error);
    alert("Erreur : impossible de contacter le serveur.");
  }
});
