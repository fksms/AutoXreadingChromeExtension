//sleep用関数
function sleep(time) {
    return new Promise((resolve, reject) => { setTimeout(resolve, time); });
}

//ページ上のNextボタンを検索
function search_next_button() {
    return document.getElementById('myNxtBtn');
}

//ページ上のCloseボタンを検索
function search_close_button() {
    return document.getElementById('closeBtn');
}

//次のページへ
function page_next(next_xpath) {
    next_xpath.click();
}

//最後のページまで読み飛ばす
function read_to_end(read_interval) {
    var next_xpath;
    var word_count;

    return new Promise((resolve, reject) => {

        var timerId = setInterval(function () {
            next_xpath = search_next_button();
            word_count = document.getElementById('wordbreaks').firstElementChild.innerHTML.split('/');
            current_words = word_count[0];
            total_words = word_count[1];
            if (current_words === total_words) {
                clearInterval(timerId);
                resolve();
            }
            page_next(next_xpath);
        }, read_interval);

    });
}

//Readingを中断
function stop_reading() {
    var close_xpath = search_close_button();
    close_xpath.click();
}

//main関数
async function skip(read_interval) {

    await read_to_end(read_interval);
    await sleep(1000);
    stop_reading();
}

//var read_interval = 1; //ページ送り間隔[sec]
skip(read_interval * 1000);