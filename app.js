if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
  .then((enregistrement) => {
    console.log("Enregistrement réussi");
  }).catch((erreur) => {
    console.log(`Erreur : ${erreur}`);
  })
}
