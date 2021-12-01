<template>
  <div class="content">
    <div class="content-header">
      <img src="" alt="" class="content-header-icon" />
      <div class="content-header-title">
        <div class="content-header-title-name">{{tweet.User.name}}</div>
        <div class="content-header-title-account">@{{tweet.User.account}}</div>
      </div>
    </div>
    <div class="content-body">
      {{tweet.text}}
    </div>
    <div class="content-time">{{tweet.createdAt}}</div>
    <div class="content-info">
      <div class="content-info-reply">
        <div class="content-info-reply-count">
          {{tweet.Replies.length}}<span class="content-info-reply-unit"> 回覆</span>
        </div>
      </div>
      <div class="content-info-liked">
        <div class="content-info-liked-count">
          {{tweet.Likes.length}}<span class="content-info-liked-unit"> 喜歡次數</span>
        </div>
      </div>
    </div>
    <div class="content-action">
      <div
        class="content-action-reply"
        data-bs-toggle="modal"
        data-bs-target="#tweet-reply-modal"
      ></div>
      <img v-if="!isLiked" src="./../../public/images/icon_like_2x.png" alt="" class="content-action-liked" @click.stop.prevent="addLike(tweet.id)"/>
      <img src="./../../public/images/icon_like_fill_2x.png" alt="" class="content-action-liked" @click.stop.prevent="deleteLike(tweet.id)"/>
    </div>
  </div>
</template>

<script>
const tweet = {
  id: 2,
  text: "zrtdhuua trtdghui etsfgj gfgfgrtewrt dfjshdjkh eruihwuierh fkjdsflakwerfkj dkfjasldkfe fjdkfe rer; vsdfklj erterjwrjlsdf fdlf feiojg, bvbvbf.",
  UserId: 1,
  createdAt: "2021-11-23T07:25:29.000Z",
  updatedAt: "2021-11-23T07:25:29.000Z",
  User: {
    id: 1,
    name: "user1",
    account: 'user1',
    email: "user1@example.com",
    password: "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
    isAdmin: false,
    image: "https://i.imgur.com/RnQRoJb.png",
    createdAt: "2021-11-23T07:25:29.000Z",
    updatedAt: "2021-11-26T04:22:35.000Z",
  },
  Replies: [{}, {}],
  Likes: [{}],
  isLiked: true
},
    

export default {
  name: 'TweetContent',
  data() {
    return {
      tweet: {
        id: 1,
        name: '',
        account: '',
        image: '',
        text: '',
        replyLength: 0,
        likeLength: 0,
        isLiked: false
      }
    }
  },
  created() {
    this.fetchTweet()
  },
  methods: {
    fetchTweet() {
      const {id, createdAt, updatedAt, User, Replies, text, Likes, isLiked} = tweet
      this.tweet = {
        id, createdAt, updatedAt, text,
        name: User ? User.name: '匿名使用者',
        account: User ? User.account: '匿名帳號',
        image: User.image,
        replyLength: Replies? Replies.length : 0,
        likeLength: Likes ? Likes.length: 0,
        isLiked
      }
    },
    addLike(tweetId) {
      console.log(tweetId)
      this.isLiked = true
      this.likeLength = this.likeLength + 1
    },
    deleteLike(tweetId) {
      console.log(tweetId)
      this.isLiked = false
      this.likeLength = this.likeLength - 1
    }
  }
}
</script>

<style lang="sass" scoped>
</style>