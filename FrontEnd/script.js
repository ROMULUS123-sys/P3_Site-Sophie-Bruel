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
    const modifierHaut = document.createElement("a");
    modifierHaut.classList.add("enHaut");
    modifierHaut.href = "#";
    modifierHaut.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> mode edition`;

    const body = document.querySelector("body")
    body.prepend(modifierHaut)

    const logout = document.querySelector(".login")
    logout.textContent = "logout"
    logout.setAttribute("href", "index.html")

    logout.addEventListener("click", () => {
    window.localStorage.removeItem("utilisateur")
    })

    const openmodal = (e) => {
        e.preventDefault()
        const target = document.querySelector(".modal")
        target.style.display = "flex"
        target.removeAttribute("aria-hidden")
        target.setAttribute("aria-modal", "true")
    }

    const closeModal = () => {
        const target = document.querySelector(".modal")
        target.style.display = "none"
        target.setAttribute("aria-hidden", "true")
        target.removeAttribute("aria-modal")
        const modal1 = document.getElementById("modal1")
        modal1.style.display = "flex"
        const modal2 = document.getElementById("modal2")
        modal2.style.display = "none"
    }

    const titre = document.querySelector("#portfolio h2");
    const lienModifier = document.createElement("a");
    lienModifier.href = "#";
    lienModifier.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
    titre.after(lienModifier);
    lienModifier.addEventListener("click", openmodal)



    const fermerModal = document.querySelectorAll(".fa-xmark")
    fermerModal.forEach((croix) => {
        croix.addEventListener("click", closeModal)
    })

    const modalRecuperer = document.querySelector(".modal")
    modalRecuperer.addEventListener("click", (e) => {
        if(e.target === modalRecuperer){
            closeModal()
        }
    })

    const ouvrirModal2 = document.querySelector("#modal1 input")
    ouvrirModal2.addEventListener("click", () => {
        const modal1 = document.getElementById("modal1")
        modal1.style.display = "none"
        const modal2 = document.getElementById("modal2")
        modal2.style.display = "flex"
    })

    const revenirGallerie = document.querySelector(".fa-arrow-left-long")
    revenirGallerie.addEventListener("click", () => {
        const modal1 = document.getElementById("modal1")
        modal1.style.display = "flex"
        const modal2 = document.getElementById("modal2")
        modal2.style.display = "none"
    })
    
    const galleryModal = document.querySelector(".gallery-modal")
    data.forEach((travail) =>{
        galleryModal.innerHTML += `<figure><img src ="${travail.imageUrl}"><i class="fa-solid fa-trash-can"></i></figure>`
    })
    

    const filtres = document.querySelector(".btn");
    filtres.style.display = "none";
}

