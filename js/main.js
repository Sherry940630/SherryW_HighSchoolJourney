/* main.js */

const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");

document.addEventListener("DOMContentLoaded", () => {
    const mainTabs = document.querySelectorAll(".main-tab");

    mainTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const group = tab.closest(".tab-group");

            //先把其他打開的關掉
            document.querySelectorAll(".tab-group.open").forEach(openGroup => {
                if (openGroup !== group) {
                    openGroup.classList.remove("open");
                }
            });

            //切換自己
            group.classList.toggle("open");
        });
    });
    loadHomePage(); //一打開index.html就載入homepage
});

function loadPage(path, leftId, rightId) {
    fetch(path)
        .then(res => res.text())
        .then(html => {
            const temp = document.createElement("div");
            temp.innerHTML = html;

            leftPage.innerHTML =
                temp.querySelector(leftId).innerHTML;

            rightPage.innerHTML =
                temp.querySelector(rightId).innerHTML;
        });
}

function loadHomePage() {
    fetch("BookmarkPages/Home.html")
        .then(res => res.text())
        .then(html => {
            const temp = document.createElement("div");
            temp.innerHTML = html;

            leftPage.innerHTML =
                temp.querySelector("#home-left").innerHTML;

            rightPage.innerHTML =
                temp.querySelector("#home-right").innerHTML;
        });
}


