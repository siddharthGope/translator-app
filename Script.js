const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector(".translate-btn");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");

selectTag.forEach((tag) => {
  for (const country_code in countries) {
    //   selecting English as from and Hindi as to language

    let selected;
    if (country_code == "en-GB") {
      selected = selected;
    } else if (country_code == "hi-IN") {
      selected = selected;
    }

    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option); //adding options tag inside select tag
  }
});

translateBtn.addEventListener("click", () => {
  let text = fromText.value;
  translateFrom = selectTag[0].value; // getting fromSelect value
  translateTo = selectTag[1].value; // getting toSelect value
  let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});
