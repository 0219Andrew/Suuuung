// 초성 리스트. 00 ~ 18
const CHOSUNG_LIST = ['ㄱ', 'ㄱ ㄱ', 'ㄴ', 'ㄷ', 'ㄷ ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅂ ㅂ', 'ㅅ', 'ㅅ ㅅ', 'ㅇ', 'ㅈ', 'ㅈ ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
// 중성 리스트. 00 ~ 20
const JUNGSUNG_LIST = ['ㅏ', 'ㅏ ㅣ', 'ㅑ', 'ㅑ ㅣ', 'ㅓ', 'ㅓ ㅣ', 'ㅕ', 'ㅕ ㅣ', 'ㅗ', 'ㅗ ㅏ', 'ㅗ ㅏㅣ', 'ㅗ ㅣ', 'ㅛ', 'ㅜ', 'ㅜ ㅓ', 'ㅜ ㅓㅣ', 'ㅜ ㅣ', 'ㅠ', 'ㅡ', 'ㅡ ㅣ', 'ㅣ']
// 종성 리스트. 00 ~ 27 + 1(1개 없음)
const JONGSUNG_LIST = [' ', 'ㄱ', 'ㄱ ㄱ', 'ㄱ ㅅ', 'ㄴ', 'ㄴ ㅈ', 'ㄴ ㅎ', 'ㄷ', 'ㄹ', 'ㄹ ㄱ', 'ㄹ ㅁ', 'ㄹ ㅂ', 'ㄹ ㅅ', 'ㄹ ㅌ', 'ㄹ ㅍ', 'ㄹ ㅎ', 'ㅁ', 'ㅂ', 'ㅂ ㅅ', 'ㅅ', 'ㅅ ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

let grid_container;
let keyboard_container;
let chatterlist = {};
let vote = {
    "ㅂ":0,
    "ㅈ":0,
    "ㄷ":0,
    "ㄱ":0,
    "ㅅ":0,
    "ㅛ":0,
    "ㅕ":0,
    "ㅑ":0,
    "ㅁ":0,
    "ㄴ":0,
    "ㅇ":0,
    "ㄹ":0,
    "ㅎ":0,
    "ㅗ":0,
    "ㅓ":0,
    "ㅏ":0,
    "ㅣ":0,
    "ㅋ":0,
    "ㅌ":0,
    "ㅊ":0,
    "ㅍ":0,
    "ㅠ":0,
    "ㅜ":0,
    "ㅡ":0,
}
let vote_html={};
let winner_list={};

let interval;

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
    left_panel.innerHTML=`<div class="header">수우우우웅</div>
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
    Object.keys(vote).forEach(element => {
        vote_html[element] = document.getElementById(element);
    });
    LoadGrid();
    starting();
}

async function starting() {
    chatterlist={};
    vote = {
        "ㅂ":0,
        "ㅈ":0,
        "ㄷ":0,
        "ㄱ":0,
        "ㅅ":0,
        "ㅛ":0,
        "ㅕ":0,
        "ㅑ":0,
        "ㅁ":0,
        "ㄴ":0,
        "ㅇ":0,
        "ㄹ":0,
        "ㅎ":0,
        "ㅗ":0,
        "ㅓ":0,
        "ㅏ":0,
        "ㅣ":0,
        "ㅋ":0,
        "ㅌ":0,
        "ㅊ":0,
        "ㅍ":0,
        "ㅠ":0,
        "ㅜ":0,
        "ㅡ":0,
    }
    await fetch(`/start`);
    clearInterval(interval);
    interval = setInterval(()=>Start(),500);
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
}

async function Start() {
    var chat= await fetch('/chat').then(res => res.json());
    var name = chat['names'];
    chat = chat['chats'];
    console.log(chat);

    var is =0;
    if(!(name[name.length-1] in chatterlist)){
        chatterlist[name[name.length-1]] = '';
    }
    
    // chatContainer.innerHTML = "";
    var correct = 0;
    var initial_color = "#dd3333";//빨간색
    var initial_nickname_color = "#b2b2b2";//회색
    for(i=0;i<chat.length;i++){
        var chats=document.createElement('div');
        chats.class="chat-message";
        var color_of_message = initial_color;
        var color_of_nickname = initial_nickname_color;
        
        if(chat[i] == answer["답"]){
            color_of_message = "#64bd03";//초록색
            color_of_nickname = "#1f9e00";//진한초록
            correct=1;

            await fetch(`/winner?userid=${encodeURIComponent(name[i])}&answer=${encodeURIComponent(answer["답"])}`);

            // if(!(name[i] in winner_list)){
            //     winner_list[name[i]] = 0;
            // }
            // winner_list[name[i]]+=1;
            clearInterval(interval);
        }
        else if(chat[i] == "!정답자"){
            chat[i]=``;
            data =  await fetch('/database').then(res => {return res.json();});
            for(j=0;j<data.length;j++){
                chat[i]+=`${data[j]['user_id']}:${data[j]['win_number']}
                `;
            }
        }
        /*else if(chat[i] == "!투표시작"){
            vote = {
                "ㅂ":0,
                "ㅈ":0,
                "ㄷ":0,
                "ㄱ":0,
                "ㅅ":0,
                "ㅛ":0,
                "ㅕ":0,
                "ㅑ":0,
                "ㅁ":0,
                "ㄴ":0,
                "ㅇ":0,
                "ㄹ":0,
                "ㅎ":0,
                "ㅗ":0,
                "ㅓ":0,
                "ㅏ":0,
                "ㅣ":0,
                "ㅋ":0,
                "ㅌ":0,
                "ㅊ":0,
                "ㅍ":0,
                "ㅠ":0,
                "ㅜ":0,
                "ㅡ":0,
            };
            initial_color = "#3d3d3d";//회색
            color_of_message = "#dd9933"//주황색
        }else if(initial_color == "#3d3d3d" && chat[i].length == 1){
            if(chat[i] in vote){
                color_of_message = "#e901af";//진한핑크
                if(chatterlist[name[i]] != ''){
                    vote[chatterlist[name[i]]]-=1;
                }
                chatterlist[name[i]]=chat[i];
                vote[chat[i]]+=1;
                console.log(vote[chat[i]]);
            }
        }else if(initial_color == "#3d3d3d" && chat[i] == "!투표종료"){
            vote = {
                "ㅂ":0,
                "ㅈ":0,
                "ㄷ":0,
                "ㄱ":0,
                "ㅅ":0,
                "ㅛ":0,
                "ㅕ":0,
                "ㅑ":0,
                "ㅁ":0,
                "ㄴ":0,
                "ㅇ":0,
                "ㄹ":0,
                "ㅎ":0,
                "ㅗ":0,
                "ㅓ":0,
                "ㅏ":0,
                "ㅣ":0,
                "ㅋ":0,
                "ㅌ":0,
                "ㅊ":0,
                "ㅍ":0,
                "ㅠ":0,
                "ㅜ":0,
                "ㅡ":0,
            };
            initial_color = "#dd3333";
        }
        */

        chats.innerHTML=`<div class="chat-nickname"><font color="${color_of_nickname}"><b>${name[i]}</b></font></div>
            <div class="chat-content"><font color="${color_of_message}"><b>${chat[i]}</b></font></div>
            <br>`;
        chatContainer.append(chats);
        while(chatContainer.children.length>50){
            chatContainer.removeChild(chatContainer.firstElementChild);
        }
        if(correct==1){
            left_panel.innerHTML=`<br><br><br><h1><font color="#1f9e00"><b>${name[i]}</b></font>님 정답!<h>`;
            correct=0;
            while(interval == null){
                console.log("제거");
                clearInterval(interval);
            }
            console.log("dk",interval);
            return;
        }
    }

    /*
    Object.keys(vote).forEach(element => {
        if(vote[element]!=0){
            console.log(element);
            vote_html[element].innerHTML=`${element}<h6>${vote[element]}</h6>`;
        }
    });
    */
}

function InputCell(word){
    const class_ = document.getElementById(word);
    if(class_.className=="key"){
        if(answer['자모'].indexOf(word)!=-1){
            class_.className="key present";
        }else{
            class_.className="key absent";
        }
    }
    else if(class_.className == "key present"){
        for(i=0;i<answer['자모'].length;i++){
            if(answer['자모'][i]==word){
                grid_container.firstElementChild.children[i].innerHTML = answer['자모'][i];
                class_.className = "key correct";
            }
        }
        if(class_.className != "key correct"){
            alert("오류 발생:게임이 정상적으로 진행되고 있지 않습니다.");
        }
    }
}

window.addEventListener("keydown", (e) => {
    if(e.key == "Escape"){
        left_panel.innerHTML=`<div class="header">정답 입력하기</div>
            <form action="">
                <input class="button" type="text" placeholder="정답" id="button">
                
                <div class="keyboard-container" id="keyboard-container">
                <div class="keyboard-row">
                    <div class="key" id="submit" onclick="submit()">확정</div>
                </div>
                </div>
            </form>
            <br>
            <h4>정답을 입력하면 시청자들이 맞출겁니다!</h4>`;
    }
});