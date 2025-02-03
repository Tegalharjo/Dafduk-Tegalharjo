// Elemen menu utama
const menuContainer = document.getElementById("menu-container");

// Objek mapping: jika persyaratan mengandung key, maka akan dibuat tombol download dengan file yang sesuai
const fileMapping = {
  "Formulir F1": "f1.01.pdf",
  "F1.06": "f1.06.pdf",
  "F1.03": "f1.03.pdf",
  "F2.01": "f2.01.pdf"
};

// Fungsi membaca JSON dan membuat menu
function loadMenuFromJSON() {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      renderMenu(data);
    })
    .catch(error => console.error("Error loading JSON:", error));
}

// Fungsi untuk membuat menu
function renderMenu(menuData) {
  menuContainer.innerHTML = ""; // Kosongkan menu sebelum render

  Object.keys(menuData).forEach(menuTitle => {
    const menuItem = document.createElement("li");
    const menuLink = document.createElement("a");
    menuLink.href = "#";
    menuLink.textContent = menuTitle;
    menuItem.appendChild(menuLink);

    const submenuList = document.createElement("ul");
    submenuList.classList.add("submenu");

    const submenus = menuData[menuTitle];
    Object.keys(submenus).forEach(submenuTitle => {
      const submenuItem = document.createElement("li");
      const submenuLink = document.createElement("a");
      submenuLink.href = "#";
      submenuLink.textContent = submenuTitle;
      submenuItem.appendChild(submenuLink);

      const requirementList = document.createElement("ul");
      requirementList.classList.add("submenu");

      // Iterasi untuk setiap persyaratan
      submenus[submenuTitle].forEach(requirement => {
        const requirementItem = document.createElement("li");

        // Cek apakah requirement mengandung salah satu kode dari fileMapping
        let fileFound = false;
        for (let code in fileMapping) {
          if (requirement.indexOf(code) !== -1) {
            // Tampilkan teks requirement
            const textNode = document.createTextNode(requirement + " ");
            requirementItem.appendChild(textNode);

            // Buat tombol download
            const downloadLink = document.createElement("a");
            downloadLink.href = fileMapping[code]; // Link file PDF sesuai mapping
            downloadLink.download = fileMapping[code]; // Nama file saat didownload
            downloadLink.textContent = "Download PDF";
            downloadLink.classList.add("download-btn");

            requirementItem.appendChild(downloadLink);
            fileFound = true;
            break; // Berhenti setelah menemukan kecocokan
          }
        }

        // Jika tidak ada kode yang cocok, tampilkan requirement seperti biasa
        if (!fileFound) {
          requirementItem.textContent = requirement;
        }

        requirementList.appendChild(requirementItem);
      });

      submenuItem.appendChild(requirementList);
      submenuList.appendChild(submenuItem);
    });

    menuItem.appendChild(submenuList);
    menuContainer.appendChild(menuItem);
  });

  addToggleListeners();
}

// Menambahkan toggle submenu
function addToggleListeners() {
  const links = document.querySelectorAll("nav li > a");
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const submenu = this.nextElementSibling;
      if (submenu) {
        submenu.style.display = submenu.style.display === "block" ? "none" : "block";
      }
    });
  });
}

// Muat menu
loadMenuFromJSON();
