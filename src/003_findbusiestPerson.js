const chatHistory = require("./001_randomChatHistory.json");
// 가장 많은 방에 참여하고 있는 애 찾기
// senderId를 key로 방 개수를 value로

// let chatList = {};
// let busiestId = chatHistory[0].senderId;
// let userCount = {};

// for (let i = 0; i < chatHistory.length; i++) {
//   const senderId = chatHistory[i].senderId;
//   const groupId = chatHistory[i].chatRoomId;

//   // chatList에 senderId가 없으면, senderId 에 array 담기
//   if (!chatList[senderId]) {
//     chatList[senderId] = {};
//   }

//   // chatList[senderId]에 동일한 값이 있는지 체크
//   if (!chatList[senderId][groupId]) {
//     chatList[senderId][groupId] = true;
//     if (!userCount[senderId]) {
//       userCount[senderId] = 1;
//     } else {
//       userCount[senderId] += 1;
//     }
//   }

//   if (userCount[busiestId] < userCount[senderId]) {
//     busiestId = senderId;
//   }
// }

// console.log(busiestId);


const userRoomSet = {};
let busiestId = '';

for(let i = 0; i < chatHistory.length; i++){
  const chat = chatHistory[i];
  const roomId = chat.chatRoomId;
  const userId = chat.senderId;

  if(userRoomSet[userId]){
    userRoomSet[userId].add(roomId);
  }else{
    userRoomSet[userId] = new Set([roomId]);
  }

  if(!busiestId || userRoomSet[userId].size > userRoomSet[busiestId].size){
    busiestId = userId;
  }
}

console.log(busiestId);


// for (let i = 0; i < chatHistory.length; i++) {
//   const senderId = chatHistory[i].senderId;
//   const groupId = chatHistory[i].chatRoomId;

//   // chatList에 senderId가 없으면, senderId 에 array 담기
//   if (!chatList[senderId]){
//     chatList[senderId] = [];
//   }

//   // chatList[senderId]에 동일한 값이 있는지 체크
//   if (!chatList[senderId].includes(groupId)) {
//     chatList[senderId].push(groupId);
//   }

//   let chatListLength = chatList[senderId].length;
//   let busiestLength = chatList[busiestId].length;

//   if(busiestLength < chatListLength){
//     busiestId = senderId;
//   }
// }
