var input = document.querySelector('#input');
var btn = document.querySelector('#btn');
var list = document.querySelector('#list');
var removeAll = document.querySelector('#removeAll');

//新增一陣列放資料
var data = [];

btn.addEventListener('click', createList);
removeAll.addEventListener('click', removeAllList);

function createList(){
    var todo = input.value;
    //先更新資料
    data.push({
        text: todo
    });
    //再執行畫面
    render();
}

//傳統寫法
// function createList(){
//     var todo = input.value;
//     var todolist = list.innerHTML;
//     var string = todolist + `<li>${todo}
//         <button class="btns">移除</button>
//     </li>`;
//     list.innerHTML = string;
//     var btns = document.querySelectorAll('.btns');//抓下來的所有按鈕會以陣列的形式呈現，要用forEach
//     btns.forEach(function(btn) {
//         btn.addEventListener('click', removeList)
// });
// }


function removeList(e){
    // e.target.parentNode.remove();//操作畫面
    //e是指滑鼠事件
    //parentNode是指外層元素（這邊是li）
    console.log(e.target.dataset.id);//抓出該筆資料的索引值
    data.splice(e.target.dataset.id, 1);//把那筆資料從陣列中移除
    render();//刷新畫面
}

function finish(e){
    var finishitem = e.target.dataset.id
    var string = e.target.parentNode.textContent;
    console.log(string);
}

function removeAllList(){
    data.length = 0;
    render();
}

function render(){
    input.value = '';
    var string = '';
    data.forEach(function(item,i){//把陣列中的資料(li)逐一放進ul中
        string = string + `<li><div class="todoitem">
            <input type="checkbox" class="checkbox" data-id="${i}">${item.text}</div>
            <button class="btns" data-id="${i}">X</button>
        </li>`
    });
    list.innerHTML = string;

    var btns = document.querySelectorAll('.btns');//抓下來的所有按鈕會以陣列的形式呈現，要用forEach
    btns.forEach(function(btn) {
        btn.addEventListener('click', removeList)
    });

    var taskMount = data.length;
    var mountString = `還有${taskMount}筆任務`;
    mount.innerHTML = mountString;

    var checkbox = document.querySelectorAll('.checkbox');//抓下來的所有按鈕會以陣列的形式呈現，要用forEach
    checkbox.forEach(function(item) {
        item.addEventListener('click', finish)
    });
}