import express from 'express';
//const express = require("express");
const app= express();
app.set('view engine', 'ejs');
app.set('views','./views');

let url;
let chats = [];

// 초성 리스트. 00 ~ 18
const CHOSUNG_LIST = ['ㄱ', 'ㄱ ㄱ', 'ㄴ', 'ㄷ', 'ㄷ ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅂ ㅂ', 'ㅅ', 'ㅅ ㅅ', 'ㅇ', 'ㅈ', 'ㅈ ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
// 중성 리스트. 00 ~ 20
const JUNGSUNG_LIST = ['ㅏ', 'ㅏ ㅣ', 'ㅑ', 'ㅑ ㅣ', 'ㅓ', 'ㅓ ㅣ', 'ㅕ', 'ㅕ ㅣ', 'ㅗ', 'ㅗ ㅏ', 'ㅗ ㅏㅣ', 'ㅗ ㅣ', 'ㅛ', 'ㅜ', 'ㅜ ㅓ', 'ㅜ ㅓㅣ', 'ㅜ ㅣ', 'ㅠ', 'ㅡ', 'ㅡ ㅣ', 'ㅣ']
// 종성 리스트. 00 ~ 27 + 1(1개 없음)
const JONGSUNG_LIST = [' ', 'ㄱ', 'ㄱ ㄱ', 'ㄱ ㅅ', 'ㄴ', 'ㄴ ㅈ', 'ㄴ ㅎ', 'ㄷ', 'ㄹ', 'ㄹ ㄱ', 'ㄹ ㅁ', 'ㄹ ㅂ', 'ㄹ ㅅ', 'ㄹ ㅌ', 'ㄹ ㅍ', 'ㄹ ㅎ', 'ㅁ', 'ㅂ', 'ㅂ ㅅ', 'ㅅ', 'ㅅ ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

let answer = {"답":"답","자모":"ㄷㅏㅂ"};

function LoadGrid(){
    //grid_container 접근
    grid_container = document.getElementById("grid-container");
    keyboard_container = document.getElementById("keyboard-container");

    //grid_container 초기화
    grid_container.innerHTML = "";
    //keyboard_container 초기화
    keyboard_container.innerHTML = `<div class="keyboard-row">
            <div class="key" id="ㅂ" onclick="InputCell('q')">ㅂ</div>
            <div class="key" id="ㅈ" onclick="InputCell('w')">ㅈ</div>
            <div class="key" id="ㄷ" onclick="InputCell('e')">ㄷ</div>
            <div class="key" id="ㄱ" onclick="InputCell('r')">ㄱ</div>
            <div class="key" id="ㅅ" onclick="InputCell('t')">ㅅ</div>
            <div class="key" id="ㅛ" onclick="InputCell('y')">ㅛ</div>
            <div class="key" id="ㅕ" onclick="InputCell('u')">ㅕ</div>
            <div class="key" id="ㅑ" onclick="InputCell('i')">ㅑ</div>
        </div>
        <div class="keyboard-row">
            <div class="key" id="ㅁ" onclick="InputCell('a')">ㅁ</div>
            <div class="key" id="ㄴ" onclick="InputCell('s')">ㄴ</div>
            <div class="key" id="ㅇ" onclick="InputCell('d')">ㅇ</div>
            <div class="key" id="ㄹ" onclick="InputCell('f')">ㄹ</div>
            <div class="key" id="ㅎ" onclick="InputCell('g')">ㅎ</div>
            <div class="key" id="ㅗ" onclick="InputCell('h')">ㅗ</div>
            <div class="key" id="ㅓ" onclick="InputCell('j')">ㅓ</div>
            <div class="key" id="ㅏ" onclick="InputCell('k')">ㅏ</div>
            <div class="key" id="ㅣ" onclick="InputCell('l')">ㅣ</div>
        </div>
        <div class="keyboard-row">
            <div class="key" id="ㅋ" onclick="InputCell('z')">ㅋ</div>
            <div class="key" id="ㅌ" onclick="InputCell('x')">ㅌ</div>
            <div class="key" id="ㅊ" onclick="InputCell('c')">ㅊ</div>
            <div class="key" id="ㅍ" onclick="InputCell('v')">ㅍ</div>
            <div class="key" id="ㅠ" onclick="InputCell('b')">ㅠ</div>
            <div class="key" id="ㅜ" onclick="InputCell('n')">ㅜ</div>
            <div class="key" id="ㅡ" onclick="InputCell('m')">ㅡ</div>
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
    left_panel = document.getElementById("left-panel");
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
                <div class="key" id="ㅂ" onclick="InputCell('q')">ㅂ</div>
                <div class="key" id="ㅈ" onclick="InputCell('w')">ㅈ</div>
                <div class="key" id="ㄷ" onclick="InputCell('e')">ㄷ</div>
                <div class="key" id="ㄱ" onclick="InputCell('r')">ㄱ</div>
                <div class="key" id="ㅅ" onclick="InputCell('t')">ㅅ</div>
                <div class="key" id="ㅛ" onclick="InputCell('y')">ㅛ</div>
                <div class="key" id="ㅕ" onclick="InputCell('u')">ㅕ</div>
                <div class="key" id="ㅑ" onclick="InputCell('i')">ㅑ</div>
            </div>
            <div class="keyboard-row">
                <div class="key" id="ㅁ" onclick="InputCell('a')">ㅁ</div>
                <div class="key" id="ㄴ" onclick="InputCell('s')">ㄴ</div>
                <div class="key" id="ㅇ" onclick="InputCell('d')">ㅇ</div>
                <div class="key" id="ㄹ" onclick="InputCell('f')">ㄹ</div>
                <div class="key" id="ㅎ" onclick="InputCell('g')">ㅎ</div>
                <div class="key" id="ㅗ" onclick="InputCell('h')">ㅗ</div>
                <div class="key" id="ㅓ" onclick="InputCell('j')">ㅓ</div>
                <div class="key" id="ㅏ" onclick="InputCell('k')">ㅏ</div>
                <div class="key" id="ㅣ" onclick="InputCell('l')">ㅣ</div>
            </div>
            <div class="keyboard-row">
                <div class="key" id="ㅋ" onclick="InputCell('z')">ㅋ</div>
                <div class="key" id="ㅌ" onclick="InputCell('x')">ㅌ</div>
                <div class="key" id="ㅊ" onclick="InputCell('c')">ㅊ</div>
                <div class="key" id="ㅍ" onclick="InputCell('v')">ㅍ</div>
                <div class="key" id="ㅠ" onclick="InputCell('b')">ㅠ</div>
                <div class="key" id="ㅜ" onclick="InputCell('n')">ㅜ</div>
                <div class="key" id="ㅡ" onclick="InputCell('m')">ㅡ</div>
            </div>
        </div>`;
    LoadGrid();
    Start();
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
    location.href+='/play';
}

app.get("/", (req, res) => {
    url = location.href;
    res.sendFile(__dirname, "./input_page.html"); // fs를 안 써도 fs모듈 사용
});

app.get("/play", (req, res) => {
    console.log("href 통한 이동");
    res.sendFile(__dirname, "./index.html"); // fs를 안 써도 fs모듈 사용
});

async function Start() {
    const chzzk = require("chzzk");
    const chatContainer = document.getElementById("chatContainer");

    const client = new chzzk.ChzzkClient({
        baseUrls: {
            chzzkBaseUrl: "https://api.chzzk.naver.com",
            gameBaseUrl: "https://comm-api.game.naver.com/nng_main"
        }
    })

    // 채널 검색
    const result = await client.search.channels("모모챤")
    const channel = result.channels[0]

    // 설정된 방송 정보, 방송 중이 아닐 경우에도 정보가 존재할 수 있음
    const liveDetail = await client.live.detail(channel.channelId)

    if (liveDetail) {
        const media = liveDetail.livePlayback.media // 방송 중이 아닐 경우 비어있음
        const hls = media.find(media => media.mediaId === "HLS") // HLS, LLHLS

        if (hls) {
            const m3u8 = await client.fetch(hls.path).then(r => r.text())
            console.log(m3u8)
        }
    }

    // 채팅 인스턴스 생성
    const chzzkChat = client.chat({
        channelId: channel.channelId,
        // chatChannelId 의 변경을 감지하기 위한 polling 요청의 주기 (선택사항, ms 단위)
        // channelId를 지정할 경우 자동으로 30초로 설정됨, 0초로 설정 시 polling 요청을 하지 않음
        pollInterval: 30 * 1000
    })

    chzzkChat.on('connect', () => {
        console.log('Connected')

        // 최근 50개의 채팅 및 고정 메시지를 요청 (선택사항, 도네 및 시스템 메시지 포함이므로 주의)
        chzzkChat.requestRecentChat(50)
    })

    // 재연결 (방송 시작 시)
    chzzkChat.on('reconnect', newChatChannelId => {
        console.log(`Reconnected to ${newChatChannelId}`)
    })

    // 일반 채팅
    chzzkChat.on('chat', chat => {
        const message = chat.hidden ? "[블라인드 처리 됨]" : chat.message
        console.log(`${chat.profile.nickname}: ${message}`)
        chats.push(document.createElement('div'));
        chats[chats.length-1].class="chat-message";
        var color_of_message = "#dd3333";//빨간색
        if(message == answer["답"]){
            color_of_message = "#64bd03";//초록색
        }
        chats[chats.length-1].innerHTML=`<div class="chat-nickname"><font color="${color_of_message}">${chat.profile.nickname}</font></div>
          <div class="chat-content">${message}</div>`;
        if(chats.length>50){
            chats.shift();
            chatContainer.innerHTML=chats;
        }
        else{
            chatContainer.append(chats[chats.length-1]);
        }

        // 유저의 팔로우 일시 불러오기
        // client.chat.profileCard(chzzkChat.chatChannelId, chat.profile.userIdHash).then(profile => {
        //     const following = profile.streamingProperty.following
        //     console.log(following ? `${following.followDate} 에 팔로우 함` : "팔로우 안함")
        // })
    })

    // 후원 채팅
    chzzkChat.on('donation', donation => {
        console.log(`\n>> ${donation.profile?.nickname ?? "익명의 후원자"} 님의 ${donation.extras.payAmount}원 ${chzzk.donationTypeName(donation.extras.donationType)}`)
        if (donation.message) {
            console.log(`>> ${donation.message}`)
        }
        console.log()
    })

    // 구독
    chzzkChat.on('subscription', subscription => {
        console.log(`${subscription.profile.nickname} 님이 ${subscription.extras.month} 개월 동안 ${subscription.extras.tierName} 구독중`)
    })

    // 시스템 메시지 (채팅 제한, 활동 제한, 운영자 임명 등)
    chzzkChat.on('systemMessage', systemMessage => {
        console.log(systemMessage.extras.description)
    })

    // 고정 메시지
    chzzkChat.on('notice', notice => {
        // 고정 해제 시 null
        console.log(notice)
    })

    // RAW 이벤트
    // chzzkChat.on('raw', raw => {
    //     console.log(raw)
    // })

    // 채팅 연결
    await chzzkChat.connect()
}
