const chatHistory = require("./001_randomChatHistory.json");
// 방에서 가장 말 많은 애 찾기
// groupId를 키로, senderId를 vlue로

let groupChat = {};  // {groupId : {senderId: 1, senderId: 1,...},...}
let mostSenderPerRoom = {};  // {groupId : 가장 많이 말한애,...}

for (let i = 0; i < chatHistory.length; i++) {
  const groupId = chatHistory[i].chatRoomId;
  const senderId = chatHistory[i].senderId;

  // groupChat에 groupId가 없으면 넣기
  if (!groupChat[groupId]) {
    groupChat[groupId] = {}; // 'chatRoomId': {}
    mostSenderPerRoom[groupId] = senderId;
  }

  // groupChat{'chatRoomId': {'senderId': 1, ...}}
  if (groupChat[groupId][senderId]) {
    groupChat[groupId][senderId] += 1;
  } else {
    groupChat[groupId][senderId] = 1;
  }
  
  // mostSenderPerRoom에 groupId 값이 없으면 groupId에 senderId 넣고
  // if (!mostSenderPerRoom[groupId]) {
  //   mostSenderPerRoom[groupId] = senderId;
  // }

  // mostSenderPerRoom[groupId]에 들어있는 senderId의 메시지 횟수를 groupChat[groupId]로 찾아서
  // 지금 돌고 있는 groupChat[groupId][senderId]와 비교
  if (groupChat[groupId][mostSenderPerRoom[groupId]] < groupChat[groupId][senderId]) {
    mostSenderPerRoom[groupId] = senderId;
  }
}

console.log(mostSenderPerRoom)


/*
const chatCount = {
  r1: {
    u1: 5,
    u2: 7,
    u3: 4,
  },
  r2: {
    u1: 7,
    u2: 8,
    u3: 20,
  },
};

let groupList = Object.keys(groupChat); // [r1, r2, r3, r4 ..... ]
let mostSenderId = {}; // {r1: u2, r2: u5, r3: u2, r4: u1}

for (let i = 0; i < groupList.length; i++) {
  let groupId = groupList[i]; // r1
  let userChatCount = groupChat[groupId]; // groupChat안에 있는 senderId

  let userList = Object.keys(userChatCount); // [u1, u2, u3, ....]
  mostSenderId[groupId] = userList[0]; // {r1: u1}

  for (let j = 1; j < userList.length; j++) {
    const userId = userList[j];
    if (userChatCount[mostSenderId[groupId]] < userChatCount[userId]) {
      mostSenderId[groupId] = userId;
    }
  }
}
console.log(mostSenderId);
*/
