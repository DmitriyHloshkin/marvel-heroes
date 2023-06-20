class MarvelService {
  #apiUrl = 'https://gateway.marvel.com:443/v1/public/';
  #apiKey = process.env.REACT_APP_MARVEL_API_KEY;

  getData = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  }

  getAllCharacter = (params = {}) => {
    const navigation = 'characters';
    let path = `${this.#apiUrl + navigation}?apikey=${this.#apiKey}`;

    for (let name in params) {
      path += `&${name}=${params[name]}`;
    }

    return this.getData(path);
  }

  getCharacterById = async (id) => {
    const navigation = 'characters/';
    let path = `${this.#apiUrl + navigation + id}?apikey=${this.#apiKey}`;

    const dataHero = await this.getData(path);
    return this.#getHeroData(dataHero);
  }

  getAllIdHero = () => {
    const randomOffset = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

    return this.getAllCharacter({limit: 100, offset: randomOffset})
                .then(res => res.data.results.map(hero => hero.id))
  }

  #getHeroData = (data) => {
    const dataHero = data.data.results[0],
          reduceDescr = dataHero.description ? dataHero.description.slice(0, 150) + '...' : "does not contain a description",
          descr = dataHero.description ? dataHero.description : "does not contain a description";
          
    return {
        name: dataHero.name,
        reduceDescr,
        descr: descr,
        thumbnail: dataHero.thumbnail.path + `.${dataHero.thumbnail.extension}`,
        wiki: dataHero.urls[0].url,
        homepage: dataHero.urls[1].url,
        comics: dataHero.comics.items,
    }
  }

}

export default MarvelService;