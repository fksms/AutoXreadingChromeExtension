//sleep用関数
function sleep(time) {
    return new Promise((resolve, reject) => { setTimeout(resolve, time); });
}

//タブの複製
function tab_duplication(url, tabs) {
    winObj = new Array();

    for (var i = 0; i < tabs; i++) {
        winObj[i] = window.open(url, i);
    }

    return winObj;
}

//複製したタブを全て閉じる
function tab_close(winObj) {
    for (var i = 0; i < winObj.length; i++) {
        winObj[i].close();
    }
}

//ページ上のCloseボタンを検索
function search_close_button() {
    return document.getElementById('closeBtn');
}

//Readingを中断
function stop_reading() {
    var close_xpath = search_close_button();
    close_xpath.click();
}

//main関数
async function delay(tabs, time) {
    var url = location.href;

    var winObj = tab_duplication(url, tabs);
    await sleep(time);
    tab_close(winObj);
    await sleep(1000);
    stop_reading();
}

//var tabs = 60; //開くタブの数
//var time = 60; //待機時間[sec]
delay(tabs, time * 1000);