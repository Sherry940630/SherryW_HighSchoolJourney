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

function bindProblemSelect(selectId, basePath, defaultPath) {
    const select = document.getElementById(selectId);
    if (!select) return;

    loadDefaultPage(defaultPath);

    select.addEventListener("change", () => {
        const file = select.value;
        if (!file) {
            loadDefaultPage(defaultPath);
            return;
        }

        fetch(basePath + file)
            .then(res => res.text())
            .then(html => {
                const temp = document.createElement("div");
                temp.innerHTML = html;

                // --- 復原 Block 結構 ---
                // 使用 querySelector 找目前的左頁裡面的動態區域
                const leftTarget = leftPage.querySelector("#zj-dynamic-content");
                if (leftTarget) {
                    leftTarget.innerHTML = `
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

                // 復原右頁結構
                rightPage.innerHTML = `
                    <h3>【程式碼】</h3>
                    <div class="block-content" id="problem-code"></div>
                `;

                // 填入內容
                const desc = document.querySelector("#problem-desc .block-content");
                const sol = document.querySelector("#problem-solution .block-content");
                const code = document.querySelector("#problem-code");

                if (desc) desc.innerHTML = temp.querySelector(".problem-desc")?.innerHTML || "";
                if (sol) sol.innerHTML = temp.querySelector(".problem-solution")?.innerHTML || "";
                if (code) code.innerHTML = temp.querySelector(".problem-code")?.innerHTML || "";
            });
    });
}

function loadDefaultPage(path) {
    fetch(path)
        .then(res => res.text())
        .then(html => {
            const temp = document.createElement("div");
            temp.innerHTML = html;

            // 抓取零件檔內容
            const descContent = temp.querySelector(".problem-desc")?.innerHTML || "";
            const solContent = temp.querySelector(".problem-solution")?.innerHTML || "";
            const codeContent = temp.querySelector(".problem-code")?.innerHTML || "";

            // 1. 處理左頁
            const leftTarget = leftPage.querySelector("#zj-dynamic-content");
            if (leftTarget) {
                leftTarget.innerHTML = `
                    <div class="default-text-area">
                        ${descContent}
                        ${solContent}
                    </div>
                `;
            }

            // 2. 處理右頁
            rightPage.innerHTML = codeContent;
        });
}

function loadDefaultPage(path) 
{
    fetch(path)
        .then(res => res.text())
        .then(html => {
            const temp = document.createElement("div");
            temp.innerHTML = html;

            // 1. 處理左頁：直接把內容塞進 zj-dynamic-content，這會暫時覆蓋掉那些 block
            const leftTarget = document.getElementById("zj-dynamic-content");
            if (leftTarget) {
                // 我們把 Default.html 裡的 .problem-desc 和 .problem-solution 合併顯示
                leftTarget.innerHTML = `
                    <div class="default-text-area">
                        ${temp.querySelector(".problem-desc")?.innerHTML || ""}
                        ${temp.querySelector(".problem-solution")?.innerHTML || ""}
                    </div>
                `;
            }

            // 2. 處理右頁：直接覆蓋整個右頁容器，不留「程式碼」標題
            rightPage.innerHTML = temp.querySelector(".problem-code")?.innerHTML || "";
        });
}





