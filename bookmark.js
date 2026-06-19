function getList() {
    let result = '';
    const nodeList = document.querySelectorAll("#app > main > div.space-favlist > div.favlist-main > div.fav-list-main > div.items  a:not([class])");
    Array.from(nodeList).forEach(node => {
        result += [
                    node.innerText,
                    '<br><a href="',
                    node.getAttribute('href').match(/[^?]+/)[0],
                    '" target=_blank >',
                    node.getAttribute('href').match(/[^?]+/)[0],
                    '</a><br>'
                ].join('');
    });
    return result;
}

let finalhtml = "";

(function run() {   
    let startPage = parseInt(prompt("请输入开始页码:", "1"));
    let endPage = parseInt(prompt("请输入结束页码:", "10"));
    if (isNaN(startPage) || isNaN(endPage) || startPage > endPage) {
        alert("输入无效！请确保开始页码小于或等于结束页码，且为数字。");
        return;
    }

    let currentPage = startPage;
    console.log(`🚀 自动翻页启动：从第 ${startPage} 页到第 ${endPage} 页，每5秒翻一页。`);
    
   
    const timer = setInterval(() => {

        if (currentPage > endPage) {
            clearInterval(timer); 
            console.log("✅ 自动翻页已完成！");
            document.write(finalhtml);
            return;
        }
        console.log(`⏳ 正在加载第 ${currentPage} 页...`);
        finalhtml +=getList();
        const pageInputs = document.querySelectorAll("#app > main > div.space-favlist > div.favlist-main > div.fav-list-main > div.vui_pagenation.vui_pagenation--jump.card-pagenation > div.vui_pagenation-go > div > div > input");
        const pageInput = pageInputs[0]; 
        if (pageInput) {
            pageInput.focus();
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            nativeInputValueSetter.call(pageInput, currentPage);
            pageInput.dispatchEvent(new Event('input', { bubbles: true }));
            pageInput.dispatchEvent(new Event('change', { bubbles: true }));
            pageInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
            pageInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
            
        } else {
            console.error("❌ 未找到分页输入框，请检查页面结构或类名是否发生变化！");
            clearInterval(timer); 
        }
        currentPage++; 
    }, 5000); 
})();
