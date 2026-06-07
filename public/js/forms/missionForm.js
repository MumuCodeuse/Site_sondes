// fetch est disponible nativement dans le navigateur.

// Repérer le formulaire,
const form = document.getElementById("form-mission");

// Créer la liste des sondes pour associer missions et sondes
// Demander la liste des sondes
async function fetchGetListAllProb() {
  try {
    const getlistOffAllSprobes = await fetch(
      "http://localhost:3000/api/space_probes",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );
    // Parser le tableaux des sondes
    const resFetchGetlistAllSprobes = await getlistOffAllSprobes.json();
    //console.log(resFetchGetlistAllSprobes);

    // Construire un nouveau tableau pour récupérer seulement le nom des sondes et l'id correspondant,
    const NamesIdsProbesOnly = resFetchGetlistAllSprobes.spaceProbes.map(
      (obj) => ({
        spaceProbeId: obj.space_probe_id,
        spaceProbeName: obj.space_probe_name,
      }),
    );
    //console.log(NamesIdsProbesOnly);

    // Contruire la liste en itérant sur le nouveau tableau
    const selectId = document.getElementById("probe-name-select");

    NamesIdsProbesOnly.forEach((item) => {
      const optionsProbes = document.createElement("option"); // Création de balise <option>. Ds le fichier HTML, la balise <option> affiche le texte mais envoie 'value' au back, la balise <select> c'est la liste déroulante et ne peut contenir que des <option>. la partie "textContent" affiche le nom des sondes côté utilisateur.
      optionsProbes.value = item.spaceProbeId;
      optionsProbes.textContent = item.spaceProbeName;

      selectId.appendChild(optionsProbes);
    });
  } catch (error) {
    console.error("Erreur réseau :", error);
    alert("Erreur : impossible d'associer la sonde");
  }
}

// Ajouter autant que necessaire l'enregistrement de sondes
function addAdditionalProbe() {
  const selectOriginal = document.getElementById("probe-name-select"); // selectionner la 1ere balise select
  const selectClone = selectOriginal.cloneNode(true); // cloner la 1ere balise

  selectClone.value = ""; // supprimer le choix déjà fait d'une sonde

  document.querySelector(".mission__containerSelect").appendChild(selectClone); // Permet d'ajouter cette partie d'enregistrement de sonde ds le formulaire
}
document
  .querySelector(".probeMission__onclick")
  .addEventListener("click", addAdditionalProbe); // Ajouter un nouvel enregistrement de sonde qund on clique sur le bouton "ajouter une sonde supplementaire"

// ---------------------------------------------------------------------
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
  const spaceProbeIds = formDataForm.getAll("spaceProbeId"); // Correspond à la balise name de : <select id="probe-name-select" name="spaceProbeId"> et FormData renvoie toujours une string, permet de récupérer toutes les sondes déclarer

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
    spaceProbeIds,
  };

  // console.log("Données envoyées au back :", {
  //   missionName,
  //   missionStartYear,
  //   missionEndYear,
  //   missionObjective,
  //   missionImageUrl,
  //   spaceProbeIds,
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
  console.log("FORM SUBMITTED !");
});

fetchGetListAllProb();
