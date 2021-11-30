// EventListenerit
$("#hakuBtn").click(function() {
    haeKaikki();
});
$(document).ready(function() {
    haeKuva();
})

//FUNKTIOT

//Haku-nappia painettaessa haetaan kuva ja fakta, sekä piilotetaan sivulta yksi elementti (mikäli vielä esillä)
function haeKaikki() {
    haeKuva();
    haeFakta();
    piilota();
    $("#logo").animate(
        {
            width: "100px",
        }, 200
    ).animate(
        {
            width: "40px",
        }, 100
    ).animate(
        {
                width: "90px",
        }, 100
    ).animate(
            {
                width: "70px",
            }
    );

}

//Piilotetaan aloitusteksti
function piilota() {
    $("#areYouHere").slideUp(500);
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
    $("#image").attr("src", kuva);
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
    //jos childnodeja on, poistetaan ne (=edelliset haut)
    $("#faktapaikka").empty();
    //Lisätään fakta-paragrafi oikealle paikalle
    $("#faktapaikka").append("<p>" + fakta + "<p>");



}
