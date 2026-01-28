/* main.js */

const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");

document.addEventListener("DOMContentLoaded", () => 
{
    const mainTabs = document.querySelectorAll(".main-tab");

    mainTabs.forEach(tab => 
    {
        tab.addEventListener("click", () => 
        {
            const group = tab.closest(".tab-group");

            //先把其他打開的關掉
            document.querySelectorAll(".tab-group.open").forEach(openGroup => 
            {
                if (openGroup !== group) 
                {
                    openGroup.classList.remove("open");
                }
            });

            //切換自己
            group.classList.toggle("open");
        });
    });
    loadHomePage(); //一打開index.html就載入homepage
});

function loadPage(path, leftId, rightId) 
{
    fetch(path)
        .then(res => res.text())
        .then(html => 
        {
            const temp = document.createElement("div");
            temp.innerHTML = html;

            leftPage.innerHTML =
                temp.querySelector(leftId).innerHTML;

            rightPage.innerHTML =
                temp.querySelector(rightId).innerHTML;

            if (path.includes("Zerojudge")) 
            {
                bindZeroJudgeSelect();
            } 
            else if (path.includes("Leetcode")) 
            {
                bindLeetcodeSelect();
            }
        });
}

function loadHomePage() {
    fetch("BookmarkPages/Home.html")
        .then(res => res.text())
        .then(html => 
        {
            const temp = document.createElement("div");
            temp.innerHTML = html;

            //將內容填入現有的頁面容器中
            leftPage.innerHTML = temp.querySelector("#home-left").innerHTML;
            rightPage.innerHTML = temp.querySelector("#home-right").innerHTML;

            rightPage.onclick = (e) => 
            {
                if (e.target.classList.contains("expand-btn")) 
                {
                    const li = e.target.closest("li");
                    const content = li.querySelector(".expand-content");
                    if (content) 
                    {
                        content.classList.toggle("show");
                    }
                }
            };
        });
}


document.getElementById("home-right").addEventListener("click", e => 
{
    if (e.target.classList.contains("expand-btn")) 
    {
        const li = e.target.closest("li");
        const content = li.querySelector(".expand-content");
        if (content) content.classList.toggle("show");
    }
});

function bindZeroJudgeSelect() {
    bindProblemSelect(
        "problemSelect",
        "BookmarkPages/APCS_Journey/ZerojudgeProblems/"
    );
}

function bindLeetcodeSelect() {
    bindProblemSelect(
        "problemSelect",
        "BookmarkPages/APCS_Journey/LeetcodeProblems/"
    );
}

function bindProblemSelect(selectId, basePath) {
    const select = document.getElementById(selectId);
    if (!select) return;

    select.addEventListener("change", () => {
        const file = select.value;
        if (!file) return;

        fetch(basePath + file)
            .then(res => res.text())
            .then(html => {
                const temp = document.createElement("div");
                temp.innerHTML = html;

                document.querySelector("#problem-desc .block-content").innerHTML =
                    temp.querySelector(".problem-desc").innerHTML;

                document.querySelector("#problem-solution .block-content").innerHTML =
                    temp.querySelector(".problem-solution").innerHTML;

                document.querySelector("#problem-code").innerHTML =
                    temp.querySelector(".problem-code").innerHTML;
            });
    });
}




