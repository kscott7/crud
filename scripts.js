document.addEventListener("DOMContentLoaded", function () {
  const list = document.querySelector("#myList");
  const form = document.querySelector("#myForm");
  const dbURL = "https://kscott7.github.io/crud/db.json";

  function getList() {
    list.innerHTML = "";
    fetch(`${dbURL}`)
      .then((response) => response.json())
      .then((listData) => {
        if (listData.length > 0) {
          listData.forEach(function (item) {
            list.innerHTML += `
        <li id=${item.id}>
          ${item.title}
          <button data-id="${item.id}" id="edit-${item.id}" data-action="edit">Edit</button>
          <button data-id="${item.id}" id="delete-${item.id}" data-action="delete">Delete</button>
        </li>`;
          });
        } else {
          list.innerHTML = `<li>Nothing on the list yet...</li>`;
        }
      });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    function addItem() {
      const input = document.querySelector("#myInput");
      fetch(`${dbURL}`, {
        method: "POST",
        body: JSON.stringify({
          title: input.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      input.value = "";
    }
    addItem();
  });

  getList();
});
