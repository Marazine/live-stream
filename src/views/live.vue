<template>
  <div class="live clearfix">
    <div class="leftwindow" ref="leftwindow">
      <div class="header">
        <span class="liveinfo"> 房间号 {{ roomId }} </span>
        <span class="livetitle">
          <span>{{ liveName }}</span>
          <i v-if="!beginlive">未直播</i>
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
              <img
                v-if="showmodel != 1"
                src="../assets/live/kejian.png"
                alt=""
              />
              <img v-else src="../assets/live/kejian2.png" alt="" />
              <span>课件</span>
            </div>
            <div
              @click="showScreen"
              ref="share"
              class="share"
              :class="{ active: showmodel == 2 }"
            >
              <img
                v-if="showmodel != 2"
                src="../assets/live/gongxiangpingmu.png"
                alt=""
              />
              <img v-else src="../assets/live/gongxiangpingmu2.png" alt="" />
              <span>屏幕共享</span>
            </div>
          </div>
          <div class="others">
            <div v-if="!beginlive" @click.prevent="showLive()">开播</div>
            <div v-else class="active" @click.prevent="downLive()">
              <span>{{ hour }}:{{ minute }}:{{ second }}</span>
              <span>下播</span>
            </div>
          </div>
        </div>
        <div class="content">
          <div
            id="streamlive1"
            class="streamlive1"
            ref="streamlive1
          "
          >
            <div class="beforeadd" v-if="fileimglist.list.length == 0">
              <img src="../assets/live/添加文档.png" alt />
              <button @click.prevent="showdoclist">添加课件</button>
              <span>或点击左下角添加课件</span>
            </div>
            <img class="imgwindow" v-else :src="currentimg" alt="" />
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
                  <!-- <img @click="exchange" src="../assets/live/互换.png" alt /> -->
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
                  <!-- <img src="../assets/live/互换.png" alt /> -->
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
                <span>添加课件</span>
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
          <!-- < class="footer">
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
          </ div> -->
          <div class="chattip">
            当前聊天室暂不支持讲师发言
          </div>
        </div>
      </div>
    </div>
    <!-- 添加文档 -->
    <el-dialog
      class="myclass"
      title="我的课件"
      :visible.sync="dialogTableVisible"
    >
      <div class="option">
        <div>
          <el-upload
            action="//zhibotest.yl1001.com/webservice/live_video/index.jsp/v1/sys/file/add?token=dXNlcj1saXZlX3ZpZGVvJnB3ZD1saXZlX3ZpZGVvX2RhdGFfam9iMTAwMQ=="
            :limit="1"
            :show-file-list="false"
            accept=".ppt, .pptx, .pdf,.word,.doc,.docx"
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
          <span>* 仅支持ppt、pptx、pdf、word、doc、docx</span>
          <span>* 上传课件大小不能超过100MB</span>
        </span>
        <div>
          <img
            style="cursor: pointer;"
            @click="getfilelist"
            src="../assets/live/刷新.png"
            alt
          />
          <span style="cursor: pointer;" @click="getfilelist" class="btn"
            >刷新列表</span
          >
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
                <span style="cursor: pointer;" @click="openClick(scope.row)"
                  >打开课件</span
                >
                <i
                  style="cursor: pointer;margin-left: 40px;"
                  class="el-icon-delete"
                  @click="delClick(scope.row)"
                ></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TRTC from "trtc-js-sdk";
import screenfull from "screenfull";
import LibGenerateTestUserSig from "../utils/lib-generate-test-usersig.min.js";
export default {
  data() {
    return {
      roomId: "",
      userId: "",
      liveName: "",
      liveId: "", // 直播Id
      input: "", // 聊天框文字
      client: "", // 客户端服务
      remoteStream: "", // 远方播放流
      localStream: "", // 本地流
      dialogTableVisible: false, // 上传课件弹窗
      istishi: false, // 上传课件的提示
      showmodel: 1, // 左侧功能突出显示
      islive: true, // 是否正在直播
      ishover: false, // 右上角是否悬浮显示功能选项
      deviceStatus: {
        // 摄像头、麦克风、扬声器是否启用
        voice: true,
        Microphone: true,
        camera: true,
      },
      isxiala: false, // 下拉状态
      isfullScreen: false, // 全屏状态
      // charword: "",
      comId: 0, // 聊天最后一条消息的Id
      chatlist: [], // 消息列表
      userForeignKey: "21908338", // 评论ID
      pageNo: 1, // 课件列表页码
      pageSize: 5, // 课件列表页尺寸
      filelist: [], // 课件列表数据
      loading: null, // 课件列表是否加载
      fileimglist: {
        // 打开课件图片列表
        name: "",
        list: [],
      },
      clicked: 0, // 当前点击的图片位置
      currentimg: "", // 当前课件图片
      totalimg: null, // 图片总数
      currentindex: null, // 当前图片的index
      beginlive: false, // 是否正在直播
      hour: "00", // 计时器
      minute: "00",
      second: "00",
      timerId: null, // 定时器的清除标识
      sec: 0,
      min: 0,
      hours: 0,
      isshowScreen: false,
      // 是否已经退出房间
      isjoinroom: true,
      ishavaStream: false, // 是否发布
      inspectInfo: {}, // 前面检测结果
    };
  },
  created() {
    let liveInfo = JSON.parse(window.sessionStorage.getItem("liveInfo"));
    this.roomId = liveInfo.roomId;
    this.userId = liveInfo.userId;
    this.liveName = liveInfo.liveName;
    this.liveId = liveInfo.liveId;
    console.log(this.roomId,this.userId,this.liveName,this.liveId);
    this.inspectInfo = JSON.parse(window.sessionStorage.getItem("inspectInfo"));
  },
  mounted() {
    this.initStyle();
    this.initStream();
    window.onresize = () => {
      this.initStyle();
    };
  },
  watch: {
    // charword: function(newVal, oldVal) {
    //   this.charword = this.charword.length > 200 ? oldVal : newVal;
    // },
  },
  methods: {
    // 初始化样式
    initStyle() {
      const windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.$refs.leftwindow.style.height = windowHeight + "px";
      this.$refs.rightwindow.style.height = windowHeight + "px";
      this.$refs.chats.style.height = windowHeight - 168 - 32 - 30 + "px";
    },
    // 获取userSig和sdkAppId
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
    // 初始化房间
    initStream() {
      const sdkAppId = this.genTestUserSig(this.userId).sdkAppId;
      const userSig = this.genTestUserSig(this.userId).userSig;
      // 创建Client对象
      this.client = TRTC.createClient({
        mode: "live",
        sdkAppId: sdkAppId,
        userId: this.userId,
        userSig: userSig,
      });
      console.log(this.userId,this.roomId);
      
      // 初始化之后加入房间
      this.joinRoom(this.client, this.roomId,1);
      this.getchatlist();
    },
    // 加入房间
    joinRoom(client, roomId,flag) {
      client
        .join({ roomId })
        .catch((error) => {
          console.log("进房失败", error);
        })
        .then(() => {
          console.log("进房成功");
          this.isjoinroom = true;
          if(flag) {
            this.createStream(this.userId);
          }
        });
    },
    // 音频流创建
    createStream(userId) {
      if (!this.isjoinroom) {
        this.joinRoom(this.client, this.roomId);
      }
      this.localStream = TRTC.createStream({
        userId,
        audio: true,
        video: this.inspectInfo.video,
      });
      this.localStream.setVideoProfile({
        width: 1280, // 视频宽度
        height: 720, // 视频高度
        frameRate: 15, // 帧率
        bitrate: 1500, // 比特率 kbps
      });
      this.localStream
        .initialize()
        .catch((error) => {
          console.log("初始化音频流失败", error);
        })
        .then(() => {
          console.log("初始化音频流成功");
          this.playStream();
        });
    },
    // 屏幕分享流创建
    createScreenStream(userId) {
      if (!this.isjoinroom) {
        this.joinRoom(this.client, this.roomId);
      }
      this.showmodel = 2;
      this.localStream = TRTC.createStream({
        userId,
        audio: true,
        screen: true,
      });
      this.localStream.setScreenProfile({
        width: 1280,
        height: 720,
        frameRate: 15,
        bitrate: 1500,
      });
      // 初始化
      // 监听屏幕分享停止事件
      this.localStream
        .initialize()
        .catch((error) => {
          console.log("初始化屏幕分享流失败", error);
          this.isshowScreen = false;
          this.destructionStream();
          this.createStream();
          this.showmodel = 1;
        })
        .then(() => {
          console.log("初始化屏幕分享流成功");
          this.isshowScreen = true;
          this.playStream();
          // 检测屏幕分享停止事件
          this.localStream.on("player-state-changed", (event) => {
            if (event.reason == "ended") {
              this.showmodel = 1;
              this.isshowScreen = false;
              this.destructionStream();
              this.createStream();
            }
          });
        });
    },
    // 销毁当前准备流
    destructionStream() {
      this.localStream.close();
      this.localStream = null;
    },
    // 开播
    showLive() {
      // 判断当前流是否已经准备，未准备就创建一个音视频流
      // TODO 设置用户不可点击 三到五秒
      if (!this.isjoinroom) {
        this.joinRoom(this.client, this.roomId);
      }
      this.beginlive = true;
      // 发布本地流
      setTimeout(() => {
        this.PublishStream(this.localStream, this.client);
      }, 1000);
    },
    // 下播
    downLive() {
      if (this.isshowScreen) {
        this.$confirm("请在结束屏幕分享之后下播！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      this.$confirm("是否停止直播?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 退出房间，设置一个标识符
          this.isjoinroom = false;
          this.$message({
            type: "success",
            message: "直播已经停止!",
          });
          this.client
            .leave()
            .then(() => {
              console.log("退出房间成功");
              this.isjoinroom = false;
            })
            .catch((error) => {
              console.error("leaving room failed: " + error);
            });
          this.beginlive = false;
          this.isshowScreen = false;
          this.unPublishStream();
          clearInterval(this.timerId);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 屏幕分享开始
    showScreen() {
      if (this.isshowScreen) {
        this.$confirm("请勿重复进行屏幕分享！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
        return;
      }
      if (this.beginlive) {
        // 已经在直播中,取消发布
        this.unPublishStream();
      }
      this.destructionStream();
      this.createScreenStream(this.userId);
    },
    // 取消发布当前推送流
    unPublishStream() {
      this.client.unpublish(this.localStream).then(() => {
        console.log("本地流取消发布成功");
        this.ishavaStream = false;
      });
    },
    // 播放本地流
    playStream() {
      this.localStream.play("streamlive2");
      const video = document.getElementsByTagName("video")[0];
      video.style.position = "relative";
      if (this.beginlive) {
        return this.PublishStream(this.localStream, this.client);
      }
    },
    // 发布本地音视频流
    PublishStream(localStream, client) {
      client
        .publish(localStream)
        .catch((error) => {
          console.log("本地流发布失败", error);
        })
        .then(() => {
          clearInterval(this.timerId);
          console.log("本地流发布成功");
          this.jishi();
          this.ishavaStream = true;
        });
    },
    // 退出音视频流
    leaveRoom(client) {
      client
        .leave()
        .then(() => {
          console.log("退房成功");
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
              if (data.data.length != 0) {
                this.comId = data.data[data.data.length - 1].msgId;
                this.chatlist.push(...data.data);
                this.$nextTick(() => {
                  let obj = document.getElementById("chats");
                  obj.scrollTop = obj.scrollHeight;
                });
              }
            }
          });
      }, 1000);
    },
    // 上传课件之前
    beforeUpload(file) {
      const islt100M = file.size / 1024 / 1024 < 50;
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
    // 展示上传课件弹窗
    showdoclist() {
      this.dialogTableVisible = true;
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
            this.dialogTableVisible = false;
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
            console.log("获取课件失败");
          }
        });
    },
    // 开播时间计时器
    jishi() {
      this.timerId = setInterval(() => {
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
      }, 1000);
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
    swtichimg(index) {
      let boxWidth = document.getElementById("imglist").offsetWidth / 2;
      if (index == 0) {
        document.getElementsByClassName("doclist")[0].scrollLeft = 0;
        this.clicked = index;
        this.currentimg = this.fileimglist.list[index].image_url;
        this.currentindex = index;
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
        return;
      }
      let scrol = ofl - boxWidth;
      console.log(scrol);
      document.getElementsByClassName("doclist")[0].scrollLeft = scrol;
      this.clicked = index;
      this.currentimg = this.fileimglist.list[index].image_url;
      this.currentindex = index;
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
            height: 58px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #ffffff;
            font-size: 14px;
            margin-bottom: 10px;
            img {
              width: 24px;
              height: 24px;
            }
          }
          .active {
            color: #366bee;
          }
        }
        .others {
          position: absolute;
          width: 100%;
          bottom: 0;
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
            margin-bottom: 120px;
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
            img {
              width: 132px;
              height: 128px;
              margin-bottom: 20px;
            }
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
            width: 90%;
            height: 400px;
          }
        }
        .footer {
          margin-right: -1px;
          height: 150px;
          border: 1px solid #000000;
          .options {
            height: 30px;
            background-color: #3e3e4e;
            border-bottom: 1px solid #000000;
            .op {
              background-color: #2b2c35;
              float: right;
              height: 100%;
              display: flex;
              padding: 6px 3px 6px 12px;
              box-sizing: border-box;
              border-right: 1px solid #000000;
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
        .chattip {
          height: 30px;
          text-align: center;
          line-height: 30px;
          color: #ccc;
          background: #179a16;
          font-size: 12px;
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
              color: #3f83d1;
              cursor: pointer;
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
            bottom: -30px;
            left: 50%;
            margin-left: -88px;
            z-index: 100000;
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
