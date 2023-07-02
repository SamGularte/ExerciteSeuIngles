const btn_correction = document.getElementById("your-translation-btn");
const results = document.getElementById("answer");

btn_correction.addEventListener("click", () => {

    btn_correction.classList.add("loading");
    btn_correction.innerText = "calculando";

    let inpSentence = document.getElementById("inp-sentence").value;
    let helper = document.getElementById("quote");
    let sentence = helper.innerHTML;

    console.log(inpSentence);
    console.log(sentence);

    let apiUrl = `https://api.mymemory.translated.net/get?q=${sentence}!&langpair=en-US|pt-BR`;

    fetch(apiUrl).then(response => response.json()).then(data => {

        let translatedText = data.responseData.translatedText;
        const similarity = levenshteinSimilarity(translatedText, inpSentence);

        let percentage;
        if(similarity == 1)
        {
            percentage = 100;
        }
        else{
            percentage = similarity.toFixed(2);
            percentage *= 100;
            console.log(percentage);
        }

        let displayText;
        let seconddisplayText;
        if(percentage == 100){
          displayText = "Parabéns você traduziu a frase perfeitamente";
          seconddisplayText = "Cheque abaixo a nossa tradução.";
        }
        else if(percentage >= 90 && percentage < 100){
          displayText = "Parabéns você quase traduziu a frase perfeitamente, porém deslizou em alguns detalhes.";
          seconddisplayText = "Cheque abaixo a tradução correta da frase e compare com a sua.";
        }
        else if(percentage >= 60 && percentage < 90){
          displayText = "Parabéns você traduziu boa parte da frase, porém você errou ou não conseguiu traduzir em algumas partes.";
          seconddisplayText = "Cheque abaixo a tradução correta da frase e compare com a sua.";
        }
        else if(percentage >= 30 && percentage < 60){
          displayText = "Você traduziu uma pequena parte da frase, continue seus estudos e resultados melhores virão";
          seconddisplayText = "Cheque abaixo a tradução correta da frase e compare com a sua.";
        }
        else{
          displayText = "Você acabou não conseguindo traduzir a frase, mas não desista continue nesse caminho que os resultados virão.";
          seconddisplayText = "Cheque abaixo a tradução correta da frase e compare com a sua.";
        }

        results.innerHTML = `
        <h3>Pontuação</h3>
        <div>
          <h4>${percentage}</h4>
        </div>
        <p class="word-meaning">${displayText}</p>
        <br>
        <p class="word-meaning">${seconddisplayText}</p>
        <p class="word-example">${translatedText}</p>`;
        btn_correction.innerText = "Calcular";
        btn_correction.classList.remove("loading");
    });
});

function levenshteinSimilarity(str1, str2) {
    const matrix = [];
  
    for (let i = 0; i <= str1.length; i++) {
      matrix[i] = [i];
    }
  
    for (let j = 0; j <= str2.length; j++) {
      matrix[0][j] = j;
    }
  
    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, 
          matrix[i][j - 1] + 1, 
          matrix[i - 1][j - 1] + cost 
        );
      }
    }
  
    const maxLen = Math.max(str1.length, str2.length);
    return (maxLen - matrix[str1.length][str2.length]) / maxLen;
  }