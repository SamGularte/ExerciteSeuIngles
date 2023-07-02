const selectTag = document.querySelectorAll("select");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const traslateBtn = document.getElementById("tranlate-btn");
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".row i");

    selectTag.forEach((tag, id)=>{
        for(const country_code in countries){
            let selected;
            if(id == 0 && country_code == "en-US"){
                selected = "selected";
            }
            else if(id == 1 && country_code == "pt-BR"){
                selected = "selected";
            }
            let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
            tag.insertAdjacentHTML("beforeend", option);
        }
    });

    exchangeIcon.addEventListener("click", () =>{
        let tempText = fromText.value;
        fromText.value = toText.value;
        toText.value = tempText;

        let tempLang = selectTag[0].value;
        selectTag[0].value = selectTag[1].value;
        selectTag[1].value = tempLang;
    });

    traslateBtn.addEventListener("click", () =>{
        traslateBtn.classList.add("loading");
        traslateBtn.innerText = "Traduzindo...";
        let text = fromText.value; 
        let trasnlateFrom = selectTag[0].value;
        let trasnlateTo = selectTag[1].value;
        console.log(text, trasnlateFrom, trasnlateTo);
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${trasnlateFrom}|${trasnlateTo}`;

        fetch(apiUrl).then(response => response.json()).then(data => {
            console.log(data);
            toText.value = data.responseData.translatedText;
            traslateBtn.innerText = "Traduzir texto";
            traslateBtn.classList.remove("loading");
        });
    });

    icons.forEach(icon =>{
        icon.addEventListener("click", ({target}) =>{
            if(target.classList.contains("fa-copy")){
                if(target.id == "from"){
                    navigator.clipboard .writeText(fromText.value);
                }
                else{
                    navigator.clipboard .writeText(toText.value);
                }
            }
            else{
                let utterance;
                if(target.id == "from"){
                    utterance = new SpeechSynthesisUtterance(fromText.value);
                    utterance.lang = selectTag[0].value;
                }
                else{
                    utterance = new SpeechSynthesisUtterance(toText.value);
                    utterance.lang = selectTag[1].value;
                }
                speechSynthesis.speak(utterance);
            }
        });
    });