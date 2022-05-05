const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector(".translate-btn");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons i");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    //   selecting English as from and Hindi as to language
    let selected;
    if (id == 0 && country_code == "en-GB") {
      selected = selected;
    } else if (id == 1 && country_code == "hi-IN") {
      selected = selected;
    }

    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option); //adding options tag inside select tag
  }
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value,
    translateFrom = selectTag[0].value; // getting fromSelect value
  translateTo = selectTag[1].value; // getting toSelect value
  if (!text) {
    toText.setAttribute("placeholder", "Translating...");
  }
  let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
      toText.setAttribute("placeholder", "Translating...");
    });
});

exchangeIcon.addEventListener("click", () => {
  let tempText = fromText.value;
  fromText.value = toText.value;
  toText.value = tempText;

  let tempLang = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});
icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-files-o")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value);
        utterance.lang = selectTag[0].value; //setting utterance language to fromSelect tag value
      } else {
        navigator = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value; //setting utterance language to toSelect tag value
      }
      speechSynthesis.speak(utterance); //speak the passed utterance
    }
  });
});
