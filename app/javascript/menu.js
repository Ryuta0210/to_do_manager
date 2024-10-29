history.replaceState(null, document.getElementsByTagName('title')[0].innerHTML, null);
window.addEventListener('popstate', function(e) {
  window.location.reload();
});

const menu =() =>{
  const newButton = document.getElementById("top_logo_top")
  const newMenu = document.getElementById("new_menu");
  const confirmButton = document.getElementById("top_logo_bottom_left")
  const confirmMenu = document.getElementById("confirm_menu")
  if (!newButton) return

  newButton.addEventListener("click", (e)=>{
    e.preventDefault();
    console.log("OK")
    newMenu.style.display = newMenu.style.display === "none" ? "block" : "none";
  })
  confirmButton.addEventListener("click", (e)=>{
    e.preventDefault();
    console.log("OK")
    confirmMenu.style.display = confirmMenu.style.display === "none" ? "flex" : "none";
  })
}

window.addEventListener("load",menu)
window.addEventListener('popstate', function(e) { window.location.reload(); });
