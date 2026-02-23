/*
  Envoyer à LanguageTool
  Reconstruire le texte corrigé
  Afficher dans correctionZone
  Appliquer la correction dans le textarea
  Soumettre le formulaire normalement
*/

const spellingCheckButton = document.getElementById("button-verif-orthographe");

spellingCheckButton.addEventListener("click", async function (event) {
  event.preventDefault();

  // Récupérer le texte saisi dans la description de l'objectif
  const objectiveText = document.getElementById("objective").value;

  if (objectiveText) {
    // Afficher dans correction le message : analyse en cours
    document.getElementById("correctionZone").textContent = "Analyse en cours…";
  } else {
    alert("Compléter l'objectif de la mission");
    return;
  }

  try {
    // -------- 1er passage --------
    const response1 = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: objectiveText,
        language: "fr",
        enabledOnly: "picky",
        enabledCategories: "GRAMMAR,TYPOGRAPHY,CONFUSED_WORDS",
      }),
    });

    const result1 = await response1.json();
    console.log("1er passage :", result1);

    // Appliquer les corrections du 1er passage
    let correctedText = applyCorrections(objectiveText, result1);

    // -------- 2e passage --------
    const response2 = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: correctedText,
        language: "fr",
        enabledOnly: "picky",
        enabledCategories: "GRAMMAR,TYPOGRAPHY,CONFUSED_WORDS",
      }),
    });

    const result2 = await response2.json();
    console.log("2e passage :", result2);

    // Appliquer les corrections du 2e passage
    correctedText = applyCorrections(correctedText, result2);

    // Afficher le texte corrigé
    document.getElementById("correctionZone").textContent = correctedText;
  } catch (error) {
    console.error("Erreur API :", error);
    document.getElementById("correctionZone").textContent =
      "Erreur lors de l'analyse.";
  }
});
function applyCorrections(originalText, result) {
  let text = originalText;

  if (!result.matches || result.matches.length === 0) {
    return text;
  }

  // On applique les corrections en partant de la fin
  const matches = result.matches.sort((a, b) => b.offset - a.offset);

  for (const match of matches) {
    if (!match.replacements || match.replacements.length === 0) continue;

    const suggestion = match.replacements[0].value;

    text =
      text.slice(0, match.offset) +
      suggestion +
      text.slice(match.offset + match.length);
  }

  return text;
}


