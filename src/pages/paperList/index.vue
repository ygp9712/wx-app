<template>
  <div class="container">
    <div class="paper-item" v-for="(item, index) of paperList" :key="index" @click="goPaper(item, index)">
      <div class="item-content">
        {{item.paper}}
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request';
export default {
  data() {
    return {
      paperList: ["1","2","3"]
    }
  },
  methods:{
    goPaper (paper) {
      wx.showLoading();
      wx.setStorage({
        key: "paper",
        data: paper
      })
      wx.hideLoading();
      wx.navigateTo({
        url:`/pages/paper/main?port=${this.$mp.query.port}`
      })
      
    }
  },
  async onShow () {
    wx.hideLoading();
    let port = this.$mp.query.port;
    let result = await request('/getPaperList', {port: port});
    wx.setNavigationBarTitle({
      title: result.title
    })
    this.paperList = result.paperList;
  }
}
</script>

<style lang="stylus" scoped>
  .container
    display: block;
    background: #f2f2f2;
    height: 100%;
    .paper-item
      position: relative
      width: 100%;
      height: 200rpx;
      line-height: 160rpx;
      .item-content
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 16rpx;
        box-shadow: 4rpx 4rpx 15rpx grey;
        display: block;
        background: #ffffff;
        height: 80%;
        width: 90%;
        text-indent: 20rpx;
</style>