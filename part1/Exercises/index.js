const lisaa_elokuva = (rekisteri, nimi, arvostelu) => {
    rekisteri.push({
        nimi: nimi,
        arvostelu: arvostelu
    })
}

rekisteri = [];

lisaa_elokuva(rekisteri, "Lord of the Rings", 5);
lisaa_elokuva(rekisteri, "Star Wars", 4.5);
lisaa_elokuva(rekisteri, "Indiana Jones", 4);
rekisteri[3] = {
    nimi: "Halloween",
    arvostelu: 3
}

rekisteri.forEach(movie => {
    console.log(movie.nimi);
})