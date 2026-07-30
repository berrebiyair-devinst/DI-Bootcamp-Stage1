fetch("https://api.chucknorris.io/jokes/random?category=dev")
    .then(response => {
        if (response.ok) {
            return response.json();
        }

        throw new Error("Error");
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });







    
// fetch(url)
// .then(response => {
//     if(response.ok){
//         return response.json();
//     }
//     throw new Error("Erreur");
// })
// .then(data => {
//     console.log(data);
// })
// .catch(error => {
//     console.log(error);
// });