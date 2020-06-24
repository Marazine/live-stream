<template>
  <div class="errorweb">
    <div>
      <i class="el-icon-warning"></i>
      <span
        >您的浏览器尚不支持网页直播，请使用最新的Chrome版本的浏览器发起直播</span
      >
    </div>
    <div>
      <span></span>
      <span>Chrome浏览器</span>
      <span></span>
    </div>
    <div>
      <img src="../assets/chrome.svg" alt="" />
      <el-link
        href="https://www.google.cn/chrome/"
        :underline="false"
      >
         <el-button type="primary">下载Chrome浏览器</el-button>
      </el-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less">
.errorweb {
  margin-top: 200px;
  i.el-icon-warning {
    color: #e33e3e;
  }
  > div:first-child {
    span {
      font-size: 16px;
      margin-left: 8px;
    }
  }
  > div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
    > span {
      height: 1px;
      width: 100px;
      background-color: #000;
    }
    > span:nth-child(2) {
      width: 100px;
      height: 16px;
      background-color: transparent;
      font-size: 14px;
      margin: 0 40px;
    }
  }
  > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 120px;
      margin-bottom: 20px;
    }
  }
}
</style>
