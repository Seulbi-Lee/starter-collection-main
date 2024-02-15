const chatHistory = require("./001_randomChatHistory.json");
// 말이 가장 많은 애 찾기
// senderId가 가장 많이 등장한 애 찾기

// {chatHistory[i].senderId : count}
let senderCount = {};   // {082605ef-dab3-469e-b8ef-ec9d767e501f': 64, ....}
let mostSenderId = chatHistory[0].senderId;    // 첫번째 애 082605ef-dab3-469e-b8ef-ec9d767e501f
let groupChat = {};  // {groupId : {senderId: 1, senderId: 1,...},...}
let mostSenderPerRoom = {};  // {groupId : 가장 많이 말한애,...}
let chatList = {};
let busiestId = chatHistory[0].senderId;
let userCount = {};

for (let i = 0; i < chatHistory.length; i++) {
  const groupId = chatHistory[i].chatRoomId;
  const senderId = chatHistory[i].senderId;

  // mostSenderId
  // senderCount에 id, 횟수 담기
  if(!senderCount[senderId]){
    senderCount[senderId] = 1;
  }else{
    senderCount[senderId] += 1;
  }
  // senderCount의 mostSenderId 의 value 값 보다 chatHistory[i].senderId의 value가 크면 
  if(senderCount[mostSenderId] < senderCount[senderId]){
    // mostSenderId는 senderId가 됨
    mostSenderId = senderId;
  }

  // mostSenderPerRoom
  // groupChat에 groupId가 없으면 넣기
  if (!groupChat[groupId]) {
    groupChat[groupId] = {}; // 'chatRoomId': {}
  }

  // groupChat{'chatRoomId': {'senderId': 1, ...}}
  if (!groupChat[groupId][senderId]) {
    groupChat[groupId][senderId] = 1;
  } else {
    groupChat[groupId][senderId] += 1;
  }
  
  // mostSenderPerRoom에 groupId 값이 없으면 groupId에 senderId 넣고
  if (!mostSenderPerRoom[groupId]) {
    mostSenderPerRoom[groupId] = senderId;
  }

  // mostSenderPerRoom[groupId]에 들어있는 senderId의 메시지 횟수를 groupChat[groupId]로 찾아서
  // 지금 돌고 있는 groupChat[groupId][senderId]와 비교
  if (groupChat[groupId][mostSenderPerRoom[groupId]] < groupChat[groupId][senderId]) {
    mostSenderPerRoom[groupId] = senderId;
  }

  // busiestId
  // chatList에 senderId가 없으면, senderId 에 array 담기
  if (!chatList[senderId]) {
    chatList[senderId] = {};
  }

  // chatList[senderId]에 동일한 값이 있는지 체크
  if (!chatList[senderId][groupId]) {
    chatList[senderId][groupId] = true;
    if (!userCount[senderId]) {
      userCount[senderId] = 1;
    } else {
      userCount[senderId] += 1;
    }
  }

  if (userCount[busiestId] < userCount[senderId]) {
    busiestId = senderId;
  }
}

console.log(mostSenderId);
console.log(mostSenderPerRoom);
console.log(busiestId);


/*
let senderCount = {};   // {082605ef-dab3-469e-b8ef-ec9d767e501f': 64, ....}
let mostSenderId = chatHistory[0].senderId;    // 첫번째 애 082605ef-dab3-469e-b8ef-ec9d767e501f

for (let i = 0; i < chatHistory.length; i++) {
  const senderId = chatHistory[i].senderId;
  // senderCount에 id, 횟수 담기
  if(senderCount[senderId]){
    senderCount[senderId] += 1;
  }else{
    senderCount[senderId] = 1;
  }
  // senderCount의 mostSenderId 의 value 값 보다 chatHistory[i].senderId의 value가 크면 
  if(senderCount[mostSenderId] < senderCount[senderId]){
    // mostSenderId는 senderId가 됨
    mostSenderId = senderId;
  }
}

console.log(mostSenderId)
*/
// let senderIdList = Object.keys(senderCount);
// let mostSenderId = senderIdList[0];   // 082605ef-dab3-469e-b8ef-ec9d767e501f

// for(let i = 0; i < senderIdList.length; i++){
//   if(senderCount[mostSenderId] < senderCount[senderIdList[i]]){
//     mostSenderId = senderIdList[i];
//   }
// }

