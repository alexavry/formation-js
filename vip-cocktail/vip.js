const personne ={
    prenom:'Brad',
    nom:'PITT',
    status:true
}
let personnes = []

const sauvegarde = () =>{
    localStorage.setItem('personnes', JSON.stringify(personnes))
}
const afficher = () => {
    const liste = document.getElementById("myTbody")
    liste.innerHTML = ""
    personnes.forEach((personne, index) => {
      const template = document.getElementById("templateTr")
      const clone = template.content.cloneNode(true)
  
      const tdPrenom = clone.querySelector(".td1")
      tdPrenom.textContent = personne.prenom
  
      const tdNom = clone.querySelector(".td2")

      tdNom.textContent = personne.nom;
      const btnSupprimer = clone.querySelector(".btn-danger")
      btnSupprimer.onclick = () => {
        if (confirm(`Voulez-vous supprimer : ${personne.prenom} ${personne.nom} ?`)) {
          personnes.splice(index, 1)
          sauvegarde()
          afficher()
        }
      }
      const btnModifier = clone.querySelector(".btn-warning")
      const invite = clone.querySelector("tr")
      btnModifier.onclick = () => {
        personne.status = !personne.status
        invite.classList.toggle("table-success", personne.status)
        invite.classList.toggle("table-danger", !personne.status)
        sauvegarde()
      }
      liste.appendChild(clone)
    })
  }

document.getElementById("btnAjouter").onclick = () => {
    let personne = {}
    personne.nom = document.getElementById("nom").value
    document.getElementById("nom").value = ""
    personne.prenom = document.getElementById("prenom").value
    document.getElementById("prenom").value = ""
    personne.status = false
    personnes.push(personne)
    sauvegarde()
    afficher()
}

const data = localStorage.getItem('personnes')
if (data){
  personnes= JSON.parse(data)
  afficher()
}