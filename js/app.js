//defining the variables for the sidebar
const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const mechanics = document.getElementById("game-mechanics");
function toggleSidebar() {
  sidebar.classList.toggle("close");
  toggleButton.classList.toggle("rotate");
  //collecting all the class in the sidebar to remove the class "show" to hide the element when closing the toggle button
  closeAllSubMenus();
}

//Minimizing the sidebar to just icons
function toggleSubMenu(button) {
  //will close the sidebar when trying to open another 1
  if (!button.nextElementSibling.classList.contains("show")) {
    closeAllSubMenus();
  }

  button.nextElementSibling.classList.toggle("show");
  button.classList.toggle("rotate");
  if (sidebar.classList.contains("close")) {
    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
  }
}
function closeAllSubMenus() {
  Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
    ul.classList.remove("show");
    ul.previousElementSibling.classList.remove("rotate");
  });
}
function toggleMechanics() {
  mechanics.classList.toggle("close");
}
