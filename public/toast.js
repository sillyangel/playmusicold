function toast(text) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = text;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    return
}

export function toast