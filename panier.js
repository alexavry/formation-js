document.getElementById("btnAjouter").onclick = () => {
    const myTbody = document.getElementById('myTbody');
    const fruit = document.getElementById('fruit').value;
    document.getElementById('fruit').value='';
    const uno = document.createElement('tr');
    const dos = document.createElement('td');
    dos.innerHTML=fruit;
    uno.append(dos);

    const td2 = document.createElement('td');
    const button = document.createElement('button');
    button.classList.add('btn','btn-danger');
    const i = document.createElement('i');
   
    i.classList.add('fa','fa-trash');
    button.appendChild(i);
    button.onclick=(event)=>{
        event.target.closest('tr').remove();
    }
    td2.appendChild(button);
    tr.appendChild(td2);
    
    myTbody.appendChild(tr);  
    
  };