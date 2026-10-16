const rep = await fetch ("http://localhost:5678/api/works");

const data = await rep.json();

console.log(data)

// Affichage de la gallery
const galleri = document.querySelector(".gallery");

const figureData = (data) =>{
    for(let i = 0; i < data.length; i++) {
    const figureRecuperer = document.createElement("figure");
    figureRecuperer.innerHTML = `<img src ="${data[i].imageUrl}"><figcaption>${data[i].title}</figcaption>`;
    galleri.appendChild(figureRecuperer);
    }
}

figureData(data);

// button 
const buttonTous = document.querySelector(".btnTous");
const buttonObjet = document.querySelector(".btnObjet");
const buttonAppartement = document.querySelector(".btnAppartement");
const buttonHotel = document.querySelector(".btnHotel");

//Filtrer
buttonTous.addEventListener("click", () => {
    document.querySelector(".gallery").innerHTML = " ";
    return figureData(data);
})

//Filtrer
buttonObjet.addEventListener("click", () => {
    const objetFiltrees = data.filter((data) => {
        return data.categoryId === 1;
    });
    document.querySelector(".gallery").innerHTML = " ";
    figureData(objetFiltrees);
})

buttonAppartement.addEventListener("click", () => {
    const objetFiltrees = data.filter((data) => {
        return data.categoryId === 2;
    });
    document.querySelector(".gallery").innerHTML = " ";
    figureData(objetFiltrees);
})

buttonHotel.addEventListener("click", () => {
    const objetFiltrees = data.filter((data) => {
        return data.categoryId === 3;
    });
    document.querySelector(".gallery").innerHTML = " ";
    figureData(objetFiltrees);
})

// Page quand connexion etablie
const token = window.localStorage.getItem("utilisateur")

if(token !== null){
    const paragraphe = document.createElement("p")
    paragraphe.classList.add("enHaut")
    paragraphe.textContent = "Mode edition"

    const body = document.querySelector("body")
    body.prepend(paragraphe)

    const logout = document.querySelector(".login")
    logout.textContent = "logout"


    const titre = document.querySelector("#portfolio h2");
    const lienModifier = document.createElement("a");
    lienModifier.href = "#";
    lienModifier.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
    titre.appendChild(lienModifier);

    const filtres = document.querySelector(".btn");
    filtres.style.display = "none";

}