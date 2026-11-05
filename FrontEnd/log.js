//log in 

const form = document.querySelector("form");
form.addEventListener("submit", async (e) =>{ 
    e.preventDefault()
    const email = document.getElementById("email").value ;
    const password = document.getElementById("password").value ;

    let regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+")

    if(regex.test(email) && password !== ""){
        const chargeUtile= JSON.stringify({"email" : email , "password" : password });
        const rep = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" } ,
            body: chargeUtile
        })
        const data = await rep.json();
        console.log(data);

            if(rep.status === 200){
            window.localStorage.setItem("utilisateur",data.token);
            window.location.href = "index.html"
        
            } else {
            alert("erreur : vous avez renseigner les mauvaises informations")
        }
        
    }else {
        alert("Votre email ou votre mot de passe est incorect");
    }
})
