const maraidb = require('./database/connect/mariadb');
maraidb.connect();
const express = require("express");
const chzzk = require('chzzk');
const app= express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.json());
var chats=[];
var names=[];
var start=0;

app.get('/', (req, res) => {
    res.sendFile(__dirname, "/index.html"); // fs를 안 써도 fs모듈 사용
});

app.get('/start',(req, res) => {
    chats = [];
    names = [];
    res.send("완료");
});

app.get('/chat',(req, res) => {
    res.json({chats:chats,names:names});
    chats=[];
    names=[];
});

app.get('/database', (req, res) => {
    let data;
    maraidb.query("SELECT * FROM winners ORDER BY win_number DESC", function(err, rows){
        console.log(rows);
        data = rows;
        res.json(data);
    });
})

app.get('/winner/:userid', function (req, res) {
    var params = req.params;
    console.log(decodeURIComponent(params.userid));
    let data;
    maraidb.query(`SELECT EXISTS (SELECT * FROM winners WHERE user_id = '${decodeURIComponent(params.userid)}' limit 1) as success`, function(err, rows){
        console.log(rows);
        data = rows;
    });
    console.log(`rows:${rows}`);
    if(rows==0){
        maraidb.query(`INSERT INTO winners(user_id,win_number) VALUES ('${decodeURIComponent(params.userid)}',100)`);
    }else{
        maraidb.query(`UPDATE winners SET win_number = winners.win_number + 1 WHERE user_id =  '${decodeURIComponent(params.userid)}'`);
    }
   
    res.send("Winner Name : " + decodeURIComponent(params.userid));
});

async function Start() {

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
    })

    // 재연결 (방송 시작 시)
    chzzkChat.on('reconnect', newChatChannelId => {
        console.log(`Reconnected to ${newChatChannelId}`)
    })

    // 일반 채팅
    chzzkChat.on('chat', chat => {
        const message = chat.hidden ? "[블라인드 처리 됨]" : chat.message
        chats.push(message);
        console.log(`${chat.profile.nickname}: ${message}/${chats.length}`)
        names.push(chat.profile.nickname);
        while(chats.length>20){
            chats.shift();
            names.shift();
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

app.listen(3000, () => {
    console.log('Server started on port 3000');
  });

Start();