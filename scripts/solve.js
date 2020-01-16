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
function question_solver(winObj) {
    var radio_button;
    var next_button;

    return new Promise(async (resolve, reject) => {

        for (var j = 0; j < 5; j++) {
            for (var i = 0; i < winObj.length; i++) {
                radio_button = winObj[i].document.getElementById('quest_answer_' + String(j + 1));
                radio_button.click();
            }
            await sleep(500);
            for (var i = 0; i < winObj.length; i++) {
                next_button = winObj[i].document.getElementById('btn_next_' + String(j + 1));
                next_button.firstElementChild.firstElementChild.firstElementChild.click();
            }
            await sleep(500);
        }
        resolve();

    });
}

//main関数
async function solve(tabs) {
    var url = location.href;

    var winObj = tab_duplication(url, tabs);
    await sleep(5000);
    await question_solver(winObj);
    winObj = tab_duplication("", tabs); //そのままだとタブを消せないので空タブで上書き
    await sleep(500);
    tab_close(winObj);
    await sleep(500);
    location.href = 'https://xreading.com/books/book_index'
}

//var tabs = 10; //開くタブの数
solve(tabs);