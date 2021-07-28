
let googleUser;
let googleUserName

function deleteNote(){
    getNotes(user.uid);
    firebase.database().ref('users/' + userId).remove();
}

window.onload = (event)=>{
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            googleUser = user;
            googleUserName = googleUser.displayName
            getNotes(user.uid)
        }
    })
}

function getNotes(userID){
  console.log(userID);
  const notesRef = firebase.database().ref('users/' + userID);
  notesRef.on("value", (db) =>{
      const data = db.val();
      renderData(data)
      console.log(data)
  })
}


function renderData(data){
     let html = ''
    for(const dataKey in data){
        const note = data[dataKey];
        const cardhtml = renderCard(note);
        html += cardhtml;    

    }

    document.querySelector("#app").innerHTML = html
}

function generateRandomColor(){
    return Math.floor(Math.random() * 225) + 1
}

function renderCard(note){
     // document.querySelector(".is-one-quarter").style.backgroundColor = ""
     let color1 = generateRandomColor();
        let color2 = generateRandomColor();
        let color3 = generateRandomColor();
        let rgb = `rgb(${color1}, ${color2}, ${color3})`;
return `<div class="column is-one-quarter"  >
         <div class="card" style='background: ${rgb}'>
           <header class="card-header">
             <p class="card-header-title">${note.title}</p>
             <p  class="card-header-title">${googleUserName}</p>
           </header>
           <div class="card-content">
             <div class="content">${note.text}</div>
           </div>
           <p class="has-text-centered">
                <a class="button is-medium is-info is-outlined" onclick="deleteNote()">
                    Delete
                </a>
           </p>
         </div>
       </div>`;
}