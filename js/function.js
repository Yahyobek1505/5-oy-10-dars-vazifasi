function validation(name, price) {
  if (!name.value) {
    alert("Name is empty!");
    name.focus();
    return false;
  }
  if (name.value.trim().length < 3) {
    alert("Name length must be more than 3 character!");
    name.focus();
    return false;
  }
  if (!price.value) {
    alert("Cost is empty!");
    price.focus();
    return false;
  }
  if (price.value <= 0 ) {
    alert("Cost is INCORRECT!");
    price.focus();
    return false;
  }
  if (!Number(price.value)) {
    alert("Cost must be number!");
    price.focus();
    return false;
  }

  return true;
};

function creatRow(phone, index) {
  return `
  <tr data-id = 'data_${phone.id}'>
        <td>${index}</td>
        <td  class="text-info" style="cursor: pointer;">${phone.name}</td>
        <td>${phone.price}$</td>
        <td>${phone.description}</td>
        <td data-id = 'data_${phone.id}'><i class="fa-regular fa-pen-to-square text-primary" style="cursor: pointer;"></i>
        <i class="fa-solid fa-trash text-danger" style="cursor: pointer; margin-left: 15px;"></i>
      </td>
      </tr>
  `
}


export { validation, creatRow};
