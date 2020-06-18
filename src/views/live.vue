<template>
  <div class="live clearfix">
    <div class="leftwindow" ref="leftwindow">
      <div class="header">
        <span class="liveinfo">
          房间号 1777591
        </span>
        <span class="livetitle">
          <span>defwef</span>
          <i v-if="!beginlive">无直播</i>
          <i v-else class="liveing">直播中</i>
        </span>
        <div></div>
      </div>
      <div class="main">
        <div class="aside">
          <div class="model">
            <div
              @click="showmodel = 1"
              class="subject"
              :class="{ active: showmodel == 1 }"
            >
              <i class="el-icon-document"></i>
              <span>课件</span>
            </div>
            <div
              @click="sharewindow"
              class="share"
              :class="{ active: showmodel == 2 }"
            >
              <i class="el-icon-edit-outline"></i>
              <span>屏幕共享</span>
            </div>
          </div>
          <div class="others">
            <div v-if="!beginlive" @click="swtichstatus()">上课</div>
            <div v-else class="active" @click="swtichstatus()">
              <span>{{ hour }}:{{ minute }}:{{ second }}</span>
              <span>下课</span>
            </div>
            <!-- <div>
              <i class="el-icon-message"></i>
            </div>
            <div @click.prevent="dialogTableVisible2 = true">
              <i class="el-icon-setting"></i>
            </div>-->
          </div>
        </div>
        <div class="content">
          <div
            id="streamlive1"
            class="streamlive1"
            ref="streamlive1
          "
          >
            <div class="beforeadd" v-show="fileimglist.list.length == 0">
              <!-- <img src="../assets/live/添加文档.png" alt /> -->
              <button @click.prevent="showdoclist">添加文档</button>
              <span>或点击左下角添加文档</span>
            </div>
            <canvas
              v-show="!fileimglist.list.length == 0"
              id="myCanvas"
              width="800"
              height="450"
            ></canvas>
          </div>
          <div class="footer" ref="footer">
            <div class="options">
              <div class="streamop op" v-if="!fileimglist.list.length">
                <div>
                  <img
                    @click="swtichdeviceStatus(1)"
                    v-if="deviceStatus.camera"
                    src="../assets/live/视频.png"
                    alt
                  />
                  <img
                    @click="swtichdeviceStatus(1)"
                    v-else
                    src="../assets/live/禁止视频.png"
                    alt
                  />
                  <img
                    @click="swtichdeviceStatus(2)"
                    v-if="deviceStatus.Microphone"
                    src="../assets/live/麦克风.png"
                    alt
                  />
                  <img
                    @click="swtichdeviceStatus(2)"
                    v-else
                    src="../assets/live/关闭话筒.png"
                    alt
                  />
                  <img
                    @click="swtichdeviceStatus(3)"
                    v-if="deviceStatus.voice"
                    src="../assets/live/声音.png"
                    alt
                  />
                  <img
                    @click="swtichdeviceStatus(3)"
                    v-else
                    src="../assets/live/静音.png"
                    alt
                  />
                  <img @click="fullscreen" src="../assets/live/全屏.png" alt />
                  <img @click="exchange" src="../assets/live/互换.png" alt />
                </div>
                <div>
                  <img
                    @click="xiala(1)"
                    v-if="!isxiala"
                    src="../assets/live/下拉.png"
                    alt
                  />
                  <img
                    @click="xiala(0)"
                    v-else
                    src="../assets/live/上拉.png"
                    alt
                  />
                </div>
              </div>
              <div class="courseop op" v-else>
                <div>
                  <div>
                    <i
                      class="el-icon-arrow-left"
                      @click="prevClick(currentindex)"
                    ></i>
                  </div>
                  <span>{{ currentindex + 1 }}/{{ totalimg }}</span>
                  <div>
                    <i
                      class="el-icon-arrow-right"
                      @click="nextClick(currentindex)"
                    ></i>
                  </div>
                </div>
                <div>
                  <img @click="fullscreen" src="../assets/live/全屏.png" alt />
                  <img src="../assets/live/互换.png" alt />
                </div>
                <i>
                  <img
                    @click="xiala(1)"
                    v-if="!isxiala"
                    src="../assets/live/下拉.png"
                    alt
                  />
                  <img
                    @click="xiala(0)"
                    v-else
                    src="../assets/live/上拉.png"
                    alt
                  />
                </i>
              </div>
              <div class="courselist clearfix" v-if="fileimglist.list.length">
                <div>
                  <span>{{ fileimglist.name }}</span>
                  <i class="el-icon-close" @click="removeCourse()"></i>
                </div>
              </div>
            </div>
            <div class="adddoc" ref="adddoc">
              <div class="addbtn" @click.prevent="showdoclist">
                <i class="el-icon-plus"></i>
                <span>添加文档</span>
              </div>
              <div class="doclist" id="imglist">
                <div class="imglist clearfix">
                  <div
                    :class="{ clicked: clicked == index }"
                    @click="swtichimg(index, $event)"
                    v-for="(item, index) in fileimglist.list"
                    :key="index"
                  >
                    <img :id="'img' + index" :src="item.image_url" alt />
                    <i class="imgindex">{{ index + 1 }}</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rightwindow" ref="rightwindow">
      <div
        ref="streamlive2"
        class="header"
        id="streamlive2"
        @mouseover="ishover = true"
        @mouseout="ishover = false"
      >
        <div v-show="islive" class="livestatus">
          <span>
            <img v-if="deviceStatus.voice" src="../assets/live/声音.png" alt />
            <img v-else src="../assets/live/静音.png" alt />
            <img
              v-if="deviceStatus.Microphone"
              src="../assets/live/麦克风.png"
              alt
            />
            <img v-else src="../assets/live/关闭话筒.png" alt />
          </span>
        </div>
        <div v-show="islive && ishover" class="swtich">
          <span @click.prevent="swtichdeviceStatus(1)">
            <img v-if="deviceStatus.camera" src="../assets/live/视频.png" alt />
            <img v-else src="../assets/live/禁止视频.png" alt />
            <i v-if="deviceStatus.camera">关闭摄像头</i>
            <i v-else>开启摄像头</i>
          </span>
          <span @click.prevent="swtichdeviceStatus(2)">
            <img
              v-if="deviceStatus.Microphone"
              src="../assets/live/麦克风.png"
              alt
            />
            <img v-else src="../assets/live/关闭话筒.png" alt />
            <i v-if="deviceStatus.Microphone">关闭麦克风</i>
            <i v-else>开启麦克风</i>
          </span>
          <span @click.prevent="swtichdeviceStatus(3)">
            <img v-if="deviceStatus.voice" src="../assets/live/声音.png" alt />
            <img v-else src="../assets/live/静音.png" alt />
            <i v-if="deviceStatus.voice">静音</i>
            <i v-else>开启声音</i>
          </span>
        </div>
      </div>
      <div class="main">
        <div class="tag">
          <span>
            聊天室
            <i></i>
          </span>
        </div>
        <div class="chatW" ref="chatW">
          <div class="chat">
            <ul ref="chats" id="chats">
              <li
                class="clearfix"
                v-for="(item, index) in chatlist"
                :key="index"
              >
                <div
                  class="right clearfix"
                  v-if="item.userForeignKey == userForeignKey"
                >
                  <div>{{ item.msg }}</div>
                </div>
                <div class="left clearfix" v-else>
                  <img :src="item.user.face" alt />
                  <div>
                    <p>{{ item.user.name }}</p>
                    <div>{{ item.msg }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- <div class="footer">
            <div></div>
            <div>
              <textarea
                v-model.trim="charword"
                placeholder="我也来参与一下互动"
              ></textarea>
            </div>
            <div>
              <span>聊天室已开启</span>
              <div>
                <span>{{ charword.length }}/200</span>
                <button type="button" @click="uploadchat">发送</button>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- 添加文档 -->
    <el-dialog
      class="myclass"
      title="我的课件"
      :visible.sync="dialogTableVisible1"
    >
      <div class="option">
        <div>
          <el-upload
            action="http://zhibotest.yl1001.com/webservice/live_video/index.jsp/v1/sys/file/add?token=dXNlcj1saXZlX3ZpZGVvJnB3ZD1saXZlX3ZpZGVvX2RhdGFfam9iMTAwMQ=="
            :limit="1"
            :show-file-list="false"
            accept=".ppt, .pptx, .pdf"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
            :on-progress="Uploading"
            :data="{ liveId: liveId }"
          >
            <img src="../assets/live/上传课件.png" alt />
            <el-button size="small" type="primary">上传课件</el-button>
          </el-upload>
          <i
            class="el-icon-info"
            @mouseover="istishi = true"
            @mouseout="istishi = false"
          ></i>
        </div>
        <span class="tooltip" v-show="istishi">
          <span>* 仅支持ppt、pptx、pdf</span>
          <span>* 上传课件大小不能超过100MB</span>
        </span>
        <div>
          <img @click="getfilelist" src="../assets/live/刷新.png" alt />
          <span @click="getfilelist" class="btn">刷新列表</span>
        </div>
      </div>
      <div class="Coursewares">
        <el-table
          v-loading="loading"
          :data="filelist"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="name" label="课件名" width="180">
            <template slot-scope="scope">
              <div>{{ scope.row.file_name }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="上传状态" width="100"
            >成功</el-table-column
          >
          <el-table-column prop="date" label="上传时间" width="100">
            <template slot-scope="scope">
              {{ scope.row.add_time }}
            </template>
          </el-table-column>
          <el-table-column prop="option" label="操作">
            <template slot-scope="scope">
              <div>
                <span @click="openClick(scope.row)">打开课件</span>
                <i class="el-icon-delete" @click="delClick(scope.row)"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          layout="prev, pager, next"
          :total="6"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 设置 -->
    <el-dialog
      class="systemset"
      title="系统设置"
      :visible.sync="dialogTableVisible2"
    ></el-dialog>
  </div>
</template>

<script>
import TRTC from "trtc-js-sdk";
import screenfull from "screenfull";
import LibGenerateTestUserSig from "../utils/lib-generate-test-usersig.min.js";
export default {
  data() {
    return {
      roomId: "1114" || this.$route.params.roomId,
      userId: "1114" || this.$route.params.userId,
      input: "", // 聊天框文字
      client: "", // 客户端服务
      remoteStream: "", // 远方播放流
      localStream: "", // 本地流
      dialogTableVisible2: false,
      dialogTableVisible1: false,
      istishi: false,
      showmodel: true,
      islive: true,
      ishover: false,
      deviceStatus: {
        voice: true,
        Microphone: true,
        camera: true,
      },
      swtichWindow: true,
      isxiala: false,
      isfullScreen: false,
      startheight: null,
      charword: "",
      liveId: "",
      comId: 0,
      chatlist: [],
      userForeignKey: "21908338", // 评论ID
      pageNo: 1,
      pageSize: 5,
      filelist: [],
      loading: null,
      fileimglist: {
        name: "",
        list: [],
      },
      clicked: 0,
      // 当前课件图片
      currentimg: "",
      totalimg: null,
      currentindex: null,
      beginlive: false,
      hour: "00",
      minute: "00",
      second: "00",
      timerId: null,
      sec: 0,
      min: 0,
      hours: 0,
    };
  },
  mounted() {
    this.initStyle();
    this.initStream();
    window.onresize = () => {
      this.initStyle();
    };
  },
  watch: {
    charword: function(newVal, oldVal) {
      this.charword = this.charword.length > 200 ? oldVal : newVal;
    },
  },
  methods: {
    initStyle() {
      const windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.$refs.leftwindow.style.height = windowHeight + "px";
      this.$refs.rightwindow.style.height = windowHeight + "px";
      this.$refs.chats.style.height = windowHeight - 168 - 32 - 150 + "px";
    },
    initStream() {
      const sdkAppId = this.genTestUserSig(this.userId).sdkAppId;
      const userSig = this.genTestUserSig(this.userId).userSig;
      // 创建Client对象
      this.client = TRTC.createClient({
        mode: "videoCall",
        sdkAppId: sdkAppId,
        userId: this.userId,
        userSig: userSig,
      });
      // 注册远端监听，在加入房间之前
      // this.subscribeStream(this.client);
      // 初始化之后加入房间
      this.joinRoom(this.client, this.roomId);
    },
    // 获取聊天消息
    getchatlist() {
      setInterval(() => {
        let params = {
          info: JSON.stringify({ comId: this.comId, liveId: this.liveId }),
        };
        this.$http
          .post(this.$http.adornUrl("comments/info", "proxyLl"), params)
          .then((data) => {
            if (data.code == 200) {
              // let length = data.data.length;
              if (data.data.length != 0) {
                this.comId = data.data[data.data.length - 1].msgId;
                this.chatlist.push(...data.data);
                this.$nextTick(() => {
                  let obj = document.getElementById("chats");
                  obj.scrollTop = obj.scrollHeight;
                });
              }
            } else {
              console.log("获取失败");
            }
          });
      }, 1000);
    },
    // 上传聊天消息
    uploadchat() {
      if (!this.charword.length) {
        return;
      }
      let params = {
        info: JSON.stringify({
          liveId: this.liveId,
          comContent: this.charword,
          userId: this.userId,
          person_id: this.userForeignKey,
        }),
      };
      this.$http
        .post(this.$http.adornUrl("comments/insert", "proxyLl"), params)
        .then((data) => {
          if (data.code == 200) {
            this.charword = "";
          } else {
            console.log("发表评论失败");
          }
        });
    },
    // 获取userSig
    genTestUserSig(userID) {
      const SDKAPPID = 1400380145;
      const EXPIRETIME = 604800;
      const SECRETKEY =
        "82f7d980473b0d663fff6d4d672ae66fe57b86f3e363f0d109bdcd8c9b57b8b1";
      if (SDKAPPID === "" || SECRETKEY === "") {
        this.$message.error("账号信息出错,请重新登录");
      }
      const generator = new LibGenerateTestUserSig(
        SDKAPPID,
        SECRETKEY,
        EXPIRETIME
      );
      const userSig = generator.genTestUserSig(userID);
      return {
        sdkAppId: SDKAPPID,
        userSig: userSig,
      };
    },
    // 加入房间
    joinRoom(client, roomId) {
      client
        .join({ roomId })
        .catch((error) => {
          console.log("进房失败", error);
        })
        .then(() => {
          console.log("进房成功");
          // 创建本地流
          this.createStream(this.userId, 1);
          // 播放远端流
          // this.playStream(this.client);
        });
    },
    // 创建本地音视频流
    createStream(userId, flag) {
      const localStream = TRTC.createStream({
        userId,
        audio: true,
        video: true,
      });
      this.localStream = localStream;
      localStream
        .initialize()
        .catch((error) => {
          console.log("初始化本地流失败", error);
        })
        .then(() => {
          console.log("初始化本地流成功");
          // 创建成功之后播放
          // 清空里面所有元素
          // console.log(document.getElementById("streamlive2").html);

          // document.getElementById("streamlive2").html = "";
          if (flag) {
            localStream.play("streamlive2");
            // 获取所有video元素，设置为普通流
            // const videos = document.getElementsByTagName('video');
            const videos = document.getElementsByTagName("video");
            for (let i = 0; i < videos.length; i++) {
              videos[i].style.position = "relative";
            }
          }
          // 创建之后发布
          this.reqstream();
        });
    },
    // 发布本地音视频流
    publishStream(localStream, client) {
      client
        .publish(localStream)
        .catch((error) => {
          console.log("本地流发布失败", error);
        })
        .then(() => {
          console.log("本地流发布成功");
        });
    },
    // 将直播相关信息发送到服务器
    reqstream() {
      let params = {
        info: JSON.stringify({
          foreignKey: "21908338",
          commonId: this.roomId + "_" + this.userId + "_main",
          endTime: "2020-06-18 21:25:00",
          thumbnail: "测试缩略图",
          name: "一览网络直播招聘",
          beginTime: "2020-06-18 09:25:00",
          source: "一览",
          intro: "一览网络网页开播",
          type: 1,
          comments: 0,
          channelId: this.genTestUserSig(this.userId).sdkAppId,
        }),
      };
      this.$http
        .post(this.$http.adornUrl("/live/insertInfoByUser", "proxyLl"), params)
        .then((data) => {
          if (data.code == 200) {
            console.log("创建直播成功");
            this.liveId = data.data.liveId;
            // this.getchatlist();
          } else {
            console.log("创建直播");
          }
        });
    },
    // 订阅远端流 --加入房间之前
    subscribeStream(client) {
      client.on("stream-add", (event) => {
        const remoteStream = event.stream;
        console.log("远端流增加: " + event.stream.getId());
        client.subscribe(remoteStream);
      });
    },
    // 播放远端流
    playStream(client) {
      client.on("stream-subscribed", (event) => {
        const remoteStream = event.stream;
        console.log("远端流订阅成功" + remoteStream.getId());
        this.remoteStream = `<view id="${"remote_stream-" +
          remoteStream.getId()}"  ></view>`;
        this.$nextTick(() => {
          //播放
          remoteStream.play("remote_stream-" + remoteStream.getId());
        });
      });
    },
    // 退出音视频流
    leaveRoom(client) {
      client
        .leave()
        .then(() => {
          console.log("退房成功");
          // 停止本地流，关闭本地流内部的音视频播放器
          this.localStream.stop();
          // 关闭本地流，释放摄像头和麦克风访问权限
          this.localStream.close();
          this.localStream = null;
          this.client = null;
          // 退房成功，可再次调用client.join重新进房开启新的通话。
        })
        .catch((error) => {
          console.error("退房失败 " + error);
          // 错误不可恢复，需要刷新页面。
        });
    },
    showdoclist() {
      this.dialogTableVisible1 = true;
      this.getfilelist();
    },
    // 打开课件
    openClick(data) {
      let params = {
        fileId: data.id,
        pageSize: 999,
        liveId: this.liveId,
      };
      let filename = data.file_name;
      this.$http
        .post(this.$http.adornUrl("file/listImg", "proxyZx"), params)
        .then((data) => {
          if (data.code == 200) {
            console.log(data);
            this.fileimglist.name = filename;
            this.fileimglist.list = data.data.list;
            console.log(this.fileimglist);
            this.swtichimg(0);
            this.dialogTableVisible1 = false;
            this.totalimg = data.data.total;
          } else {
            console.log("打开失败");
          }
        });
    },
    // 删除课件
    delClick(data) {
      this.$confirm("此操作将永久删除该课件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            fileIds: data.id,
            liveId: this.liveId,
          };
          this.$http
            .post(this.$http.adornUrl("file/delete", "proxyZx"), params)
            .then((data) => {
              if (data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getfilelist();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 屏幕分享
    sharewindow() {
      if (!this.beginlive) {
        this.$message.error("请先开始直播");
        return;
      }
      this.unpublish();
      let localStream = null;
      // 创建屏幕分享流
      localStream = TRTC.createStream({ audio: true, screen: true });
      // 监听屏幕分享停止事件
      localStream.on("screen-sharing-stopped", (event) => {
        // 停止推送屏幕分享
          this.publishStream(this.localStream,this.client);
      });
      // 初始化屏幕分享流
      localStream.initialize().then(() => {
        console.log("screencast stream init success");
        // 发布屏幕分享流
        this.client.publish(localStream).then(() => {
          console.log("screen casting");
        });
      });
      // 使用一个独立的用户 ID 进行推送屏幕分享
      // const shareId = "share-userId";
      // const sdkAppId = this.genTestUserSig(this.userId).sdkAppId;
      // const userSig = this.genTestUserSig(this.userId).userSig;
      // const roomId = this.roomId;
      // const shareClient = TRTC.createClient({
      //   mode: "videoCall",
      //   sdkAppId,
      //   userId: '1234',
      //   shareId,
      //   userSig,
      // });

      // // 指明该 shareClient 默认不接收任何远端流 （它只负责发送屏幕分享流）
      // shareClient.setDefaultMuteRemoteStreams(true);
      // shareClient.join({ roomId }).then(() => {
      //   console.log("shareClient join success");
      //   // 创建屏幕分享流
      //   const localStream = TRTC.createStream({ audio: false, screen: true });
      //   localStream.initialize().then(() => {
      //     // screencast stream init success
      //     shareClient.publish(localStream).then(() => {
      //       console.log("screen casting");
      //     });
      //   });
      // });
    },
    // 取消发布本地流
    unpublish() {
      this.client
        .unpublish(this.localStream)
        .catch((error) => {
          console.log("本地流取消发布失败", error);
        })
        .then(() => {
          console.log("本地流取消发布成功");
        });
    },
    // 本地移除课件
    removeCourse() {
      this.$confirm("此操作将移除该课件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.fileimglist = {
            name: "",
            list: [],
          };
          this.$message({
            type: "success",
            message: "移除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 切换设备状态
    swtichdeviceStatus(flag) {
      switch (flag) {
        case 1:
          this.$set(this.deviceStatus, "camera", !this.deviceStatus.camera);
          if (this.deviceStatus.camera) {
            this.localStream.unmuteVideo();
          } else {
            this.localStream.muteVideo();
          }
          break;
        case 2:
          this.$set(
            this.deviceStatus,
            "Microphone",
            !this.deviceStatus.Microphone
          );
          if (this.deviceStatus.Microphone) {
            this.localStream.unmuteAudio();
          } else {
            this.localStream.muteAudio();
          }
          break;
        case 3:
          this.$set(this.deviceStatus, "voice", !this.deviceStatus.voice);
          // 获取当前页面的声音大小

          if (this.deviceStatus.voice) {
            // 将声音设置为一定值
            this.localStream.setAudioVolume(0.5);
          } else {
            // 设置为静音
            this.localStream.setAudioVolume(0);
          }
          break;
      }
    },
    // 下拉屏幕变大
    xiala(flag) {
      // this.isxiala = flag ? true : false;
      // 底部消失
      if (flag) {
        this.isxiala = true;
        this.$refs.adddoc.style.display = "none";
        this.$refs.footer.style.height = "30px";
        // TODO 添加动画，增强用户感受
      } else {
        this.isxiala = false;
        this.$refs.adddoc.style.display = "flex";
        this.$refs.footer.style.height = "150px";
        // TODO 添加动画，增强用户感受
      }
    },
    // 全屏操作
    fullscreen() {
      screenfull.toggle().then(() => {
        this.initStyle();
      });
      this.isfullScreen = !this.isfullScreen;
    },
    // 互换操作
    exchange() {
      //将两个id的内容互换
      // console.log(this.$refs.streamlive1);
    },
    swtichimg(index) {
      let boxWidth = document.getElementById("imglist").offsetWidth / 2;
      if (index == 0) {
        document.getElementsByClassName("doclist")[0].scrollLeft = 0;
        this.clicked = index;
        this.currentimg = this.fileimglist.list[index].image_url;
        this.currentindex = index;
        this.addimg();
        return;
      }
      let id = "img" + (index - 1);
      let ofl = document.getElementById(id).parentNode.offsetLeft;
      console.log(ofl);
      if (ofl < boxWidth) {
        this.clicked = index;
        document.getElementsByClassName("doclist")[0].scrollLeft = 0;
        this.currentimg = this.fileimglist.list[index].image_url;
        this.currentindex = index;
        this.addimg();

        return;
      }
      let scrol = ofl - boxWidth;
      console.log(scrol);
      document.getElementsByClassName("doclist")[0].scrollLeft = scrol;
      this.clicked = index;
      this.currentimg = this.fileimglist.list[index].image_url;
      this.currentindex = index;
      this.addimg();
    },
    prevClick(index) {
      if (index == 0) {
        return;
      }
      this.swtichimg(index - 1);
    },
    nextClick(index) {
      if (index == this.totalimg - 1) {
        return;
      }
      this.swtichimg(index + 1);
    },
    // 切换开播状态
    // 计时器
    jishi() {
      this.sec++;
      if (this.sec >= 60) {
        this.sec = 0;
        this.min = this.min + 1;
        this.second = this.sec;
        this.minute = this.min;
      } else if (this.sec < 10) {
        this.second = "0" + this.sec;
      } else {
        this.second = this.sec;
      }

      if (this.min >= 60) {
        this.min = 0;
        this.hours = this.hours + 1;
        this.minute = this.min;
        this.hour = this.hours;
      } else if (this.min < 10) {
        this.minute = "0" + this.min;
      } else {
        this.minute = this.min;
      }
    },
    swtichstatus() {
      this.beginlive = !this.beginlive;
      if (this.beginlive) {
        this.publishStream(this.localStream, this.client);
        this.timerId = setInterval(this.jishi, 1000);
      } else {
        // 取消发布本地流
        this.$confirm("是否停止直播?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            clearInterval(this.timerId);
            this.unpublish();
            this.$message({
              type: "success",
              message: "直播已经停止!",
            });
          })
          .catch(() => {
            this.beginlive = !this.beginlive;
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      }
    },
    // 上传课件之前
    beforeUpload(file) {
      const islt100M = file.size / 1024 / 1024 < 100;
      return islt100M;
    },
    // 上传课件时提示
    Uploading(event, file, fileList) {
      this.loading = true;
    },
    // 上传文件相关函数
    uploadSuccess(response, file, fileList) {
      this.getfilelist();
    },
    // 获取课件列表
    getfilelist() {
      this.loading = true;
      let params = {
        liveId: this.liveId,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
      this.$http
        .post(this.$http.adornUrl("file/list", "proxyZx"), params)
        .then((data) => {
          if (data.code == 200) {
            console.log(data);
            this.filelist = data.data.list;
            this.loading = false;
          } else {
            console.log("error失败");
          }
        });
    },
    // 往画布里面添加图片
    addimg() {
      let myCanvas = document.getElementById("myCanvas");
      console.log(myCanvas);
      var context = myCanvas.getContext("2d");
      // 创建一个图片标签
      let img = document.createElement("img");
      console.log(this.currentimg);

      img.src = this.currentimg;
      console.log(this.currentimg);

      img.onload = function() {
        context.drawImage(this, 0, 0, 800, 450);
        // context.drawImage(this, 0, 0, 1080, 980)改变图片大小到1080*980
      };

      // 采用云端混合
    },
    // 采集画布流
    getCancasStream() {
      let canvasEl = document.getElementById("myCanvas");
      let stream = canvasEl.captrueStream(30);
    },
  },
};
</script>

<style lang="less" scoped>
.live {
  display: flex;
  min-width: 1200px;
  .leftwindow {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 500px;
    min-width: 600px;
    .header {
      min-height: 50px;
      height: 50px;
      background-color: #1a1b1f;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #cccccc;
      font-size: 14px;
      .liveinfo {
        margin-left: 18px;
      }
      .livetitle {
        font-size: 16px;
        color: #ffffff;
        i {
          height: 18px;
          font-style: normal;
          margin-left: 12px;
          border: 1px solid #adadc0;
          border-radius: 2px;
          box-sizing: content-box;
          padding: 0 8px;
          line-height: 18px;
          text-align: center;
        }
        i.liveing {
          color: #e33e3e;
          border: 1px solid #e33e3e;
        }
      }
    }
    .main {
      flex: 1;
      display: flex;
      .aside {
        position: relative;
        width: 80px;
        min-width: 80px;
        background-color: #1a1b1f;
        .model {
          > div {
            height: 62px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            color: #ffffff;
            font-size: 14px;
            margin-bottom: 10px;
            i {
              font-size: 200%;
            }
          }
          .active {
            color: #366bee;
          }
        }
        .others {
          position: absolute;
          width: 100%;
          bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          > div {
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            border-radius: 32px;
            background: #2b2c35;
            color: #adadc0;
            cursor: pointer;
            margin-bottom: 90px;
          }
          > div:first-child {
            line-height: 56px;
            background: #366bee;
            width: 56px;
            height: 56px;
            font-size: 14px;
            color: #fff;
            border-radius: 56px;
          }
          div.active {
            background: #ff5b5b;
            line-height: normal;
            width: 56px;
            height: 56px;
            font-size: 14px;
            color: #fff;
            border-radius: 56px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            span {
              font-size: 12px;
            }
          }
        }
      }
      .content {
        flex: 1;
        min-width: 800px;
        display: flex;
        flex-direction: column;
        #streamlive1 {
          flex: 1;
          background-color: rgb(43, 44, 53);
          display: flex;
          justify-content: center;
          align-items: center;
          .beforeadd {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            button {
              width: 160px;
              height: 40px;
              border-radius: 20px;
              border: none;
              outline: none;
              color: #fff;
              font-size: 16px;
              line-height: 40px;
              text-align: center;
              background-color: #366bee;
              cursor: pointer;
              margin-bottom: 20px;
            }
            span {
              color: #cccccc;
              font-size: 14px;
            }
          }
          .imgwindow {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            #myCanvas {
            }
          }
        }
        #streamlive2 {
          flex: 1;
          width: 100%;
        }
        .footer {
          margin-right: -1px;
          height: 150px;
          .options {
            height: 30px;
            background-color: #3e3e4e;
            border-right: 1px solid #000;
            .op {
              background-color: #2b2c35;
              float: right;
              height: 100%;
              display: flex;
              padding: 6px 3px 6px 12px;
              box-sizing: border-box;
              img {
                width: 16px;
                height: 16px;
              }
            }
            .streamop {
              > div {
                display: flex;
                justify-content: center;
                align-items: center;
              }
              > div:first-child img {
                margin-right: 10px;
              }
              span {
                font-size: 12px;
                color: #ffffff;
                margin-right: 12px;
              }
              > div:last-child {
                border-left: 1px solid #000;
                img {
                  margin: 0 8px;
                }
              }
            }
            .courseop {
              > div {
                display: flex;
              }
              > div:first-child {
                color: #ffffff;
                font-size: 12px;
                margin-right: 12px;
                height: 100%;
                > div {
                  cursor: pointer;
                  height: 100%;
                  width: 18px;
                  height: 18px;
                  background-color: #3e3e4e;
                  border-radius: 9px;
                  i {
                    line-height: 18px;
                  }
                }
                span {
                  margin: 0 6px;
                  line-height: 18px;
                }
              }
              > div:nth-child(2) {
                cursor: pointer;
                margin-right: 12px;
                img:first-child {
                  margin-right: 12px;
                }
              }
              > i {
                border-left: 1px solid #000;
                padding: 0 12px;
                cursor: pointer;
              }
            }
            .courselist {
              float: left;
              height: 100%;
              padding: 5px 0;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              > div {
                width: 160px;
                height: 100%;
                border-right: 1px solid #1a1b1f;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                color: #adadc0;
                align-items: center;
                span {
                  font-size: 12px;
                  margin-left: 10px;
                  width: 120px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  text-align: left;
                }
                i {
                  cursor: pointer;
                  margin-right: 8px;
                }
              }
            }
          }
          .adddoc {
            height: 120px;
            background-color: #1a1b1f;
            display: flex;
            align-items: center;
            border-right: 1px solid #000000;
            > div:first-child {
              width: 101px;
              height: 78px;
              margin-left: 20px;
              background: #3e3e4e;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: #adadc0;
              font-size: 12px;
              cursor: pointer;
              i {
                font-size: 200%;
              }
            }
            .doclist {
              position: relative;
              height: 100px;
              flex: 1;
              overflow: auto;
              margin-left: 16px;
              margin-top: 10px;
              > div {
                position: relative;
                white-space: nowrap;
                box-sizing: border-box;
                text-align: left;
                div {
                  position: relative;
                  display: inline-block;
                  width: 102px;
                  height: 78px;
                  margin-right: 6px;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                  i {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 20px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    background: rgba(0, 0, 0, 0.9);
                    font-size: 12px;
                    color: #fff;
                    font-style: normal;
                  }
                }
                .clicked {
                  border: 2px solid rgb(5, 74, 195);
                }
              }
            }
            .doclist::-webkit-scrollbar {
              width: 10px;
              height: 10px;
              /**/
            }
            .doclist::-webkit-scrollbar-track {
              // background: rgb(239, 239, 239);
              border-radius: 2px;
            }
            .doclist::-webkit-scrollbar-thumb {
              background: rgb(5, 74, 195);
              border-radius: 10px;
            }
            .doclist::-webkit-scrollbar-thumb:hover {
              background: rgb(5, 74, 195);
            }
            .doclist::-webkit-scrollbar-corner {
              background: #179a16;
            }
          }
        }
      }
    }
  }
  .rightwindow {
    width: 300px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    background: #1a1b1f;
    #streamlive2 {
      height: 168px;
      background-color: transparent;
      position: relative;
      .swtich {
        position: absolute;
        z-index: 99;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 14px;
          cursor: pointer;
          background: rgb(26, 27, 31);
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 16px;
            height: 16px;
          }
          i {
            display: none;
            position: absolute;
            font-style: normal;
            border: 1px solid #000;
            padding: 4px;
            height: 16px;
            bottom: -24px;
            z-index: 100;
            left: 24px;
            font-size: 12px;
            background-color: rgb(228, 228, 228);
            white-space: nowrap;
          }
        }
        span:hover {
          background-color: rgb(54, 107, 238);
          i {
            display: block;
          }
        }
        span:nth-child(2) {
          margin: 0 10px;
        }
      }
      .livestatus {
        position: absolute;
        width: 100%;
        bottom: 0;
        z-index: 98;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        img {
          width: 16px;
          height: 16px;
          margin-left: 6px;
        }
        span:first-child {
          width: 100%;
          text-align: right;
          margin-right: 10px;
          color: #ffffff;
        }
      }
    }
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      .tag {
        height: 32px;
        background-color: #3e3e4e;
        display: flex;
        span {
          position: relative;
          width: 100%;
          text-align: center;
          line-height: 32px;
          font-size: 12px;
          color: #ffffff;
          cursor: pointer;
          i {
            position: absolute;
            height: 2px;
            width: 30px;
            bottom: 0;
            left: 50%;
            margin-left: -15px;
            background-color: #ffffff;
          }
        }
      }
      .chatW {
        flex: 1;
        display: flex;
        flex-direction: column;
        .chat {
          flex: 1;
          ul {
            overflow: auto;
            padding: 10px 10px;
            box-sizing: border-box;
            li {
              margin-bottom: 15px;
              color: #adadc0;
            }
            .right {
              > div {
                float: right;
                max-width: 190px;
                padding: 6px 7px;
                box-sizing: border-box;
                line-height: 18px;
                font-size: 12px;
                background: #2b2c35;
                text-align: left;
              }
            }
            .left {
              float: left;
              display: flex;
              img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin-right: 10px;
              }
              > div {
                p {
                  font-size: 12px;
                  margin-bottom: 4px;
                  text-align: left;
                }
                div {
                  text-align: left;
                  max-width: 190px;
                  padding: 6px 7px;
                  box-sizing: border-box;
                  line-height: 18px;
                  font-size: 12px;
                  background: #2b2c35;
                }
              }
            }
          }
          ul::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            /**/
          }
          ul::-webkit-scrollbar-track {
            // background: rgb(239, 239, 239);
            border-radius: 2px;
          }
          ul::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 10px;
          }
          ul::-webkit-scrollbar-thumb:hover {
            background: #333;
          }
          ul::-webkit-scrollbar-corner {
            background: #179a16;
          }
        }
        .footer {
          height: 150px;
          > div:first-child {
            height: 30px;
            background-color: #3e3e4e;
          }
          > div:nth-child(2) {
            height: 80px;
            textarea {
              width: 100%;
              height: 100%;
              background-color: #1a1b1f;
              border: none;
              resize: none;
              outline: none;
              padding: 8px 6px;
              box-sizing: border-box;
              color: #cccccc;
            }
          }
          > div:last-child {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            > span {
              font-size: 12px;
              color: #ffffff;
              margin-left: 10px;
            }
            > div {
              span {
                color: #cccccc;
              }
              button {
                width: 62px;
                height: 22px;
                font-size: 12px;
                border-radius: 11px;
                margin: 0 11px;
                color: #fff;
                background-color: #2196f3;
                border: none;
                outline: none;
                cursor: pointer;
              }
            }
          }
        }
      }
      .viewers {
        flex: 1;
        position: relative;
        > div:first-child {
          height: 36px;
          box-sizing: border-box;
        }
        > div.userlist {
          padding: 8px 4px;
          li {
            display: flex;
            height: 32px;
            margin-bottom: 8px;
            align-items: center;
            justify-content: space-between;
            > div:first-child {
              display: flex;
              align-items: center;
              img {
                width: 24px;
                height: 24px;
                border-radius: 12px;
                margin-right: 8px;
              }
              span {
                font-size: 12px;
                color: #cccccc;
                line-height: 16px;
              }
              > span.teacher {
                background: #366bee;
                margin-right: 4px;
                color: #fff;
                border-radius: 2px;
                text-align: center;
                padding: 0 4px;
                height: 16px;
                line-height: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.live {
  .leftwindow {
    #streamlive1 {
    }
    .adddoc {
    }
  }
  .rightwindow {
    .usersearch {
      input {
        border-radius: 0;
        border: none;
        background-color: rgb(43, 44, 53);
      }
    }
    .el-pagination {
      padding: 0;
      button {
        background: transparent;
      }
      i.el-icon.el-icon-arrow-right,
      i.el-icon.el-icon-arrow-left {
        color: #fff;
      }
      .el-dialog,
      .el-pager li {
        background: transparent;
      }
    }
  }
  .myclass {
    .el-dialog {
      width: 600px;
      .el-dialog__header {
        display: flex;
        height: 44px;
        padding: 0 20px;
        justify-content: space-between;
        align-items: center;
        background: rgb(62, 62, 78);
        display: flex;
        .el-dialog__title {
          color: #ffffff;
          font-size: 14px;
        }
        .el-dialog__headerbtn {
          position: relative;
          top: 0;
          right: 0;
          i.el-dialog__close.el-icon.el-icon-close {
            color: #fff;
          }
        }
      }
      .el-dialog__body {
        padding: 0;
        .option {
          position: relative;
          background: rgb(62, 62, 78);
          height: 62px;
          display: flex;
          box-sizing: border-box;
          padding: 20px 0;
          > div {
            width: 50%;
            color: #ffffff;
          }
          > div:first-child {
            display: flex;
            justify-content: center;
            align-items: center;
            > i {
              font-size: 120%;
              margin-top: 2px;
              color: red;
            }
            .el-upload.el-upload--text {
              display: flex;
              justify-content: center;
              align-items: center;
              button.el-button.el-button--primary.el-button--small {
                border: none;
                background: transparent;
                font-size: 14px;
              }
            }
          }
          > div:last-child {
            display: flex;
            justify-content: center;
            align-items: center;
            border-left: 1px solid #000000;
            img {
              margin-right: 20px;
            }
          }
          span.tooltip {
            position: absolute;
            bottom: -14px;
            left: 50%;
            margin-left: -88px;
            z-index: 1000;
            padding: 8px 12px;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
        }
        .Coursewares {
          .cell {
            text-align: center;
          }
          .el-table__row {
            div.cell > div {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              padding-right: 6px;
            }
          }
          .el-pagination.el-pagination--small {
            margin-top: 20px;
            span {
              cursor: pointer;
            }
          }
          .el-table_1_column_4 {
            .cell > div {
              span {
                cursor: pointer;
              }
              i {
                margin-left: 40px;
                margin-top: 2px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .systemset {
    .el-dialog {
      width: 360px;
      height: 400px;
    }
  }
}
</style>
