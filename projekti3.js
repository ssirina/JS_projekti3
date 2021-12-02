// EventListenerit
$("#hakuBtn").click(function() {
    haeKaikki();
});

//dokumentin latauduttua suoreitettavat komennot
$(document).ready(function() {
    //haetaan etusivulle kuva
    haeKuva();
    //piilotetaan otsikko ja feidataan se sisään
    $("h1").hide();
    $("h1").html("Cat Fact Generator").show();
     //animoidaan otsikko tärähtämään
    var ogFontSize = parseInt($("h1").css("font-size"));
    //console.log(ogFontSize);
    $("h1").animate(
        {fontSize: "-=15"}, 100
    ).animate(
        {fontSize: "+=15"}, 200
    ).animate(
        {fontSize: "-=15"}, 100
    ).animate(
        {fontSize: ogFontSize}
    );

    //animoidaan logo tärähtämään
    $("#logo").animate(
        {width: "100px"}, 200
    ).animate({width: "40px"}, 100
    ).animate(
        {width: "90px"}, 100
    ).animate(
            {width: "70px"}
    );
})

//FUNKTIOT

//Haku-nappia painettaessa haetaan kuva ja fakta, sekä piilotetaan sivulta yksi elementti (mikäli vielä esillä) ja heilautetaan logoa
function haeKaikki() {
    haeKuva();
    haeFakta();
    piilota();
    //Logon täräytys
    $("#logo").animate(
        {width: "100px"}, 100
    ).animate(
        {width: "40px"}, 200
    ).animate(
        {width: "90px"}, 100
    ).animate(
        {width: "70px"}
    );
    //Otsikon täräytys
    var ogFontSize = parseInt($("h1").css("font-size"));
    $("h1").animate(
        {fontSize: "-=15"}, 200
    ).animate(
        {fontSize: "+=15"}, 100
    ).animate(
        {fontSize: "-=15"}, 100
    ).animate(
        {fontSize: ogFontSize}
    );

}

//Piilotetaan aloitusteksti
function piilota() {
    $("#areYouHere").slideUp(500);
}

// Haetaan kuvan url API:sta
function haeKuva() {
    $("#image").hide(300);
    $.ajax({
        url: "https://api.thecatapi.com/v1/images/search",
        //jos haku onnistuu:
        success: function(result) {
            //console.log(result[0].url);
            naytaKuva(result[0].url);
        },
        // jos haku ei onnistu:
        error: function(errorThrown) {
            alert("There was a problem while fetching a cat image. Please try again. Error: " + errorThrown);
            console.log(errorThrown);
        }
    });
}


//Näytetään kuva sivulla image-id:llä varustetussa elementissä
function naytaKuva(kuva) {
    //console.log(kuva);
    $("#image").attr("src", kuva);
    $("#image").show(300);

}

//haetaan fakta
function haeFakta() {
    $.ajax({
    url: "https://meowfacts.herokuapp.com/",
    //jos haku onnistuu:
    success: function(result) {
        //console.log("haeFakta success " + result.data[0])
        naytaFakta(result.data[0]);
    },
    //jos haku ei onnistu:
    error: function (errorThrown) {
        alert("There was a problem while fetching a cat fact. Please try again. Error: " + errorThrown);
        console.log(errorThrown);
    }
    });
}


//Näytetään fakta faktapaikka-id:llä varustetussa elementissä
function naytaFakta(fakta) {
    //console.log("naytaFakta() " + fakta);

    //Api antaa muutaman tekstin, joita en halua näyttää. Niiden tullessa vastaan suoritetaan uusi haku
    if(fakta == "To unsubscribe from catfacts, reply the following code: tj3G5de$se"
    || fakta == "You gotta be kitten me! are you sure you want to unsubscribe? send YES or NO"
    || fakta == "Invalid Command, CatFacts!") {
        //console.log("Nyt tuli tää: " + fakta)
        haeFakta();
        }

    //jos childnodeja on, poistetaan ne (=edelliset haut)
    $("#faktapaikka").empty().hide();
    //Lisätään fakta-paragrafi oikealle paikalle
    $("#faktapaikka").append("<p>" + fakta + "<p>");
    $("#faktapaikka").show(800);
}
