document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:5000/api/tickers");
  const data = await response.json();
  console.log(data);
  const tbody = document.querySelector("#ticker-table tbody");
  tbody.innerHTML = "";

  data.forEach((ticker) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ticker.name}</td>
      <td>${ticker.last}</td>
      <td>${ticker.buy}</td>
      <td>${ticker.sell}</td>
      <td>${ticker.volume}</td>
      <td>${ticker.base_unit}</td>
    `;
    tbody.appendChild(tr);
  });

  const selectCrypto = document.querySelector("#crypto");

  data.forEach((ticker) => {
    const option = document.createElement("option");
    option.innerText = `
      ${ticker.name}

    `;
    option.setAttribute("value", ` ${ticker.name}`);
    selectCrypto.append(option);
  });
  const cryptoHolder = document.querySelector(".cryptoHolder");
  cryptoHolder.innerHTML = `<h3>${data[0].base_unit}</h3>
        <h3>${data[0].buy}</h3>
        <h1>${data[0].name}</h1>
        <h3>${data[0].sell}</h3>
        <h3>${data[0].volume}</h3>`;

  selectCrypto.addEventListener("change", (e) => {
    let selectedValue = e.target.value;
    console.log(selectedValue);
    let filter = data.find((ele) => ele.name === selectedValue.trim());
    console.log(filter);

    cryptoHolder.innerHTML = `<h3>${filter.base_unit}</h3>
        <h3>${filter.buy}</h3>
        <h1>${filter.name}</h1>
        <h3>${filter.sell}</h3>
        <h3>${filter.volume}</h3>`;
  });

  let timer = document.querySelector(".timer");
  console.log(timer);
  let num = 60;
  setInterval(() => {
    if (num > 0) {
      timer.innerHTML = `<span>${num--}</span>`;
    } else {
      num;
    }
  }, 1000);
});
