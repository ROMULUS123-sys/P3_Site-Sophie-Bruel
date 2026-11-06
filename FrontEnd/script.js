const rep = await fetch("http://localhost:5678/api/works");

const data = await rep.json();

// Affichage de la gallery
const galleri = document.querySelector(".gallery");

const figureData = (data) => {
  for (let i = 0; i < data.length; i++) {
    const figureRecuperer = document.createElement("figure");
    figureRecuperer.dataset.id = data[i].id;
    figureRecuperer.innerHTML = `<img src ="${data[i].imageUrl}" alt="${data[i].title}"><figcaption>${data[i].title}</figcaption>`;
    galleri.appendChild(figureRecuperer);
  }
};

figureData(data);

// button
const buttonTous = document.querySelector(".btnTous");
const buttonObjet = document.querySelector(".btnObjet");
const buttonAppartement = document.querySelector(".btnAppartement");
const buttonHotel = document.querySelector(".btnHotel");
const boutonsFiltre = document.querySelectorAll(".btn button")

const activerBouton = (boutonClique) => {
    boutonsFiltre.forEach((bouton) => {
        bouton.classList.remove("actif")
    })
    boutonClique.classList.add("actif")
}

//Filtrer
buttonTous.addEventListener("click", () => {
    activerBouton(buttonTous)
  document.querySelector(".gallery").innerHTML = " ";
  return figureData(data);
});

//Filtrer
buttonObjet.addEventListener("click", () => {
    activerBouton(buttonObjet)
  const objetFiltrees = data.filter((data) => {
    return data.categoryId === 1;
  });
  document.querySelector(".gallery").innerHTML = " ";
  figureData(objetFiltrees);
});

buttonAppartement.addEventListener("click", () => {
    activerBouton(buttonAppartement)
  const objetFiltrees = data.filter((data) => {
    return data.categoryId === 2;
  });
  document.querySelector(".gallery").innerHTML = " ";
  figureData(objetFiltrees);
});

buttonHotel.addEventListener("click", () => {
    activerBouton(buttonHotel)
  const objetFiltrees = data.filter((data) => {
    return data.categoryId === 3;
  });
  document.querySelector(".gallery").innerHTML = " ";
  figureData(objetFiltrees);
});

// Page quand connexion etablie
const token = window.localStorage.getItem("utilisateur");

if (token !== null) {
  const modifierHaut = document.createElement("a");
  modifierHaut.classList.add("enHaut");
  modifierHaut.href = "#";
  modifierHaut.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> mode edition`;

  const body = document.querySelector("body");
  body.prepend(modifierHaut);

  const logout = document.querySelector(".login");
  logout.textContent = "logout";
  logout.setAttribute("href", "index.html");

  logout.addEventListener("click", () => {
    window.localStorage.removeItem("utilisateur");
  });

  const openmodal = (e) => {
    e.preventDefault();
    const target = document.querySelector(".modal");
    target.style.display = "flex";
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
  };

  const closeModal = () => {
    const target = document.querySelector(".modal");
    target.style.display = "none";
    target.setAttribute("aria-hidden", "true");
    target.removeAttribute("aria-modal");
    const modal1 = document.getElementById("modal1");
    modal1.style.display = "flex";
    const modal2 = document.getElementById("modal2");
    modal2.style.display = "none";
    viderFormulaire();
  };

  const titre = document.querySelector("#portfolio h2");
  const lienModifier = document.createElement("a");
  lienModifier.href = "#";
  lienModifier.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;
  titre.after(lienModifier);
  lienModifier.addEventListener("click", openmodal);

  const fermerModal = document.querySelectorAll(".fa-xmark");
  fermerModal.forEach((croix) => {
    croix.addEventListener("click", closeModal);
  });

  const modalRecuperer = document.querySelector(".modal");
  modalRecuperer.addEventListener("click", (e) => {
    if (e.target === modalRecuperer) {
      closeModal();
    }
  });

  const ouvrirModal2 = document.querySelector("#modal1 input");
  ouvrirModal2.addEventListener("click", () => {
    const modal1 = document.getElementById("modal1");
    modal1.style.display = "none";
    const modal2 = document.getElementById("modal2");
    modal2.style.display = "flex";
  });

  const revenirGallerie = document.querySelector(".fa-arrow-left-long");
  revenirGallerie.addEventListener("click", () => {
    const modal1 = document.getElementById("modal1");
    modal1.style.display = "flex";
    const modal2 = document.getElementById("modal2");
    modal2.style.display = "none";
    viderFormulaire();
  });

  const galleryModal = document.querySelector(".gallery-modal");
  data.forEach((travail) => {
    galleryModal.innerHTML += `<figure class = "figure"><img src ="${travail.imageUrl}" alt="${travail.title}"><i data-id ="${travail.id}" class="fa-solid fa-trash-can"></i></figure>`;
  });

  const poubelle = document.querySelectorAll(".fa-trash-can");
  poubelle.forEach((icone) => {
    icone.addEventListener("click", async () => {
      const id = icone.dataset.id;
      const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (reponse.ok) {
        icone.parentElement.remove();

        const figureGalerie = document.querySelector(
          `.gallery figure[data-id="${id}"]`,
        );
        if (figureGalerie) {
          figureGalerie.remove();
        }
        const index = data.findIndex((travail) => travail.id == id);
        data.splice(index, 1);
      } else {
        alert("La suppression a échoué");
      }
    });
  });

  const repCategories = await fetch("http://localhost:5678/api/categories");
  const dataCategories = await repCategories.json();

  const selectCategorie = document.querySelector("#categorie");
  selectCategorie.innerHTML = `<option value=""></option>`;
  dataCategories.forEach((categorie) => {
    selectCategorie.innerHTML += `<option value=${categorie.id}>${categorie.name}</option>`;
  });

  const inputPhoto = document.querySelector("#photo");
  const apercu = document.querySelector(".apercu");
  const elementsUpload = document.querySelectorAll(
    ".upload i, .upload label, .upload p",
  );

  inputPhoto.addEventListener("change", () => {
    const fichier = inputPhoto.files[0];
    const adresse = URL.createObjectURL(fichier);
    apercu.src = adresse;
    apercu.alt = "Aperçu de la photo choisie";
    apercu.style.display = "block";
    elementsUpload.forEach((element) => {
      element.style.display = "none";
    });
  });

  const formModal2 = document.querySelector("#modal2 > form");

  const boutonValider = document.querySelector("#modal2 input[type='submit']");
  const inputTitre = document.getElementById("titre");

  formModal2.addEventListener("input", () => {
    const complet =
      inputPhoto.files.length > 0 &&
      inputTitre.value.trim() !== "" &&
      selectCategorie.value !== "";
    boutonValider.classList.toggle("valide", complet);
  });

  const viderFormulaire = () => {
    formModal2.reset();
    apercu.removeAttribute("src");
    apercu.alt = "";
    apercu.style.display = "none";
    elementsUpload.forEach((element) => {
      element.style.display = "";
    });
    boutonValider.classList.remove("valide");
  };

  formModal2.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fichier = inputPhoto.files[0];
    const titre = document.getElementById("titre").value;
    const categorie = document.getElementById("categorie").value;

    if (!fichier || titre.trim() === "" || categorie === "") {
      alert("Veuillez remplir les champs");
      return;
    }

    const formData = new FormData();
    formData.append("image", fichier);
    formData.append("title", titre);
    formData.append("category", categorie);

    const repModal2 = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (repModal2.ok) {
      const nouveauProjet = await repModal2.json();
      data.push(nouveauProjet);
      figureData([nouveauProjet]);

      const figureModal = document.createElement("figure");
      figureModal.classList.add("figure");
      figureModal.innerHTML = `<img src="${nouveauProjet.imageUrl}" alt="${nouveauProjet.title}"><i data-id="${nouveauProjet.id}" class="fa-solid fa-trash-can"></i>`;
      galleryModal.appendChild(figureModal);

      const nouvellePoubelle = figureModal.querySelector(".fa-trash-can");
      nouvellePoubelle.addEventListener("click", async () => {
        const id = nouvellePoubelle.dataset.id;
        const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (reponse.ok) {
          nouvellePoubelle.parentElement.remove();

          const figureGalerie = document.querySelector(
            `.gallery figure[data-id="${id}"]`,
          );
          if (figureGalerie) {
            figureGalerie.remove();
          }

          const index = data.findIndex((travail) => travail.id == id);
          data.splice(index, 1);
        } else {
          alert("La suppression a échoué");
        }
      });

      closeModal();
    } else {
      alert("erreur du chargement de l image");
    }
  });

  const filtres = document.querySelector(".btn");
  filtres.style.display = "none";
}
