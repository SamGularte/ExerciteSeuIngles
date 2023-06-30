const url = "https://www.dictionaryapi.com/api/v3/references/spanish/json/";
const key = "?key=9921bc46-008c-44ba-abba-8a933d43e336"

const result = document.getElementById("result");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}${key}`).then((response) => response.json()).then((data) => {
        console.log(data);
    }).catch( () => {
        result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`;
    })
});

//9921bc46-008c-44ba-abba-8a933d43e336