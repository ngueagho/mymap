function modifier(id, valeur) {
  const xhr = new XMLHttpRequest();
  // xhr.open("GET", "mymap.php?id=" + id + "&valeur=" + valeur, true);
  alert("go")
  xhr.open("post", "mymap.php", true);
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  xhr.send("valeur="+valeur)
  // xhr.send();
}

function coucou() {
  alert("coucou");
  var valeur = 11112
  let id = 2;
  modifier(id, valeur);
  afficher();
}

function afficher() {
  let xml = new XMLHttpRequest() ;
  xml.onreadystatechange = function (){
    if (xml.readyState == 4 && xml.status ==200){
      alert ("-------------->  "+this.response);
    }
  }
  xml.open("get" , "mymap.php", true)
  xml.send()
}

