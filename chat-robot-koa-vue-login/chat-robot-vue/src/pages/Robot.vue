<template>
  <!--机器人-->
  <div class="wrapper">
    <p class="title">机器人</p>
    <ul>
      <li v-for="msg in robotMsgGetter">
        <ChatItem v-if="msg.user" :msg="msg.message" :name="msg.user" :time="time"></ChatItem>
        <ChatItem v-if="!msg.user" me="true" :img=img :msg="msg.message" :time="time"></ChatItem>
      </li>
    </ul>
    <div class="input-msg">
      <textarea v-model="inputMsg" @keydown.enter.prevent="sendMessage" ref="message"></textarea>
      <p class="btn" :class="{'enable':inputMsg!=''}" @click="sendMessage">发送</p>
    </div>

  </div>
</template>

<script>
  import ChatItem from '../components/ChatItem.vue'
  import axios from "axios";
  import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Robot',
  data () {
    return {
      inputMsg: "",
      time: this.toNomalTime(Date.parse(new Date()) / 1000),
      img: "",
      isScrollToBottom: true
    }
  },
  components: {
    ChatItem
  },
  methods: {
    ...mapActions(["chatRobot"]),
    async sendMessage() {
      console.log(this.inputMsg, '发送信息');
      if (this.inputMsg.trim() == '') return;
      this.$store.commit('robotMsgMutation', { //提交自己的内容
        message: this.inputMsg
      })
      let data = {
       message: this.inputMsg
      }
      await this.chatRobot(data);
//      await this.$store.dispatch('robatMsgAction', { //提交由自己输入内容作为参数请求接口异步得来的内容（机器人的回复）
//        message: this.inputMsg
//      })
      this.inputMsg = '';
    },
    refresh() {
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight + 10000)
      }, 0)
    },
    toNomalTime(timestamp){
      const date = new Date(timestamp*1000) ,
        Y = date.getFullYear() + '-',
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
        D = date.getDate() + ' ',
        h = date.getHours() + ':',
        m = date.getMinutes();
      return Y+M+D+h+m
    }
  },
  watch: {
    robotMsgGetter() { //当数据改变了,则自动刷新
      this.refresh();
    }
  },
  computed: {
  ...mapGetters([
      'robotMsgGetter'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper {
  padding-top: 0.6rem;
  z-index: 1;
  .title{
    font-size: 0.32rem;
    text-align: center;
  }
  ul {
     display: flex;
     flex-direction: column;
     width: 100%;
     padding-bottom: 1.6rem;
   // touch-action:none !important;
    li {
      margin-top: -1rem;
      padding: 0;
    }
  }
  .input-msg {
    height: 0.46rem;
    position: fixed;
    bottom: 0.62rem;
    display: flex;
    width: 100%;
    z-index: 999;
    textarea {
      width: 87.8%;
      margin: 0 0.06rem;
      padding-top: 0.07rem;
      padding-left: 0.06rem;
      border-radius: 0.02rem;
      outline: none;
      resize: none;
      border: none;
      overflow-y: hidden;
      font: 0.16rem/0.18rem 'Microsoft Yahei';
    }
    p.btn {
      font-size: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-right: 0.06rem;
      height: 100%;
      width: 11%;
      background: #ccc;
      color: white;
      border-radius: 0.02rem;
      cursor: not-allowed;
      font-family: 'Microsoft Yahei';
    &.enable {
       background: #1E90FF;
       cursor: pointer;
     }
    }
  }
}
</style>
