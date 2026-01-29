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

            document.querySelectorAll(".tab-group.open").forEach(openGroup => 
            {
                if (openGroup !== group) 
                {
                    openGroup.classList.remove("open");
                }
            });

            group.classList.toggle("open");
        });
    });
    loadHomePage(); 
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

function loadHomePage() 
{
    fetch("BookmarkPages/Home.html")
        .then(res => res.text())
        .then(html => 
        {
            const temp = document.createElement("div");
            temp.innerHTML = html;

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
        "BookmarkPages/APCS_Journey/ZerojudgeProblems/",
        "BookmarkPages/APCS_Journey/ZerojudgeProblems/ZerojudgeDefault.html"
    );
}

function bindLeetcodeSelect() {
    bindProblemSelect(
        "problemSelect",
        "BookmarkPages/APCS_Journey/LeetcodeProblems/",
        "BookmarkPages/APCS_Journey/LeetcodeProblems/LeetcodeDefault.html"
    );
}

function bindProblemSelect(selectId, basePath, defaultPath) 
{
    const select = document.getElementById(selectId);
    if (!select) return;

    loadDefaultPage(defaultPath);

    select.addEventListener("change", () => 
        {
            const file = select.value;
            if (!file) 
            {
                loadDefaultPage(defaultPath);
                return;
            }

            fetch(basePath + file)
            .then(res => res.text())
            .then(html => 
            {
                const temp = document.createElement("div");
                temp.innerHTML = html;

                const leftTarget = leftPage.querySelector("#zj-dynamic-content");
                if (leftTarget) 
                {
                    leftTarget.innerHTML = 
                    `
                        <div class="block block-small" id="problem-desc">
                            <h3>題目敘述</h3>
                            <div class="block-content"></div>
                        </div>
                        <div class="block block-large" id="problem-solution">
                            <h3>解題思路</h3>
                            <div class="block-content"></div>
                        </div>
                    `;
                }

                rightPage.innerHTML = 
                `
                    <h3>【程式碼】</h3>
                    <div class="block-content" id="problem-code"></div>
                `;

                const desc = document.querySelector("#problem-desc .block-content");
                const sol = document.querySelector("#problem-solution .block-content");
                const code = document.querySelector("#problem-code");

                if (desc) desc.innerHTML = temp.querySelector(".problem-desc")?.innerHTML || "";
                if (sol) sol.innerHTML = temp.querySelector(".problem-solution")?.innerHTML || "";
                if (code) code.innerHTML = temp.querySelector(".problem-code")?.innerHTML || "";
            });
    });
}

function loadDefaultPage(path) 
{
    fetch(path)
        .then(res => res.text())
        .then(html => {
            const temp = document.createElement("div");
            temp.innerHTML = html;

            const descContent = temp.querySelector(".problem-desc")?.innerHTML || "";
            const solContent = temp.querySelector(".problem-solution")?.innerHTML || "";
            const codeContent = temp.querySelector(".problem-code")?.innerHTML || "";
            const leftTarget = leftPage.querySelector("#zj-dynamic-content");
            if (leftTarget) 
            {
                leftTarget.innerHTML = 
                `
                    <div class="default-text-area">
                        ${descContent}
                        ${solContent}
                    </div>
                `;
            }
            rightPage.innerHTML = codeContent;
        });
}

function loadDefaultPage(path) 
{
    fetch(path)
        .then(res => res.text())
        .then(html => 
        {
            const temp = document.createElement("div");
            temp.innerHTML = html;

            const leftTarget = document.getElementById("zj-dynamic-content");
            if (leftTarget) 
            {
                leftTarget.innerHTML = 
                `
                    <div class="default-text-area">
                        ${temp.querySelector(".problem-desc")?.innerHTML || ""}
                        ${temp.querySelector(".problem-solution")?.innerHTML || ""}
                    </div>
                `;
            }
            rightPage.innerHTML = temp.querySelector(".problem-code")?.innerHTML || "";
        });
}

document.addEventListener("click", (e) => 
{
    if (e.target.tagName === 'IMG' && e.target.closest('.page')) 
    {
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("img01");
        const captionText = document.getElementById("caption");

        modal.style.display = "block";
        modalImg.src = e.target.src;
        captionText.innerHTML = e.target.alt || "圖片預覽";
    }
});

document.addEventListener("click", (e) => 
{
    const modal = document.getElementById("imageModal");
    if (e.target.classList.contains('modal') || e.target.classList.contains('close')) 
    {
        modal.style.display = "none";
    }
});



