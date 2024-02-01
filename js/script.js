import { validation, creatRow } from "./function.js";
const button = document.getElementById("button");
const name = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");
const mainScren = document.getElementById("mainScren");
const form = document.getElementById("form");

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://auth-rg69.onrender.com/api/products/all", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.length) {
        data.forEach((phone, index) => {
          let table = creatRow(phone, index + 1);
          mainScren.innerHTML += table;
        });
        const deleteButtons = document.querySelectorAll("i.text-danger");

        if (deleteButtons) {
          deleteButtons.forEach((del) => {
            del &&
              del.addEventListener("click", function () {
                let elementId = this?.parentNode
                  ?.getAttribute("data-id")
                  .substring(5);
                if (elementId) {
                  let isDelete = confirm(
                    "Rostdan ham shu ma'lumotni o'chirmoqchimisiz?"
                  );
                  if (isDelete) {
                    fetch(
                      `https://auth-rg69.onrender.com/api/products/${elementId}`,
                      {
                        method: "DELETE",
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        if (
                          data.message == "Mahsulot muvaffaqiyatli o'chirildi"
                        ) {
                          window.location.reload();
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }
                }
              });
          });
        }
        let urlManzil = window.location.href.substring(0,window.location.href.search("index"))
         const nameList =document.querySelectorAll('td.text-info')
         nameList.forEach(item => {
          item && item.addEventListener('click', function () {
            let id = this.parentNode.getAttribute("data-id").substring(5); 
            console.log(id);
            if (id) {
              window.location.assign(`${urlManzil}./pages/batafsil.html?id=${id}`)
            } 
          })
         })
        
      }
    });
});

button &&
  button.addEventListener("click", function (event) {
    event.preventDefault();

    if (validation(name, price)) {
      let phone = {
        name: name.value,
        price: price.value,
        description: description.value,
        status: "active",
        category_id: "4",
      };
      fetch("https://auth-rg69.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(phone),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            let qator = creatRow(phone, mainScren.children.length + 1);
            mainScren.innerHTML += qator;
            form.reset();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
