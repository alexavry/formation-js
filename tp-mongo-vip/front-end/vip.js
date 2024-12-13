const apiUrl = "http://localhost:3000";
const template = document.getElementById("templateTr");
const tbody = document.querySelector("#myTbody");

async function chargInvites() {
  tbody.innerHTML = "";

  const response = await fetch(`${apiUrl}/invites`);
  const invites = await response.json();
  console.log("Données reçues :", invites);

  if (invites.length === 0) {
    return;
  }
  invites.forEach((invite) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".td1").textContent = invite.nom;
    clone.querySelector(".td2").textContent = invite.prenom;

    const row = clone.querySelector("tr");
    row.classList.remove("table-success", "table-danger"); 
    row.classList.add(invite.pres ? "table-success" : "table-danger"); 

    clone.querySelector(".btn-danger").addEventListener("click", function () {
        deleteInvite(invite._id); 
        delrow(this);
    });
    clone.querySelector(".btn-warning").addEventListener("click", async () => {
        try {
            const response = await fetch(`${apiUrl}/modifier-invite/${invite._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pres: !invite.pres }), 
            });
            chargInvites(); 
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'invité ");
        }
    });

    tbody.appendChild(clone);
  });
}
async function deleteInvite(id) {
  const response = await fetch(`${apiUrl}/delete-invite/${id}`, {
    method: "DELETE",
  });
  chargInvites();
}
async function addInvite() {
  const prenom = document.getElementById("prenom").value.trim();
  const nom = document.getElementById("nom").value.trim();
  const response = await fetch(`${apiUrl}/add-invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prenom, nom }),
  });
  document.getElementById("prenom").value = "";
  document.getElementById("nom").value = "";
  chargInvites();

}
function delrow(element) {
  const ligne = element.closest("tr"); 
  if (ligne) {
    ligne.remove();
  }
}

document.getElementById("btnAjouter").addEventListener("click", addInvite);
chargInvites();
