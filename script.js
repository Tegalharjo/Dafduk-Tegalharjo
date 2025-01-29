// Elemen menu utama
const menuContainer = document.getElementById("menu-container");

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

            // Requirements adalah array dalam format JSON
            submenus[submenuTitle].forEach(requirement => {
                const requirementItem = document.createElement("li");
                requirementItem.textContent = requirement;
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
