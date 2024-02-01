import { validation, creatRow} from "./function.js";
const button = document.getElementById('button');
const name = document.getElementById('name');
const price = document.getElementById('price');
const description = document.getElementById('description');
const mainScren = document.getElementById('mainScren');
const form = document.getElementById('form');

document.addEventListener('DOMContentLoaded', function () {
  fetch("https://auth-rg69.onrender.com/api/products/all", {
    method: "GET",
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.length) {
      data.forEach((phone, index) => {
        let table = creatRow(phone, index + 1)
        mainScren.innerHTML += table;
      });
    } 
  })
  .catch(error => {
    console.log(error);
  })

})

button &&

  button.addEventListener("click", function (event) {
    event.preventDefault();

    if (validation(name, price)) {
      let phone = {
        name: name.value,
        price: price.value,
        description: description.value,
        status: 'active',
        category_id: "4"
      };

      fetch("https://auth-rg69.onrender.com/api/products", {
        method: "POST",
        headers: {
          'Content-type': "aplication/json"
        },
        body: JSON.stringify(phone)
      })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          let qator = creatRow(phone);
          mainScren.innerHTML += qator;
          form.reset();
        }
      })
      .catch (error => {
        console.log(error);
      })
    }
    
  });

  
