const rep = await fetch("http://localhost:5678/api/works");
const data = await rep.json();

const galleri = document.querySelector(".gallery");

const figureData = (travaux) => {
  travaux.forEach((travail) => {
    const figure = document.createElement("figure");
    figure.dataset.id = travail.id;
    figure.innerHTML = `<img src="${travail.imageUrl}" alt="${travail.title}"><figcaption>${travail.title}</figcaption>`;
    galleri.appendChild(figure);
  });
};

figureData(data);

const boutonsFiltre = document.querySelectorAll(".btn button");

const activerBouton = (boutonClique) => {
  boutonsFiltre.forEach((bouton) => {
    bouton.classList.remove("actif");
  });
  boutonClique.classList.add("actif");
};

const filtrerGalerie = (bouton, categoryId) => {
  activerBouton(bouton);
  const travauxFiltres =
    categoryId === null
      ? data
      : data.filter((travail) => travail.categoryId === categoryId);
  galleri.innerHTML = "";
  figureData(travauxFiltres);
};

const brancherFiltre = (selecteur, categoryId) => {
  const bouton = document.querySelector(selecteur);
  bouton.addEventListener("click", () => filtrerGalerie(bouton, categoryId));
};

brancherFiltre(".btnTous", null);
brancherFiltre(".btnObjet", 1);
brancherFiltre(".btnAppartement", 2);
brancherFiltre(".btnHotel", 3);

const token = window.localStorage.getItem("utilisateur");

if (token !== null) {
  const modifierHaut = document.createElement("a");
  modifierHaut.classList.add("enHaut");
  modifierHaut.href = "#";
  modifierHaut.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> mode edition`;
  document.querySelector("body").prepend(modifierHaut);

  const logout = document.querySelector(".login");
  logout.textContent = "logout";
  logout.setAttribute("href", "index.html");
  logout.addEventListener("click", () => {
    window.localStorage.removeItem("utilisateur");
  });

  const modal = document.querySelector(".modal");
  const modal1 = document.getElementById("modal1");
  const modal2 = document.getElementById("modal2");
  const galleryModal = document.querySelector(".gallery-modal");

  const formModal2 = document.querySelector("#modal2 > form");
  const inputPhoto = document.querySelector("#photo");
  const inputTitre = document.getElementById("titre");
  const selectCategorie = document.querySelector("#categorie");
  const boutonValider = document.querySelector("#modal2 input[type='submit']");
  const apercu = document.querySelector(".apercu");
  const elementsUpload = document.querySelectorAll(
    ".upload i, .upload label, .upload p",
  );

  const afficherVueModal = (numero) => {
    modal1.style.display = numero === 1 ? "flex" : "none";
    modal2.style.display = numero === 2 ? "flex" : "none";
  };

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

  const openmodal = (e) => {
    e.preventDefault();
    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
  };

  const closeModal = () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    afficherVueModal(1);
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

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  const ouvrirModal2 = document.querySelector("#modal1 input");
  ouvrirModal2.addEventListener("click", () => {
    afficherVueModal(2);
  });

  const revenirGallerie = document.querySelector(".fa-arrow-left-long");
  revenirGallerie.addEventListener("click", () => {
    afficherVueModal(1);
    viderFormulaire();
  });

  const supprimerTravail = async (icone) => {
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
  };

  const creerFigureModal = (travail) => {
    const figure = document.createElement("figure");
    figure.classList.add("figure");
    figure.innerHTML = `<img src="${travail.imageUrl}" alt="${travail.title}"><i data-id="${travail.id}" class="fa-solid fa-trash-can"></i>`;
    galleryModal.appendChild(figure);

    const poubelle = figure.querySelector(".fa-trash-can");
    poubelle.addEventListener("click", () => supprimerTravail(poubelle));
  };

  data.forEach((travail) => {
    creerFigureModal(travail);
  });

  const repCategories = await fetch("http://localhost:5678/api/categories");
  const dataCategories = await repCategories.json();

  selectCategorie.innerHTML = `<option value=""></option>`;
  dataCategories.forEach((categorie) => {
    selectCategorie.innerHTML += `<option value="${categorie.id}">${categorie.name}</option>`;
  });

  inputPhoto.addEventListener("change", () => {
    const fichier = inputPhoto.files[0];
    apercu.src = URL.createObjectURL(fichier);
    apercu.alt = "Aperçu de la photo choisie";
    apercu.style.display = "block";
    elementsUpload.forEach((element) => {
      element.style.display = "none";
    });
  });

  formModal2.addEventListener("input", () => {
    const complet =
      inputPhoto.files.length > 0 &&
      inputTitre.value.trim() !== "" &&
      selectCategorie.value !== "";
    boutonValider.classList.toggle("valide", complet);
  });

  formModal2.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fichier = inputPhoto.files[0];
    const titreProjet = inputTitre.value;
    const categorie = selectCategorie.value;

    if (!fichier || titreProjet.trim() === "" || categorie === "") {
      alert("Veuillez remplir les champs");
      return;
    }

    const formData = new FormData();
    formData.append("image", fichier);
    formData.append("title", titreProjet);
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
      creerFigureModal(nouveauProjet);
      closeModal();
    } else {
      alert("erreur du chargement de l image");
    }
  });

  document.querySelector(".btn").style.display = "none";
}