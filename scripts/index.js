const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".author .name");
const quoteBtn = document.querySelector("button");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");

function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "carregando frase...";
    fetch("https://api.quotable.io/random").then(response => response.json()).then(data => {
        console.log(data);
        quoteText.innerText = data.content;
        authorName.innerText = data.author;
        quoteBtn.innerText = "Nova frase";
        quoteBtn.classList.remove("loading");
    })
}

soundBtn.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance();
    utterance.lang = 'en-US';
    utterance.text = quoteText.innerText + " by " + authorName.innerText;
    speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
});

quoteBtn.addEventListener("click", randomQuote);