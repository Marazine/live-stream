<template>
  <div class="inspect">
    <div class="top">
      <ul>
        <li>
          <i :class="{ active: stepactive == 0 }">
            <img src="../../assets/inspect/视频.png" alt="" />
            <i
              v-show="!stepobj[0].isspect && stepobj[0].success"
              class="el-icon-circle-check"
            ></i>
            <i
              v-show="!stepobj[0].isspect && !stepobj[0].success"
              class="el-icon-warning-outline"
            ></i>
          </i>
          <span>{{ stepobj[0].text }}</span>
        </li>
        <li>
          <i :class="{ active: stepactive == 1 }">
            <img src="../../assets/inspect/声音.png" alt="" />
            <i
              v-show="!stepobj[1].isspect && stepobj[1].success"
              class="el-icon-circle-check"
            ></i>
            <i
              v-show="!stepobj[1].isspect && !stepobj[1].success"
              class="el-icon-warning-outline"
            ></i>
          </i>
          <span>{{ stepobj[1].text }}</span>
        </li>
        <li>
          <i :class="{ active: stepactive == 2 }">
            <img src="../../assets/inspect/麦克风.png" alt="" />
            <i
              v-show="!stepobj[2].isspect && stepobj[2].success"
              class="el-icon-circle-check"
            ></i>
            <i
              v-show="!stepobj[2].isspect && !stepobj[2].success"
              class="el-icon-warning-outline"
            ></i>
          </i>
          <span>{{ stepobj[2].text }}</span>
        </li>
        <li>
          <i :class="{ active: stepactive == 3 }">
            <img
              src="../../assets/inspect/检测页_icon_检测结果_默认.png"
              alt=""
            />
          </i>
          <span>{{ stepobj[3].text }}</span>
        </li>
      </ul>
    </div>
    <div class="main">
      <div v-if="stepactive == 0" class="result">
        <el-select
          @change="swtichcamera()"
          v-model="cameraName"
          placeholder="默认摄像头"
        >
          <el-option
            v-for="(item, index) in cameraslist"
            :key="index"
            :value="item.cameraName"
          >
          </el-option>
        </el-select>
        <div id="localstream"></div>
      </div>
      <div v-else-if="stepactive == 1" class="result shengyin">
        <div>
          <span>扬声器</span>
          <div>默认扬声器</div>
        </div>
        <div @click="playmusic(playstatus)">
          <img
            v-if="!playstatus"
            src="../../assets/inspect/播放icon.png"
            alt=""
          />
          <img v-else src="../../assets/inspect/暂停icon.png" alt="" />
          <span>{{ playtip }}</span>
        </div>
        <audio
          src="../../assets/inspect/5aa7a82a252bb.mp3"
          id="buttonAudio"
          @ended="playend"
        ></audio>
      </div>
      <div v-else-if="stepactive == 2" class="result mkf">
        <!--  -->
        <div>
          <span>麦克风</span>
          <el-select
            @change="switchmkf()"
            v-model="mkfName"
            placeholder="默认麦克风"
          >
            <el-option
              v-for="(item, index) in mkflist"
              :key="index"
              :value="item.mkfName"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <!-- 音量收集动画 -->
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div v-else class="result list">
        <el-table :data="stepobj" stripe style="width: 100%">
          <el-table-column prop="option" label="检测项目">
            <template slot-scope="scope">
              {{ scope.row.text }}
            </template>
          </el-table-column>
          <el-table-column prop="result" label="检测结果">
            <template slot-scope="scope">
              <span v-if="scope.row.success">正常</span>
              <span v-else class="error">异常</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="stepactive == 0" class="tips">
        <p class="title">看不到画面？试试如下方法：</p>
        <div>
          <p>1.请允许浏览器使用摄像头权限</p>
          <p>2.确认摄像头未被其他程序占用</p>
          <p>3.选择外置摄像头或换一台电脑</p>
        </div>
        <p class="subtip">
          注意：摄像头损坏可正常直播，只是观看页无法看到您的摄像头画面
        </p>
      </div>
      <div v-else-if="stepactive == 1" class="tips">
        <p class="title">看不到声音？试试如下方法：</p>
        <div>
          <p>1.请允许浏览器使用声音权限</p>
          <p>2.请调高设备的扬声器音量</p>
          <p>3.选择外置扬声器或换一台电脑</p>
        </div>
        <p class="subtip">
          注意：如需更换扬声器，请在电脑的声音设置中更改声音来源
        </p>
      </div>
      <div v-else-if="stepactive == 2" class="tips">
        <p class="title">看不到音量条波动？试试如下方法：</p>
        <div>
          <p>1.请允许浏览器使用麦克风权限</p>
          <p>2.确认麦克风未被其他程序占用</p>
          <p>3.选择外置麦克风或换一台电脑</p>
        </div>
        <p class="subtip">
          注意：麦克风异常无法进入直播
        </p>
      </div>
      <div v-else class="tips last"></div>
      <div class="mkferror" v-show="stepactive == 3 && !stepobj[2].success">
        当前您的麦克风异常，无法进入直播
      </div>
    </div>
    <div v-if="stepactive == 3 && !stepobj[2].success" class="btn mkfbtn">
      <el-button type="info" @click="reinspect">
        重新检测
      </el-button>
    </div>
    <div v-else class="btn">
      <el-button
        ref="leftbtn"
        type="info"
        @click="result(true, stepactive, 0)"
        >{{ leftbtntext }}</el-button
      >
      <el-button
        ref="rightbtn"
        type="info"
        class="none"
        @click="result(false, stepactive, 1)"
        >{{ rightbtntext }}</el-button
      >
    </div>
  </div>
</template>

<script>
import TRTC from "trtc-js-sdk";
export default {
  data() {
    return {
      stepobj: [
        {
          success: false,
          isspect: true,
          text: "检测中..",
        },
        {
          success: false,
          isspect: true,
          text: "扬声器",
        },
        {
          success: false,
          isspect: true,
          text: "麦克风",
        },
        {
          text: "检测结果",
        },
      ],
      cameraslist: [],
      mkflist: [],
      userId: 1234,
      cameraName: "",
      mkfName: "",
      stepactive: 0,
      localStream: null,
      leftbtntext: "可以看到",
      rightbtntext: "看不到",
      playtip: "点此播放声音",
      timeId: null,
      playstatus: 1,
    };
  },
  created() {
    this.initVido();
    this.begin();
  },
  methods: {
    initVido() {
      let userId = this.userId;
      this.localStream = TRTC.createStream({
        userId,
        audio: true,
        video: true,
      });
      this.localStream
        .initialize()
        .catch((error) => {
          console.error("初始化本地流失败 " + error);
        })
        .then(() => {
          console.log("初始化本地流成功");
          this.localStream.play("localstream");
          const videos = document.getElementsByTagName("video");
          for (let i = 0; i < videos.length; i++) {
            videos[i].style.position = "relative";
          }
        });
    },
    result(bol, index, flag) {
      switch (index) {
        case 0:
          this.stepactive = 1;
          this.$set(this.stepobj, index, {
            isspect: false,
            success: bol,
            text: "摄像头",
          });
          this.$set(this.stepobj, index + 1, {
            isspect: true,
            success: false,
            text: "检测中...",
          });
          this.localStream.stop();
          this.leftbtntext = "可以听见";
          this.rightbtntext = "听不见";
          break;
        case 1:
          this.stepactive = 2;
          this.initmkf();
          this.$set(this.stepobj, index, {
            isspect: false,
            success: bol,
            text: "扬声器",
          });
          this.$set(this.stepobj, index + 1, {
            isspect: true,
            success: false,
            text: "检测中...",
          });
          this.leftbtntext = "可以看见";
          this.rightbtntext = "看不见";
          break;
        case 2:
          // clearInterval(this.timeId);
          this.stepactive = 3;
          this.$set(this.stepobj, index, {
            isspect: false,
            success: bol,
            text: "麦克风",
          });
          this.leftbtntext = "去直播";
          this.rightbtntext = "重新检测";
          break;
        case 3:
          if (!flag) {
            // 去直播
            this.$router.push({
              name: "live",
              params: {
                roomId: "1234",
                userId: "1244",
              },
            });
          } else {
            // 重新检测
            this.reinspect();
          }
          break;
        default:
          break;
      }
    },
    begin() {
      TRTC.getCameras().then((devices) => {
        devices.forEach((dev) => {
          let cameraName = dev.label.slice(0, dev.label.search(/\(/g));
          let id = dev.deviceId;
          this.cameraslist.push({
            cameraName,
            id,
          });
        });
      });
    },
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    // 切换摄像头
    swtichcamera() {
      this.cameraslist.forEach((item) => {
        if (item.cameraName == this.cameraName) {
          this.localStream.switchDevice("video", item.id).then(() => {
            console.log("摄像头切换成功");
            const videos = document.getElementsByTagName("video");
            for (let i = 0; i < videos.length; i++) {
              videos[i].style.position = "relative";
            }
          });
        }
      });
    },
    // 初始化麦克风
    initmkf() {
      TRTC.getMicrophones().then((devices) => {
        devices.forEach((dev) => {
          let mkfName = dev.label.slice(0, dev.label.search(/\(/g));
          let id = dev.deviceId;
          this.mkflist.push({
            mkfName,
            id,
          });
        });
      });
      this.getshengyin();
    },
    // 切换麦克风
    switchmkf() {
      this.mkflist.forEach((item) => {
        if (item.mkfName == this.mkfName) {
          this.localStream.switchDevice("audio", item.id).then(() => {
            console.log("摄像头切换成功");
          });
        }
      });
    },
    // 获取音量大小
    getshengyin() {
      const localStream = TRTC.createStream({ audio: true });
      localStream
        .initialize()
        .catch((error) => {
          console.error("failed initialize localStream " + error);
        })
        .then(() => {
          console.log("initialize localStream success");
          // setInterval(() => {
          //   // 从麦克风和摄像头采集本地音视频流
          //   const volume = localStream.getAudioLevel();
          //   console.log(volume);
          // }, 100);
        });
    },
    // 播放音频
    playmusic(flag) {
      if (flag) {
        this.playstatus = !this.playstatus;
        document.getElementById("buttonAudio").play();
        this.playtip = "暂停播放音频";
      } else {
        this.playstatus = !this.playstatus;
        document.getElementById("buttonAudio").pause();
        this.playtip = "点击播放音频";
      }
    },
    // 重新检测
    reinspect() {
      this.leftbtntext = "可以看到";
      this.rightbtntext = "看不到";
      this.stepactive = 0;
      this.initVido();
      this.$set(this.stepobj, 0, {
        success: false,
        isspect: true,
        text: "检测中..",
      });
      this.$set(this.stepobj, 1, {
        success: false,
        isspect: true,
        text: "扬声器",
      });
      this.$set(this.stepobj, 2, {
        success: false,
        isspect: true,
        text: "麦克风",
      });
      this.$set(this.stepobj, 3, {
        text: "检测结果",
      });
    },
    playend() {
      this.playstatus = !this.playstatus;
      this.playtip = "暂停播放音频";
    },
  },
};
</script>

<style lang="less" scoped>
.inspect {
  width: 560px;
  height: 370px;
  background-color: #ffffff;
  .top {
    height: 94px;
    background-color: #3e3e4e;
    padding: 18px 60px;
    box-sizing: border-box;
    ul {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #ffffff;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        > i {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 20px;
          background-color: #343448;
          text-align: center;
          img {
            width: 16.8px;
            height: 18px;
            margin-top: 10px;
          }
          i {
            position: absolute;
            right: 0;
            bottom: 0;
          }
          .el-icon-circle-check {
            color: #366bee;
          }
          .el-icon-warning-outline {
            color: rgb(255, 76, 77);
          }
        }
        .active {
          background: #366bee;
        }
        > span {
          margin-top: 6px;
          font-size: 12px;
        }
      }
    }
  }
  .main {
    position: relative;
    height: 228px;
    display: flex;
    padding: 33px 0 36px;
    box-sizing: border-box;
    .result {
      width: 50%;
      height: 100%;
      padding-right: 33px;
      #localstream {
        margin-top: 20px;
        margin-left: 40px;
        width: 200px;
        height: 100px;
      }
    }
    .shengyin {
      display: flex;
      flex-direction: column;
      align-items: center;
      > div:first-child {
        span {
          font-size: 12px;
        }
        > div {
          width: 144px;
          height: 32px;
          line-height: 32px;
          text-align: left;
          padding-left: 8px;
          margin-left: 12px;
          color: #999;
          font-size: 12px;
          background: #ececec;
          display: inline-block;
        }
      }
      > div:nth-child(2) {
        height: 30px;
        width: 190px;
        color: #fff;
        background-color: #366bee;
        font-size: 12px;
        margin-top: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 14px;
          margin-right: 16px;
        }
      }
    }
    .mkf {
      display: flex;
      flex-direction: column;
      align-items: center;
      > div:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          font-size: 14px;
          margin-right: 16px;
        }
      }
      > div:last-child {
        height: 40px;
        width: 190px;
        margin-top: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          background-color: #cccccc;
          margin-left: 6px;
          height: 30px;
          width: 8px;
          border-radius: 4px;
        }
        span.active {
          background-color: #366bee;
        }
      }
    }
    .list {
      position: absolute;
      top: 0;
      width: 100%;
      padding: 0;
    }

    .tips {
      width: 50%;
      height: 100%;
      font-size: 12px;
      padding: 6px 0 0 30px;
      box-sizing: border-box;
      border-left: 2px dashed rgba(0, 0, 0, 0.1);
      .title {
        font-size: 14px;
        color: #366bee;
      }
      p {
        text-align: left;
      }
      div {
        margin: 10px 0;
        p {
          line-height: 20px;
        }
      }
      .subtip {
        color: #666;
        padding-right: 42px;
      }
    }
    .last {
      display: none;
    }
    .mkferror {
      position: absolute;
      width: 100%;
      text-align: center;
      bottom: 10px;
      font-size: 12px;
      color: rgb(255, 76, 77);
    }
  }
  .btn {
    height: 48px;
    button.el-button.el-button--info {
      border: none;
      background: #366bee;
    }
    button.none.el-button--info {
      color: #666;
      background: #eeeeee;
    }
  }
  .mkfbtn {
    display: flex;
  }
}
</style>
<style lang="less">
.inspect {
  .btn {
    button.el-button.el-button--info {
      float: left;
      height: 100%;
      width: 50%;
      border-radius: 0;
    }
    .el-button + .el-button {
      margin: 0;
    }
  }
}
</style>

<style lang="less">
.inspect {
  .el-icon-arrow-down {
    font-size: 12px;
  }
  tbody {
    tr:last-child {
      display: none;
    }
  }
  .cell {
    text-align: center;
  }
  .error {
    color: rgb(255, 76, 77);
  }
  .mkfbtn {
    button.el-button.el-button--info {
      flex: 1;
      color: #ffffff;
    }
  }
  .mkf {
    .el-select {
      width: 150px;
    }
  }
}
</style>
