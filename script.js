function updatePrice() {

  let s = document.getElementsByName("prodType");
  let select = s[0];
  let price = 0;
  let prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex];
	
  }
  count = document.getElementById('prodCount').value;
  
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = (select.value == "3" ? "block" : "none");

  let checkDiv = document.getElementById("checkboxes");
  checkDiv.style.display = (select.value == "2" ? "block" : "none"); 

  let priceOption = 0;
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    if (radio.checked) {
      let optionPrice = prices.prodOptions[radio.value];
      if (optionPrice !== undefined) {
        priceOption += optionPrice;
      }
    }
  });

  let priceProp = 0;
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      let propPrice = prices.prodProperties[checkbox.name];
      if (propPrice !== undefined) {
        priceProp += propPrice;
      }
    }
  });
  
  let prodPrice = document.getElementById("prodPrice");
  prodPrice.innerHTML = price * count + (select.value == "3" ? priceOption : 0) + (select.value == "2" ? priceProp : 0) + " руб.";
}

function getPrices() {
  return {
    prodTypes: [1000, 100000, 5000],
    prodOptions: {
      option1: 1000,
      option2: 2000,
      option3: 20000,
    },
    prodProperties: {
      prop1: 1000,
      prop2: 3000,
    }
  };
}

window.addEventListener('DOMContentLoaded', function (event) {

  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = "none";
  
  let s = document.getElementsByName("prodType");
  let select = s[0];

  select.addEventListener("change", function(event) {
    let target = event.target;
    console.log(target.value);
    updatePrice();
  });
  
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    radio.addEventListener("change", function(event) {
      let r = event.target;
      console.log(r.value);
      updatePrice();
    });
  });
	
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function(event) {
      let c = event.target;
      console.log(c.name);
      console.log(c.value);
      updatePrice();
    });
  });
  
  let prodCount = document.querySelectorAll("#prodCount input");
  prodCount.forEach(function(count) {
    count.addEventListener("change", function(event) {
      let d = event.target;
      console.log(d.value);
	  console.log(d.name);
      updatePrice();
    });
  });

  updatePrice();
});
