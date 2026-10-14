const rep = await fetch ("http://localhost:5678/api/works");

const data = await rep.json();

console.log(data)

const galleri = document.querySelector(".gallery");


for(let i = 0; i < data.length; i++) {
    const figureRecuperer = document.createElement("figure");
    figureRecuperer.innerHTML = `<img src ="${data[i].imageUrl}"><figcaption>${data[i].title}</figcaption>`;
    galleri.appendChild(figureRecuperer);
}

