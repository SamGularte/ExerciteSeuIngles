const url2 = "https://api.dicionario-aberto.net/word/";

const result2 = document.getElementById("result_p");
const btn2 = document.getElementById("search-btn_p");

btn2.addEventListener("click", () => {
    let inpWord2 = document.getElementById("inp-word_p").value;
    fetch(`${url2}${inpWord2}`).then((response2) => response2.json()).then((data2) => {
        console.log(data2);

        let parsingFunction, parsedElement;

        parsingFunction = new DOMParser();
        parsedElement = parsingFunction.parseFromString(data2[0].xml, "text/xml");

        result2.innerHTML = `
            <div class="word">
                <h3>${inpWord2}</h3>
            </div>
            <p class="word-meaning">${parsedElement.getElementsByTagName("sense")[0].getElementsByTagName("def")[0].textContent}</p>`;
    }).catch( () => {
        result2.innerHTML = `<h3 class="error">Palavra não encontrada</h3>`;
    })
});