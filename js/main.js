/* main.js */

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
});
