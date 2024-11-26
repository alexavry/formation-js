const tab1 = [0,1,2,3,4,5,6,7,8,9,10,11]
const tab2 = [...tab1, ...tab1]
console.log(tab1)
console.log(tab2)

function melanger(tab) {
    let tab2 = [];
    for (let i = 0; i < tab.length; i++) {
      do {
        x = Math.floor(Math.random() * tab.length);
      } while (tab2[x] != undefined);
      tab2[x]= tab[i];
    }
    
    return tab2;
  }

console.log(melanger(tab2))