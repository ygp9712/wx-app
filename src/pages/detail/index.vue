<template>
  <div class="container">
    <div class="book-detail">
      <b class="book-title">{{bookItem.title}}</b>
      <img  mode="widthFix" class="book-img" :src="bookItem.src" alt="">
      <p>作者：{{bookItem.writer}}</p>
      <p>出版社：{{bookItem.publisher}}</p>
      <p>出版日期：{{bookItem.year}}</p>
      <p>定价：{{bookItem.price}}</p>
    </div>
    <button open-type="share" class="share-btn">
      分享给好友
    </button>
    <div class="author">
      <p class="auth-title">
        作者简介
      </p>
      <p class="auth-content">
        {{bookItem.authContent}}
      </p>
    </div>
    <div class="descript">
      <p class="des-title">
        内容简介
      </p>
      <p class="des-content" v-html="bookItem.content"></p>
    </div>
    <book-comment :isLogin="this.$mp.query.isLogin" :bookId="bookItem.id" :bookTitle="bookItem.title"></book-comment>    

    <collection :isLike="this.$mp.query.isLike" :mark="this.$mp.query.mark" :isLogin="this.$mp.query.isLogin"></collection>
  </div>
</template>

<script>
import bookComment from './components/comment.vue';
import collection from '../../assets/common/collection.vue';
import request from '../../utils/request';
export default {
  data() {
    return {
      bookItem: {}
    }
  },
  components: {
    collection,
    bookComment
  },
  async onShow() {
    let result = await request('/getBook', {id : this.$mp.query.id, subject : this.$mp.query.subject});
    this.bookItem = result[0];
    console.log(this.bookItem);
    wx.setNavigationBarTitle({
      title: this.bookItem.title
    })
  },
  async mounted () {
    let result = await request('/getBook', {id : this.$mp.query.id, subject : this.$mp.query.subject});
    this.bookItem = result[0];
    console.log(this.bookItem);
    wx.setNavigationBarTitle({
      title: this.bookItem.title
    })
  },
  onShareAppMessage (event) {
    /* console.log(event); */
    //若要自定义转发内容，需要return对象
    return {
      title: this.bookItem.title,
      path: `/pages/detail/main?id=${this.$mp.query.id}&subject=${this.$mp.query.subject}`,
      imageUrl: this.bookItem.src
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    margin: 0 auto;
    width: 600rpx;
    .book-detail

      .book-title
        margin: 16rpx 0;
        text-align: center;
        font-weight: bold;
        font-size: 42rpx;

      .book-img
        width: 100%;
      
      p
      line-height: 46rpx;

    .share-btn
      display: block;
      margin: 20rpx auto 0;
      text-align: center;
      width: 400rpx;
      height: 80rpx;
      line-height: 80rpx;
      border: 1rpx solid grey;
      background-color: #eaeaea;
      /* &:hover
        background: #fff */
      
    .author
      .auth-title
        font-size: 40rpx;
        color: red;
        text-align: center;
        font-weight: bold;
        line-height: 80rpx;
      .auth-content
        text-indent: 65rpx;
    .descript
      .des-title
        font-size: 40rpx;
        color: green;
        text-align: center;
        font-weight: bold;
        line-height: 80rpx;

      .des-content
        height: 700rpx;
        text-indent: 65rpx;

      
</style>