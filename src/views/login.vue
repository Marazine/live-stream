<template>
  <div class="login" ref="login">
    <div class="loginform" v-if="islogin">
      <img src="../assets/一览logo.png" alt />
      <div class="logininfo">
        <span class="title">{{ liveInfo.liveName }}</span>
        <div class="inputform" :class="{ error1: errorname, error2: errorpsd }">
          <input
            ref="nickname"
            type="text"
            v-model.trim="roomId"
            placeholder="请输入房间号"
            :class="{ active: isInput === 1 }"
            @focus="isInput = 1"
          />
          <input
            ref="password"
            type="password"
            v-model.trim="password"
            placeholder="请输入密码"
            :class="{ active: isInput === 2 }"
            @focus="isInput = 2"
          />
          <el-button type="primary" @click="login" @keyup.enter.native="login()"
            >登录</el-button
          >
        </div>
        <span class="tips">推荐使用Chrome 58以上版本浏览器</span>
      </div>
    </div>
    <div class="inspection" v-if="!islogin">
      <inspect></inspect>
    </div>
  </div>
</template>
<script>
import inspect from "./components/inspect";
import TRTC from "trtc-js-sdk";
export default {
  data() {
    return {
      screenHeight: window.innerHeight,
      roomId: this.$route.query.roomId,
      password: "",
      islogin: true,
      isInput: 1,
      errorname: false,
      errorpsd: false,
      liveInfo: {},
    };
  },
  components: {
    inspect,
  },
  created() {
    // 判断浏览器是否能够支持服务
    this.checkSystemRequirement();
  },
  mounted() {
    this.initStyle();
    // 获取该场直播信息
    this.getliveInfo();
    document.onkeyup = (e) => {
      if (e.keyCode == 13) {
        this.login();
      }
    };
  },
  watch: {
    screenHeight(val) {
      this.screenHeight = val;
      this.$refs.login.style.height = this.screenHeight + "px";
    },
  },
  methods: {
    // 检测是否能够支持
    checkSystemRequirement() {
      TRTC.checkSystemRequirements().then((result) => {
        if (!result) {
          this.$router.push({
            name:'error',
          })
        }
      });
    },
    // 设置视图大小
    initStyle() {
      console.log(this.roomId);
      const windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.$refs.login.style.height = windowHeight + "px";
      // const that = this;
      window.onresize = () => {
        return (() => {
          window.screenHeight = window.innerHeight;
          this.screenHeight = window.screenHeight;
        })();
      };
    },
    // 点击登录
    getliveInfo() {
      let params = {
        roomId: this.roomId,
      };
      this.$http
        .post(this.$http.adornUrl("live/getInfoByRoomId", "proxyLl"), params)
        .then((data) => {
          console.log(data);
          this.liveInfo = data.data;
          document.title = this.liveInfo.liveName;
          let livedata = JSON.stringify(data.data);
          window.sessionStorage.setItem("liveInfo", livedata);
        });
    },
    login() {
      if (this.nickname == "") {
        this.errorname = true;
        return;
      }
      if (this.password == "") {
        this.errorpsd = true;
        return;
      }
      // 登录接口
      let params = {
        info: JSON.stringify({
          roomId: this.roomId,
          password: this.password,
        }),
      };
      this.$http
        .post(this.$http.adornUrl("liveuser/login", "proxyLl"), params)
        .then((data) => {
          if (data.code == 200) {
            this.islogin = false;
            return;
          }
          this.$message.error("房间号或密码错误，请重新输入");
        });
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../assets/背景图.png");
  background-size: 100% 100%;
  .loginform {
    height: 400px;
    width: 340px;
    background-color: rgba(0, 0, 0, 0.7);
    box-sizing: border-box;
    text-align: center;
    img {
      height: 88px;
      width: 88px;
      border-radius: 44px;
      margin: 28px 0 8px;
    }
    .logininfo {
      display: flex;
      flex-direction: column;
      .title {
        color: #fff;
        font-size: 16px;
      }
      .tips {
        display: block;
        font-size: 12px;
        color: #818d9f;
        margin-bottom: 32px;
      }
    }
  }
}
</style>

<style lang="less">
.login {
  .logininfo {
    input {
      height: 55px;
      width: 224px;
      padding-top: 30px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border: none;
      background-color: transparent;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.5);
      border-radius: 0;
      line-height: 16px;
      text-align: center;
      font-size: 14px;
      color: hsla(0, 0%, 100%, 0.5);
    }
    .active {
      border-bottom: 1px solid #fff;
    }
    .error1 {
      :first-child::-webkit-input-placeholder {
        color: #f00;
        opacity: 1;
      }
    }
    .error2 {
      :nth-child(2)::-webkit-input-placeholder {
        color: #f00;
        opacity: 1;
      }
    }
    button.el-button.el-button--primary {
      width: 224px;
      height: 48px;
      color: #fff;
      cursor: pointer;
      margin: 30px 0 20px;
      font-size: 16px;
      border-radius: 0;
    }
  }
}
</style>
