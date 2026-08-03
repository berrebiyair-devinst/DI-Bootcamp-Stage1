const fromcurrency = document.getElementById("fromCurrency");
const tocurrency = document.getElementById("toCurrency");

async function loadCurrencies() {
    const loadingMessage = document.getElementById("loading");
    loadingMessage.textContent = "Loading currencies...";

    try {
        const apiKey = "949d05347990b5a6e84072fc";

        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${apiKey}/codes`
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        data.supported_codes.forEach(currency => { 
        console.log(currency);
        const option = document.createElement("option");
        option.value = currency[0];
        option.textContent = currency[1];
        fromcurrency.appendChild(option);
        tocurrency.appendChild(option.cloneNode(true));
    });
        console.log(data);

        loadingMessage.textContent = "";

    } catch (error) {
        loadingMessage.textContent = "";
        console.error(error);
    }
}
loadCurrencies();

const form = document.getElementById("currencyForm");

form.addEventListener("submit",async (event) => {
    event.preventDefault();

    const from = fromcurrency.value;
    const to = tocurrency.value;
    const amount = document.getElementById("amount").value;

     const result = await convertCurrency(from, to, amount);
     document.getElementById("result").value = result;

    console.log(from, to, amount);
});

async function convertCurrency(from, to, amount) {
    const loadingMessage = document.getElementById("loading");
    loadingMessage.textContent = "Converting...";

    try {
      const apiKey = "949d05347990b5a6e84072fc";
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      loadingMessage.textContent = "";
      return data.conversion_result;
    } catch (error) {
      loadingMessage.textContent = "";
      console.error(error);
      throw error;
    }
  };

const switchBtn = document.getElementById("switchBtn");

switchBtn.addEventListener("click", async () => {
    // Sauvegarde temporaire
    const temp = fromcurrency.value;

    // Inverser les devises
    fromcurrency.value = tocurrency.value;
    tocurrency.value = temp;

    // Récupérer le montant
    const amount = document.getElementById("amount").value;

    // Ne rien faire si aucun montant n'est entré
    if (!amount) {
        return;
    }

    try {
        // Refaire la conversion avec les nouvelles devises
        const result = await convertCurrency(
            fromcurrency.value,
            tocurrency.value,
            amount
        );

        // Afficher le nouveau résultat
        document.getElementById("result").value = result;

    } catch (error) {
        document.getElementById("result").value = "Conversion error";
    }
});