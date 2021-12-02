<template>
  <div>
    <div class="top">
      <img src="" alt="" class="top-backIcon" />
      <p class="top-title">推文</p>
    </div>
    <div class="content">
      <div class="content-header">
        <img :src="tweet.image" alt="" class="content-header-icon" />
        <div class="content-header-title">
          <div class="content-header-title-name">{{ tweet.name }}</div>
          <div class="content-header-title-account">@{{ tweet.account }}</div>
        </div>
      </div>
      <div class="content-body">
        {{ tweet.text }}
      </div>
      <div class="content-time">{{ tweet.createdAt }}</div>
      <div class="content-info">
        <div class="content-info-reply">
          <div class="content-info-reply-count">
            {{ tweet.replyLength
            }}<span class="content-info-reply-unit"> 回覆</span>
          </div>
        </div>
        <div class="content-info-liked">
          <div class="content-info-liked-count">
            {{ tweet.likeLength
            }}<span class="content-info-liked-unit"> 喜歡次數</span>
          </div>
        </div>
      </div>
      <div class="content-action">
        <img
          src="./../../public/images/icon_message_2x.png"
          alt=""
          class="content-action-reply"
          data-bs-toggle="modal"
          data-bs-target="#tweet-reply-modal"
        />
        <img
          v-if="!tweet.isLiked"
          src="./../../public/images/icon_like_2x.png"
          alt=""
          class="content-action-liked"
          @click.stop.prevent="addLike(tweet.id)"
        />
        <img
          src="./../../public/images/icon_like_fill_2x.png"
          alt=""
          class="content-action-liked"
          @click.stop.prevent="deleteLike(tweet.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
const dummyData = {
  tweet: {
    id: 56,
    text: "Autem veniam tempore fdsfk iore jklerkjadkf adwerr jke trwertre opldlszl dfsdfwer.",
    UserId: 2,
    createdAt: "2021-11-23T07:25:29.000Z",
    updatedAt: "2021-11-23T07:25:29.000Z",
    User: {
      id: 2,
      name: "user1",
      account: "user1",
      email: "user1@example.com",
      password: "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
      isAdmin: false,
      image: "https://i.imgur.com/RnQRoJb.png",
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-26T04:22:35.000Z",
    },
    Replies: [
      {
        id: 1,
        UserId: 1,
        User: {
          name: "Mary Jane",
          account: "@mjjane",
          image: "https://i.imgur.com/MRdy9z2.png",
        },
        createdAt: "2019-06-22T09:00:43.000Z",
        text: "Great~",
      },
      {
        id: 2,
        UserId: 221,
        User: {
          name: "Squishy Tom",
          account: "@sushiTom",
          image: "https://i.imgur.com/a0BP98T.png",
        },
        createdAt: "2019-06-22T09:00:43.000Z",
        text: "Good Job!",
      },
      {
        id: 3,
        UserId: 13,
        User: {
          name: "Moter Forker",
          account: "@moterforker",
          image: "https://i.imgur.com/RGxqLdu.png",
        },
        createdAt: "2019-06-22T09:00:43.000Z",
        text: "Moter Forker!",
      },
    ],
    Likes: [{}, {}],
    isLiked: true,
  },
};

export default {
  name: "TweetContent",
  data() {
    return {
      tweet: {
        id: 1,
        name: "",
        account: "",
        image: "",
        text: "",
        replyLength: 0,
        likeLength: 0,
        isLiked: false,
      },
    };
  },
  created() {
    this.fetchTweet();
  },
  methods: {
    fetchTweet() {
      const { id, createdAt, updatedAt, User, Replies, text, Likes, isLiked } =
        dummyData.tweet;
      this.tweet = {
        id,
        createdAt,
        updatedAt,
        name: User ? User.name : "匿名",
        account: User ? User.account : "匿名",
        image: User ? User.image : "",
        text,
        replyLength: Replies ? Replies.length : 0,
        likeLength: Likes ? Likes.length : 0,
        isLiked,
      };
    },
    addLike(tweetId) {
      console.log(tweetId);
      this.isLiked = true;
      this.likeLength = this.likeLength + 1;
    },
    deleteLike(tweetId) {
      console.log(tweetId);
      this.isLiked = false;
      this.likeLength = this.likeLength - 1;
    },
  },
};
</script>

<style lang="sass" scoped>
.top
  height: 55px
  padding: 15px
  display: flex
  border-bottom: 1px solid $input-border
  .top-backIcon
  .top-title
    margin: 0
    font-size: 18px
    font-weight: 700
    color: $text-content

.content
  padding: 15px
  border-bottom: 1px solid $input-border
  .content-header
    display: flex
    .content-header-icon
      width: 50px
      height: 50px
      border-radius: 50%
      object-fit: cover
    .content-header-title
      padding-top: 3px
      margin-left: 10px
      .content-header-title-name
        font-size: 15px
        font-weight: 700
        color: $text-content
      .content-header-title-account
        font-size: 14px
        font-weight: 500
        color: $input-label
  .content-body
    padding-top: 15px
    font-size: 20px
    font-weight: 500
    color: $text-content
  .content-time
    padding-top: 15px
    padding-bottom: 15px
    font-size: 14px
    font-weight: 500
    color: $input-label
    border-bottom: 1px solid $input-border
  .content-info
    padding-top: 20px
    padding-bottom: 20px
    display: flex
    justify-content: start
    font-size: 16px
    border-bottom: 1px solid $input-border
    .content-info-reply
      margin-right: 20%
      .content-info-reply-count
        color: $text-content
        font-weight: 700
      .content-info-reply-unit
        color: $input-label
        font-weight: 500
    .content-info-liked
      .content-info-liked-count
        color: $text-content
        font-weight: 700
      .content-info-liked-unit
        color: $input-label
        font-weight: 500
  .content-action
    padding-top: 20px
    display: flex
    justify-content: start
    .content-action-reply
      width: 24.69px
      height: 24.69px
      margin-right: 40%
    .content-action-liked
      width: 25.12px
      height: 23.64px
</style>