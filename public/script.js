// 초성 리스트. 00 ~ 18
const CHOSUNG_LIST = ['ㄱ', 'ㄱ ㄱ', 'ㄴ', 'ㄷ', 'ㄷ ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅂ ㅂ', 'ㅅ', 'ㅅ ㅅ', 'ㅇ', 'ㅈ', 'ㅈ ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
// 중성 리스트. 00 ~ 20
const JUNGSUNG_LIST = ['ㅏ', 'ㅏ ㅣ', 'ㅑ', 'ㅑ ㅣ', 'ㅓ', 'ㅓ ㅣ', 'ㅕ', 'ㅕ ㅣ', 'ㅗ', 'ㅗ ㅏ', 'ㅗ ㅏㅣ', 'ㅗ ㅣ', 'ㅛ', 'ㅜ', 'ㅜ ㅓ', 'ㅜ ㅓㅣ', 'ㅜ ㅣ', 'ㅠ', 'ㅡ', 'ㅡ ㅣ', 'ㅣ']
// 종성 리스트. 00 ~ 27 + 1(1개 없음)
const JONGSUNG_LIST = [' ', 'ㄱ', 'ㄱ ㄱ', 'ㄱ ㅅ', 'ㄴ', 'ㄴ ㅈ', 'ㄴ ㅎ', 'ㄷ', 'ㄹ', 'ㄹ ㄱ', 'ㄹ ㅁ', 'ㄹ ㅂ', 'ㄹ ㅅ', 'ㄹ ㅌ', 'ㄹ ㅍ', 'ㄹ ㅎ', 'ㅁ', 'ㅂ', 'ㅂ ㅅ', 'ㅅ', 'ㅅ ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

let grid_container;
let keyboard_container;


let answer = {"답":"답","자모":"ㄷㅏㅂ"};
const left_panel = document.getElementById("left-panel");
function LoadGrid(){
    //grid_container 접근
    grid_container = document.getElementById("grid-container");
    keyboard_container = document.getElementById("keyboard-container");

    //grid_container 초기화
    grid_container.innerHTML = "";
    //keyboard_container 초기화
    keyboard_container.innerHTML = `<div class="keyboard-container" id="keyboard-container">
          <div class="keyboard-row">
              <div class="key" id="ㅂ" onclick="InputCell('ㅂ')">ㅂ</div>
              <div class="key" id="ㅈ" onclick="InputCell('ㅈ')">ㅈ</div>
              <div class="key" id="ㄷ" onclick="InputCell('ㄷ')">ㄷ</div>
              <div class="key" id="ㄱ" onclick="InputCell('ㄱ')">ㄱ</div>
              <div class="key" id="ㅅ" onclick="InputCell('ㅅ')">ㅅ</div>
              <div class="key" id="ㅛ" onclick="InputCell('ㅛ')">ㅛ</div>
              <div class="key" id="ㅕ" onclick="InputCell('ㅕ')">ㅕ</div>
              <div class="key" id="ㅑ" onclick="InputCell('ㅑ')">ㅑ</div>
          </div>
          <div class="keyboard-row">
              <div class="key" id="ㅁ" onclick="InputCell('ㅁ')">ㅁ</div>
              <div class="key" id="ㄴ" onclick="InputCell('ㄴ')">ㄴ</div>
              <div class="key" id="ㅇ" onclick="InputCell('ㅇ')">ㅇ</div>
              <div class="key" id="ㄹ" onclick="InputCell('ㄹ')">ㄹ</div>
              <div class="key" id="ㅎ" onclick="InputCell('ㅎ')">ㅎ</div>
              <div class="key" id="ㅗ" onclick="InputCell('ㅗ')">ㅗ</div>
              <div class="key" id="ㅓ" onclick="InputCell('ㅓ')">ㅓ</div>
              <div class="key" id="ㅏ" onclick="InputCell('ㅏ')">ㅏ</div>
              <div class="key" id="ㅣ" onclick="InputCell('ㅣ')">ㅣ</div>
          </div>
          <div class="keyboard-row">
              <div class="key" id="ㅋ" onclick="InputCell('ㅋ')">ㅋ</div>
              <div class="key" id="ㅌ" onclick="InputCell('ㅌ')">ㅌ</div>
              <div class="key" id="ㅊ" onclick="InputCell('ㅊ')">ㅊ</div>
              <div class="key" id="ㅍ" onclick="InputCell('ㅍ')">ㅍ</div>
              <div class="key" id="ㅠ" onclick="InputCell('ㅠ')">ㅠ</div>
              <div class="key" id="ㅜ" onclick="InputCell('ㅜ')">ㅜ</div>
              <div class="key" id="ㅡ" onclick="InputCell('ㅡ')">ㅡ</div>
          </div>
      </div>`;

    //grid cell 설정
    grid_arr = new Array();
    //grid 추가
    let gridchild = document.createElement("div");
    gridchild.className = "grid";
    gridchild.style.gridTemplateColumns = `repeat(${answer["자모"].length}, 50px)`;
    grid_container.append(gridchild);

    //cell 추가
    for(j=0;j<answer["자모"].length;j++){
        grid_arr.push(document.createElement('div'))
        grid_arr[j].className = "cell";
        gridchild.append(grid_arr[j]);
    }
    return;
}

function submit(){
    
    button = document.getElementById("button");
    answer["답"] = button.value;
    processing(answer["답"]);
    //게임 화면으로 화면 체인지
    left_panel.innerHTML=`<div class="header">모오오오오챤</div>
        <div class="grid-container" id="grid-container">
            <div class="grid"><div class="cell"></div></div>
            <div class="grid"><div class="cell"></div></div>
            <div class="grid"><div class="cell"></div></div>
            <div class="grid"><div class="cell"></div></div>
            <div class="grid"><div class="cell"></div></div>
            <div class="grid"><div class="cell"></div></div>
        </div>
        <div class="keyboard-container" id="keyboard-container">
            <div class="keyboard-row">
                <div class="key" id="ㅂ" onclick="InputCell('ㅂ')">ㅂ</div>
                <div class="key" id="ㅈ" onclick="InputCell('ㅈ')">ㅈ</div>
                <div class="key" id="ㄷ" onclick="InputCell('ㄷ')">ㄷ</div>
                <div class="key" id="ㄱ" onclick="InputCell('ㄱ')">ㄱ</div>
                <div class="key" id="ㅅ" onclick="InputCell('ㅅ')">ㅅ</div>
                <div class="key" id="ㅛ" onclick="InputCell('ㅛ')">ㅛ</div>
                <div class="key" id="ㅕ" onclick="InputCell('ㅕ')">ㅕ</div>
                <div class="key" id="ㅑ" onclick="InputCell('ㅑ')">ㅑ</div>
            </div>
            <div class="keyboard-row">
                <div class="key" id="ㅁ" onclick="InputCell('ㅁ')">ㅁ</div>
                <div class="key" id="ㄴ" onclick="InputCell('ㄴ')">ㄴ</div>
                <div class="key" id="ㅇ" onclick="InputCell('ㅇ')">ㅇ</div>
                <div class="key" id="ㄹ" onclick="InputCell('ㄹ')">ㄹ</div>
                <div class="key" id="ㅎ" onclick="InputCell('ㅎ')">ㅎ</div>
                <div class="key" id="ㅗ" onclick="InputCell('ㅗ')">ㅗ</div>
                <div class="key" id="ㅓ" onclick="InputCell('ㅓ')">ㅓ</div>
                <div class="key" id="ㅏ" onclick="InputCell('ㅏ')">ㅏ</div>
                <div class="key" id="ㅣ" onclick="InputCell('ㅣ')">ㅣ</div>
            </div>
            <div class="keyboard-row">
                <div class="key" id="ㅋ" onclick="InputCell('ㅋ')">ㅋ</div>
                <div class="key" id="ㅌ" onclick="InputCell('ㅌ')">ㅌ</div>
                <div class="key" id="ㅊ" onclick="InputCell('ㅊ')">ㅊ</div>
                <div class="key" id="ㅍ" onclick="InputCell('ㅍ')">ㅍ</div>
                <div class="key" id="ㅠ" onclick="InputCell('ㅠ')">ㅠ</div>
                <div class="key" id="ㅜ" onclick="InputCell('ㅜ')">ㅜ</div>
                <div class="key" id="ㅡ" onclick="InputCell('ㅡ')">ㅡ</div>
            </div>
        </div>`;
    LoadGrid();
    starting();
    requestAnimationFrame(Start);
}

async function starting() {
    await fetch(`/start`);
}

function processing(word){
    let unicodeArray = word.split('').map(function(char) {
        let relativeValue=char.charCodeAt(0) - "가".charCodeAt(0);
        return relativeValue;
    });

    // 상대 위치 배열을 자모 분리로 변경
    let unicodeStr = unicodeArray.map(unicodeArrayValue=>{
        let firstV = CHOSUNG_LIST[Math.floor(unicodeArrayValue/588)];
        let secondV = JUNGSUNG_LIST[Math.floor(unicodeArrayValue%588/28)];
        let thirdV = JONGSUNG_LIST[unicodeArrayValue%588%28];
        return firstV +" "+ secondV +" "+ thirdV;
    }).join(' ').trim().split(/\s+/);

    answer["자모"] = unicodeStr;
    // 문자열을 자모 분리한 출력
    console.log(`변환된 자모 : ${unicodeStr}`);
}

async function Start() {
    var chat= fetch(`/chat`).then(res=>{res.json()});
    var name = chat['names'];
    chat = chat['chats'];

    console.log("테스팅시작");
    console.log(chat);
    console.log(name);
    console.log("테스팅끝");
    
    chatContainer.innerHTML = "";
    var correct = 0;
    for(i=0;i<chat.length;i++){
        var chats=document.createElement('div');
        chats.class="chat-message";
        var color_of_message = "#dd3333";//빨간색
        if(chat[i] == answer["답"]){
            color_of_message = "#64bd03";//초록색
            correct=1;
        }
        chats.innerHTML=`<div class="chat-nickname"><font color="${color_of_message}">${name[i]}</font></div>
            <div class="chat-content">${chat[i]}</div>`;
        chatContainer.append(chats);
        if(correct==1){
            left_panel.innerHTML=`<h2>${name[i]}님 정답!<h2>`;
            correct=0;
            return;
        }
    }

    requestAnimationFrame(Start);
}

console.log("yay");

function InputCell(word){
    const class_ = document.getElementById(word).className;
    if(class_=="key"){
        if(answer['자모'].indexOf(word)!=-1){
            class_="key present";
        }else{
            class_="key absent";
        }
    }
    else if(class_ == "key present"){
        for(i=0;i<answer['자모'].length;i++){
            if(answer['자모'][i]==word){
                grid_container[0][i].className = answer['자모'][i];
                class_ = "key correct";
            }
        }
        if(class_ != "key correct"){
            alert("오류 발생:게임이 정상적으로 진행되고 있지 않습니다.");
        }
    }
    
}
