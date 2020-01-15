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

//問題自動解答
async function question_solver(winObj) {
    var radio_xpath;
    var next_xpath;

    for (var j = 0; j < 5; j++) {
        radio_xpath = document.getElementById('quest_answer_' + String(j + 1));
        radio_xpath.click();
        for (var i = 0; i < winObj.length; i++) {
            radio_xpath = winObj[i].document.getElementById('quest_answer_' + String(j + 1));
            radio_xpath.click();
        }
        next_xpath = document.getElementById('btn_next_' + String(j + 1));
        next_xpath.firstElementChild.firstElementChild.firstElementChild.click();
        for (var i = 0; i < winObj.length; i++) {
            next_xpath = winObj[i].document.getElementById('btn_next_' + String(j + 1));
            next_xpath.firstElementChild.firstElementChild.firstElementChild.click();
        }
        await sleep(300);
    }

}

//main関数
async function solve(tabs) {
    var url = location.href;

    var winObj = tab_duplication(url, tabs);
    await sleep(5000);
    question_solver(winObj);
    await sleep(2000);
    tab_close(winObj);
}

//var tabs = 9; //開くタブの数
solve(tabs);