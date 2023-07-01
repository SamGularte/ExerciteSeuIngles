const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.getElementById("result");
const btn = document.getElementById("search-btn");
const sound = document.getElementById("sound-E");

btn.addEventListener("click", () => {
    btn.classList.add("loading");
    btn.innerText = "loading definition";
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`).then((response) => response.json()).then((data) => {
        console.log(data);
        if(data[0].meanings.length === 1)
        {
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button class="sound-E">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
            </div>
            <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
            <p class="word-example">${data[0].meanings[0].definitions[0].example || ""}</p>`;
        }
        else if(data[0].meanings.length === 2){
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button class="sound-E">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
            </div>
            <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
            <p class="word-example">${data[0].meanings[0].definitions[0].example || ""}</p>
            <hr/>
            <div class="details">
                <p>${data[0].meanings[1].partOfSpeech}</p>
            </div>
            <p class="word-meaning">${data[0].meanings[1].definitions[0].definition}</p>
            <p class="word-example">${data[0].meanings[1].definitions[0].example || ""}</p>`;
        }
        else if(data[0].meanings.length >= 3){
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button class="sound-E">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
            </div>
            <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
            <p class="word-example">${data[0].meanings[0].definitions[0].example || ""}</p>
            <hr/>
            <div class="details">
                <p>${data[0].meanings[1].partOfSpeech}</p>
            </div>
            <p class="word-meaning">${data[0].meanings[1].definitions[0].definition}</p>
            <p class="word-example">${data[0].meanings[1].definitions[0].example || ""}</p>
            <hr/>
            <div class="details">
                <p>${data[0].meanings[2].partOfSpeech}</p>
            </div>
            <p class="word-meaning">${data[0].meanings[2].definitions[0].definition}</p>
            <p class="word-example">${data[0].meanings[2].definitions[0].example || ""}</p>`;
        }
        btn.innerText = "Search";
        btn.classList.remove("loading");
    }).catch( () => {
        result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`;
        btn.innerText = "Search";
        btn.classList.remove("loading");
    })
});
