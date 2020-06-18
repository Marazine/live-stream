<template>
  <div class="navbar">
    <div class="logo">
      <!-- <img src="" alt=""> -->
    </div>
    <div class="list">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#272c2f"
        text-color="#c9ced6"
        active-text-color="#2196f3"
      >
        <el-menu-item index="1">云直播</el-menu-item>
        <el-menu-item index="2">账号统计</el-menu-item>
        <el-menu-item index="3">通用设置</el-menu-item>
      </el-menu>
    </div>
    <div class="userinfo">
      <div class="utils">
        <i class="el-icon-edit"></i>
        <i class="el-icon-share"></i>
        <i class="el-icon-delete"></i>
      </div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          zhibo@yl1001.com
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><a href="#">账号信息</a></el-dropdown-item>
          <el-dropdown-item><a href="#">退出登录</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
.navbar {
  height: 56px;
  background-color: #272c2f;
  .logo {
    float: left;
    width: 15%;
    height: 100%;
  }
  .list {
    float: left;
    height: 100%;
  }
  .userinfo {
    float: right;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .utils {
      display: flex;
    }
  }
}
</style>
<style lang="less">
.navbar {
  .list {
    ul.el-menu-demo.el-menu--horizontal.el-menu {
      height: 100%;
      li {
        height: 100%;
      }
    }
  }
  .userinfo {
    i {
      margin-right: 10px;
    }
    i.el-icon-edit {
      color: #c9ced6;
    }
    i.el-icon-share {
      color: #c9ced6;
    }
    i.el-icon-delete {
      color: #c9ced6;
    }
    span.el-dropdown-link.el-dropdown-selfdefine {
      color: #c9ced6;
    }
  }
}
</style>