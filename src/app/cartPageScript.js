document.getElementById("home").addEventListener("click",homeButtonClick);
document.getElementById("logout").addEventListener("click",logoutButtonClick)

function homeButtonClick(){
    window.location=parent.window.document.location.origin+"/homepage";
}

function logoutButtonClick(){
    window.location=parent.window.document.location.origin;
}