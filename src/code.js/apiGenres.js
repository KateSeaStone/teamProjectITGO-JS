function fetchGenres() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=61153224aaaa08b03f5d3b14add082d2&language=en-US%27')
        .then(r => r.json())
        .then(({ genres }) => {
            let temp = {};
            for (let genre of genres) {
                temp[genre.id] = genre.name;
            };
            return temp;
        })
}

export default fetchGenres;