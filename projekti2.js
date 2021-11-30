// EventListenerit
document.getElementById("hakuBtn").addEventListener("click", haeKaikki);
window.addEventListener("load", haeKuva);

//FUNKTIOT

//Haku-nappia painettaessa haetaan kuva ja fakta, sekä piilotetaan sivulta yksi elementti (mikäli vielä esillä)
function haeKaikki() {
    haeKuva();
    haeFakta();
    piilota();
}

//Piilotetaan aloitusteksti
function piilota() {
    document.getElementById("areYouHere").style.display = "none";
}

// Haetaan kuvan url API:sta
function haeKuva() {
    //console.log("haeKuva()")
    var request = new XMLHttpRequest;
    var url = "https://api.thecatapi.com/v1/images/search";

    request.open("GET", url, true);
    request.send();

    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            //console.log(request.responseText);
            parseKuva(request.responseText);
        } else if(request.readyState == 4 && request.status != 200) {
            //Jos haku ei onnistu (haku on valmis, mutta status ei ole "OK"), kerrotaan käyttäjälle ja pyydetään suorittamaan uusi haku:
            alert("Something went wrong while fetching a cat picture. Please try again!")
        }
    }
}

//parsitaan haun response text ("kuva") ja valitaan json-muotoisesta objektista haluttu tieto (=url)
function parseKuva(kuva) {
    var jsonObjekti = JSON.parse(kuva);
    //console.log(jsonObjekti);
    var kuva = jsonObjekti[0].url;
    //console.log(kuva);
    naytaKuva(kuva);
}

//Näytetään kuva sivulla image-id:llä varustetussa elementissä
function naytaKuva(kuva) {
    //console.log(kuva);
    document.getElementById("image").src = kuva;
}

//haetaan fakta
function haeFakta() {
    var request = new XMLHttpRequest;
    var url = "https://meowfacts.herokuapp.com/";

    request.open("GET", url, true);
    request.send();

    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            //console.log(request.responseText);
            parseFakta(request.responseText);
        } else if(request.readyState == 4 && request.status != 200) {
            //Jos haku ei onnistu (haku on valmis, mutta status ei ole "OK"), kerrotaan käyttäjälle ja pyydetään suorittamaan uusi haku:
            alert("Something went wrong while fetching a cat fact. Please try again!");
        }
    }
}

//parsitaan, valitaan halutut tiedot
function parseFakta(fakta) {
    var jsonObjekti = JSON.parse(fakta);
    var fakta = jsonObjekti.data[0];

    //Api antaa muutaman tekstin, joita en halua näyttää. Niiden tullessa vastaan suoritetaan uusi haku
    if(fakta == "To unsubscribe from catfacts, reply the following code: tj3G5de$se"
    || fakta == "You gotta be kitten me! are you sure you want to unsubscribe? send YES or NO"
    || fakta == "Invalid Command, CatFacts!") {
        //console.log("Nyt tuli tää: " + fakta)
        haeFakta();
    }
    //console.log(fakta);
    naytaFakta(fakta);
}

//Näytetään fakta faktapaikka-id:llä varustetussa elementissä
function naytaFakta(fakta) {
    //console.log("Tämä fakta näytetään: " + fakta);
    //haetaan oikea paikka
    var paikka = document.getElementById("faktapaikka");
    //jos childnodeja on, poistetaan ne (=edelliset haut)
    paikka.removeChild(paikka.childNodes[0]);

    //tehdään uusi paragrafi-node
    var p = document.createElement("p");
    //tehdään text node haetusta faktasta
    var fakta = document.createTextNode(fakta);
    // lisätään text node paragrafi-nodeen
    p.appendChild(fakta);
    //Näytetään fakta ("p") faktapaikka-id:llä varustetussa elementissä
    document.getElementById("faktapaikka").appendChild(p);
}