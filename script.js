//DOM
const voornaam = document.getElementById("voorletters");
const tussenvoegsel = document.getElementById("tussenvoegsel");
const achternaam = document.getElementById("achternaam");
const postcode = document.getElementById("postcode");
const huisnummer = document.getElementById("huisnummer");
const stad = document.getElementById("stad");
const straat = document.getElementById("straatnaam");
const email = document.getElementById("email");

const loading = document.getElementsByClassName("loading");

//Functie die wordt uitgevoerd zodra huisnummer + postcode zijn ingevuld en loading bars zodra 
function getOutput () {
    
    loading[0].innerHTML = "<img src=https://media1.tenor.com/images/645a8061d2722ee2aa0f682190055e63/tenor.gif?itemid=10219845>";
    loading[1].innerHTML = "<img src=https://media1.tenor.com/images/645a8061d2722ee2aa0f682190055e63/tenor.gif?itemid=10219845>";
    
    var postalCode = postcode.value;
    var request = new XMLHttpRequest()

    request.open("GET", "http://photon.komoot.de/api/?q=" + postalCode, true)
    request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
  
    stad.value = data.features[0].properties.city;
    
    loading[0].innerHTML = "";
    loading[1].innerHTML = "";
        
    if (stad.value.length >= 1)  {
    stad.classList.add("ingevuld");
    stad.nextElementSibling.style.opacity = 1;
    stad.nextElementSibling.style.backgroundColor = "#00b900";
    stad.nextElementSibling.innerHTML = "Ingevuld";
        
    straat.classList.add("ingevuld");
    straat.nextElementSibling.style.opacity = 1;
    straat.nextElementSibling.style.backgroundColor = "#00b900";
    straat.nextElementSibling.innerHTML = "Ingevuld";
    } else {
    stad.classList.add("ingevuld");
    straat.classList.add("ingevuld"); 
    }

    }
    request.send()
}



//Functie voor velden of er uberhaupt wel iets ingevuld is
function validateVoorletters () {
   if(checkIfEmpty(voornaam)) return; //checkt of het veld uberhaupt wel ingevuld is
}

function validateTussenvoegsel () {
    if (tussenvoegsel.value.length >= 0) {
        tussenvoegsel.classList.add("ingevuld");
        tussenvoegsel.nextElementSibling.style.opacity = 1;
        tussenvoegsel.nextElementSibling.style.backgroundColor = "#00b900";
        tussenvoegsel.nextElementSibling.innerHTML = "Ingevuld";
    }
}

function validateAchternaam () {   
    if(checkIfEmpty(achternaam)) return; //checkt of het veld uberhaupt wel ingevuld is
}

function validateHuisnummer () {
    
    const huisnummerNumber = parseInt(huisnummer.value); //een nummer
    const huisnummerNumber2 = huisnummer.value; //een string
    
    
        
    const regexHuisnummer = /^[0-9]+$/;
    
    if (regexHuisnummer.test(huisnummerNumber) == true && huisnummerNumber2.length >= 1) {
        huisnummer.classList.add("ingevuld");
        huisnummer.classList.remove("nietingevuld");
        huisnummer.nextElementSibling.style.opacity = 1;
        huisnummer.nextElementSibling.style.backgroundColor = "#00b900";
        huisnummer.nextElementSibling.innerHTML = "Dit is een geldig huisnummer";
    } else if (regexHuisnummer.test(huisnummerNumber) == false && huisnummerNumber2.length >= 1) {
        huisnummer.classList.add("nietingevuld");
        huisnummer.classList.remove("ingevuld");
        huisnummer.nextElementSibling.style.opacity = 1;
        huisnummer.nextElementSibling.style.backgroundColor = "#ff0000";
        huisnummer.nextElementSibling.innerHTML = "Dit is geen geldig huisnummer";
    } else if (huisnummerNumber2.length <= 0) {
        huisnummer.classList.add("nietingevuld");
        huisnummer.classList.remove("ingevuld");
        huisnummer.nextElementSibling.style.opacity = 1;
        huisnummer.nextElementSibling.style.backgroundColor = "#ff0000";
        huisnummer.nextElementSibling.innerHTML = "U heeft geen huisnummer ingevoerd";
    }
}

function validatePostcode () {
    const postcodeText = postcode.value;
    
    const postcodeRegex= /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;  
    
    if (postcodeRegex.test(postcodeText) == true && postcodeText.length >= 1) {
        postcode.classList.add("ingevuld");
        postcode.classList.remove("nietingevuld");
        postcode.nextElementSibling.style.opacity = 1;
        postcode.nextElementSibling.style.backgroundColor = "#00b900";
        postcode.nextElementSibling.innerHTML = "Dit is een geldige Nederlandse postcode";
    } else if (postcodeRegex.test(postcodeText) == false && postcodeText.length >= 1) {
        postcode.classList.add("nietingevuld");
        postcode.classList.remove("ingevuld");
        postcode.nextElementSibling.style.opacity = 1;
        postcode.nextElementSibling.style.backgroundColor = "#ff0000";
        postcode.nextElementSibling.innerHTML = "Dit is geen geldige Nederlandse postcode";
    } else if (postcodeText.length <= 0) {
        postcode.classList.add("nietingevuld");
        postcode.classList.remove("ingevuld");
        postcode.nextElementSibling.style.opacity = 1;
        postcode.nextElementSibling.style.backgroundColor = "#ff0000";
        postcode.nextElementSibling.innerHTML = "U heeft geen postcode ingevoerd";
    }
}

//functie voor het valideren van e-mail
function validateEmail() {
    
    const emailText = email.value;
    
    const regexEmail = /^([a-z 0-9\.-]+)@([a-z 0-9\.-]+).([a-z]{2,8})$/; 
    
    if (regexEmail.test(emailText) == true && emailText.length >= 1) {
        email.classList.add("ingevuld");
        email.classList.remove("nietingevuld");
        email.nextElementSibling.style.opacity = 1;
        email.nextElementSibling.style.backgroundColor = "#00b900";
        email.nextElementSibling.innerHTML = "Dit is een geldig e-mailadres";
    } else if (regexEmail.test(emailText) == false && emailText.length >= 1) {
        email.classList.add("nietingevuld");
        email.classList.remove("ingevuld");
        email.nextElementSibling.style.opacity = 1;
        email.nextElementSibling.style.backgroundColor = "#ff0000";
        email.nextElementSibling.innerHTML = "Dit emailadres is ongeldig";
    } else if (emailText.length <= 0) {
        email.classList.add("nietingevuld");
        email.classList.remove("ingevuld");
        email.nextElementSibling.style.opacity = 1;
        email.nextElementSibling.style.backgroundColor = "#ff0000";
        email.nextElementSibling.innerHTML = "U heeft geen e-mailadres ingevoerd";
    }
}

//checkt of er iets is ingevuld en geeft validatiebericht indien true
function checkIfEmpty(veld) {
    if (isEmpty(veld.value.trim())) {
        setInvalid(veld, veld.name + " invullen is verplicht.");
        return true;
    } else {
        setValid(veld);
        return false;
    }
}

function isEmpty(value) {
    if (value === "") return true;
    return false;
}

function setInvalid(veld, message) {
    veld.classList.add("nietingevuld");
    veld.classList.remove("ingevuld");
    veld.nextElementSibling.style.opacity = 1;
    veld.nextElementSibling.style.backgroundColor = "#ff0000";
    veld.nextElementSibling.innerHTML = message;
}

function setValid(veld, message) {
    veld.classList.add("ingevuld");
    veld.classList.remove("nietingevuld");
    veld.nextElementSibling.style.opacity = 1;
    veld.nextElementSibling.style.backgroundColor = "#00b900";
    veld.nextElementSibling.innerHTML = "Ingevuld";
}





