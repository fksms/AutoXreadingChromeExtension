$(function () {
    $("#exec_delay").click(function () { exec_delay(); });
    $("#exec_skip").click(function () { exec_skip(); });
    $("#exec_solve").click(function () { exec_solve(); });
    $("#go_github").click(function () { go_github(); });
});

function get_url_from_current_tab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            resolve(tabs[0].url);
        });
    });
}

function get_id_from_current_tab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            resolve(tabs[0].id);
        });
    });
}

//https://qiita.com/yuukive/items/6fa685ef3a1f62e6c383
//current_tab_id: スクリプトを実行したいタブのID
//function_name: 実行したいコード
//file_name: 実行したいコードが含まれているファイルの名前

function run_script_in_current_tab(current_tab_id, function_name, file_name) {
    return new Promise((resolve, reject) => {
        chrome.tabs.executeScript(current_tab_id, {
            code: function_name
        }, () => {
            chrome.tabs.executeScript(current_tab_id, {
                file: file_name
            })
        });
    });
}

//delay実行
async function exec_delay() {
    var current_tab_id = await get_id_from_current_tab();
    var tabs = document.getElementById('delay_arg_1').value;
    var time = document.getElementById('delay_arg_2').value;
    var function_name = 'var tabs = ' + String(tabs) + '; var time = ' + String(time) + ';'
    var file_name = 'scripts/delay.js';
    await run_script_in_current_tab(current_tab_id, function_name, file_name);
}

//skip実行
async function exec_skip() {
    var current_tab_id = await get_id_from_current_tab();
    var read_interval = document.getElementById('skip_arg_1').value;
    var function_name = 'var read_interval = ' + String(read_interval) + ';'
    var file_name = 'scripts/skip.js';
    await run_script_in_current_tab(current_tab_id, function_name, file_name);
}

//solve実行
async function exec_solve() {
    var current_tab_id = await get_id_from_current_tab();
    var tabs = document.getElementById('solve_arg_1').value;
    var function_name = 'var tabs = ' + String(tabs) + ';'
    var file_name = 'scripts/solve.js';
    await run_script_in_current_tab(current_tab_id, function_name, file_name);
}

//githubへ誘導
function go_github() {
    chrome.tabs.create({ "url": "https://github.com/daianjibetu/AutoXreadingChromeExtension" });
}
