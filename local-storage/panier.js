let fruits = []
const sauvegarde = () =>{
    localStorage.setItem('fruits', JSON.stringify(fruits))
}
const afficher = () =>{
    const tableau = document.getElementById("myTbody")
    tableau.innerHTML = ''
    for (let fruit of fruits){
        const template = document.getElementById('templateTr')
        const nouveau = template.content.cloneNode(true);
        let td = nouveau.querySelector("td");
        td.innerHTML = fruit;
        let supr = nouveau.querySelector("button")
        supr.onclick = (event) => {
            if (confirm("Voulez vous supprimer : " + fruit + " ?")) {
             const indice =  event.target.closest("tr").rowIndex -1
             fruits.splice(indice,1)
             sauvegarde()
             afficher()
            }
        };
        tableau.appendChild(nouveau);
    }
}
document.getElementById("btnAjouter").onclick = () => {
    let fruit = document.getElementById("fruit").value;
    document.getElementById("fruit").value = "";
    fruits.push(fruit);
    sauvegarde();
    afficher();
  };
const data = localStorage.getItem('fruits');
if (data){
  fruits= JSON.parse(data);
  afficher();
}