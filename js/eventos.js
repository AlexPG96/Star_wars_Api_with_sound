var personajesUl = document.querySelector('#personajes');
var vistaPersonaje = document.querySelector('#vistaPersonaje');

function printList(pLista, pPageNext, pPagePrev){
    personajesUl.innerHTML = "";
    for (item of pLista){
        let li = document.createElement('li');
        let textoli = document.createTextNode(item.name);
        //existe una funcion que me permite partir cadenas de caracteres. SPLIT.
        let url = item.url;
        let elementosUrl = url.split('/');
        li.dataset.personaje = elementosUrl[4];
        li.dataset.id = elementosUrl[5];


        li.appendChild(textoli);
        personajesUl.appendChild(li);
        li.addEventListener('click', recogemosInfo);
        li.addEventListener('click', inciarAudio); //poner mouseover para ver el cambio.
        // li.addEventListener('mouseout', pararAudio);
    }

    let btnPrev = document.querySelector('.botones div:first-child');
    let btnNext = document.querySelector('.botones div:last-child');

    btnNext.dataset.page =pPageNext;
    btnPrev.dataset.page = pPagePrev;

    btnNext.style.display = (pPageNext != "") ? 'block' : 'none';
    btnPrev.style.display = (pPagePrev != "") ? 'block' : 'none';

    btnNext.addEventListener('click', gotoPage);
    btnPrev.addEventListener('click', gotoPage);
    
}

function gotoPage(){
    let page = event.target.dataset.page;
    getSwapi('people', "", page);

}

function printObject(pObject){
    vistaPersonaje.innerHTML = `<h2>${pObject.name}</h2>
                                    <ul>
                                        <li>Altura: ${pObject.height}</li>
                                        <li>Peso: ${pObject.mass}</li>
                                        <li>Color de piel: ${pObject.skin_color}</li>
                                        <li>Color de pelo: ${pObject.hair_color}</li>
                                        <li>Genero: ${pObject.gender}</li>
                                        <li>Año de nacimiento: ${pObject.birth_year}</li>
                                    </ul>
                                    <h2>Peliculas donde aparece</h2>
                                    <div class="peliculas"></div>`
    
    let films = pObject.films;

    for(film of films){
        let elementosUrlFilm = film.split('/');
        let tipo = elementosUrlFilm[4];
        let idFilms = elementosUrlFilm[5];
        getSwapi(tipo, idFilms)
       
    }

}


function printObjectFilm(pObjectFilm) {
    //pintamos cada pelicula
    // console.log(pObjectFilm)
    var divPeliculas = document.querySelector('.peliculas');

    divPeliculas.innerHTML += `<article>
    <h3>${pObjectFilm.title}</h3>
    <ul>
        <li>Nº capitulo: ${pObjectFilm.episode_id} </li>
        <li>Director: ${pObjectFilm.director}</li>
        <li>Año: ${pObjectFilm.release_date}</li>
    </ul>
</article>`
}


function recogemosInfo(event){
    let tipo = event.target.dataset.personaje;
    let id = event.target.dataset.id;
    getSwapi(tipo, id);
    
}

function inciarAudio(){
    let audio = document.createElement('audio');
    audio.src = "mp3/sable.mp3";
    audio.autoplay = 'autoplay';

    document.body.appendChild(audio);

}


//Para parar el audio en la opcion de mouseout(activar);
// function pararAudio(){
//     let audio = document.getElementById('audio');
//     audio.parentNode.removeChild(audio);
// }