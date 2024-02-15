import history from "./001_randomChatHistory.json";

class ChatStat {
  private chatHistory: Array<{ chatRoomId: string; senderId: string; message: string }>;
  private mostSenderId;
  private mostSenderPerRoom;
  private busiestId;

  private getSenderIdCount (chatRoom: object, senderId: string): number {
    if(!chatRoom[senderId]){
      return chatRoom[senderId] = 1;
    }else{
      return chatRoom[senderId] += 1;
    }
  }

  private setDefault (chatRoom: object, senderId: string, objValue) {
    if (!chatRoom[senderId]) {
      return chatRoom[senderId] = objValue;
    }
  }

  private getMostId (chatRoom: object, currentId: string) {
    if(chatRoom[this.mostSenderId] < chatRoom[currentId]){
      return this.mostSenderId = currentId;
    }
  }

  constructor(_chatHistory: Array<{ chatRoomId: string; senderId: string; message: string }>) {
    this.chatHistory = _chatHistory;
    this.mostSenderId = this.chatHistory[0].senderId;
    this.mostSenderPerRoom = {};
    this.busiestId = this.chatHistory[0].senderId;

    let senderCount = {};   // {senderId: 64, ....}
    let groupChat = {};     // {groupId: {senderId: 1, ...}, ...}
    let chatList = {};      // {senderId: {groupId: true, ...}, ...}
    let userCount = {};     // {senderId: count, ...}

    for (let i = 0; i < this.chatHistory.length; i++) {
      const groupId = this.chatHistory[i].chatRoomId;
      const senderId = this.chatHistory[i].senderId;
      const objEmpty = {};

      // mostSenderId
      this.getSenderIdCount(senderCount, senderId);   // senderCount에 id, 횟수 담기 {senderId: 64, ....}

      this.getMostId(senderCount, senderId);
      // if(senderCount[this.mostSenderId] < senderCount[senderId]){
      //   this.mostSenderId = senderId;
      // }

      // mostSenderPerRoom
      this.setDefault(groupChat, groupId, objEmpty);                // groupChat에 groupId가 없으면 빈obj 넣기
      this.setDefault(this.mostSenderPerRoom, groupId, senderId);   // mostSenderPerRoom에 groupId 값이 없으면 groupId에 senderId 넣고
      this.getSenderIdCount(groupChat[groupId],senderId);           // groupChat{'chatRoomId': {'senderId': 1, ...}}

      if (groupChat[groupId][this.mostSenderPerRoom[groupId]] < groupChat[groupId][senderId]) {
        this.mostSenderPerRoom[groupId] = senderId;
      }

      // busiestId
      this.setDefault(chatList, senderId, objEmpty);    // chatList에 senderId가 없으면, senderId 에 빈obj 담기

      // chatList[senderId]에 동일한 값이 있는지 체크
      if (!chatList[senderId][groupId]) {
        chatList[senderId][groupId] = true;
        this.getSenderIdCount(userCount, senderId);     // {senderId: count, ...}
      }

      if (userCount[this.busiestId] < userCount[senderId]) {
        this.busiestId = senderId;
      }
    }
  }


  public getMostTalkativePerson(): string {
    return this.mostSenderId;
  }

  public getMostTalkativePersonPerRoom(): { [roomId: string]: string } {
    return this.mostSenderPerRoom;
  }

  public getBusiestPerson(): string {
    return this.busiestId;
  }
}

const stat = new ChatStat(history);
console.log(stat.getMostTalkativePerson());
console.log(stat.getMostTalkativePersonPerRoom());
console.log(stat.getBusiestPerson());
