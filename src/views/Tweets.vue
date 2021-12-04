<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <AddTweet
          :current-user="currentUser"
          @create-new-tweet="createNewTweet"
        />
        <TweetItems
          :initial-tweets="tweets"
          @toggle-tweet-reply="toggleTweetReply"
          @add-liked="addLiked"
          @delete-liked="deleteLiked"
        />
        <TweetReplyModal
          :tweet-item="tweetItem"
          @create-new-reply="createNewReply"
        />
        <TweetModal 
          :current-user="currentUser"
          @create-new-tweet="createNewTweet" />
      </div>
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import TweetItems from "./../components/TweetItems";
import PopularUsersCard from "./../components/PopularUsersCard";
import AddTweet from "./../components/AddTweet.vue";
import TweetModal from "./../components/TweetModal.vue"
import TweetReplyModal from "../components/TweetReplyModal.vue";

const dummyUser = {
  currentUser: {
    id: "1",
    name: "Apple",
    account: "apple",
    email: "apple@example.com",
    password: "12345678",
    image: "https://i.imgur.com/RGxqLdu.png",
  },
};

const dummyData = {
  tweets: [
    {
      id: 1,
      text: "Autem veniam tempore.",
      UserId: 1,
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-23T07:25:29.000Z",
      User: {
        id: 1,
        name: "user1",
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
        isAdmin: false,
        image: "https://i.imgur.com/RnQRoJb.png",
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-26T04:22:35.000Z",
      },
      likesLength: 3,
      Comments: [{}, {}],
      isLiked: false,
    },
    {
      id: 2,
      text: "zrtdhuua trtdghui etsfgj gfgfgrtewrt.",
      UserId: 1,
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-23T07:25:29.000Z",
      User: {
        id: 1,
        name: "user1",
        account: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
        isAdmin: false,
        image: "https://i.imgur.com/RnQRoJb.png",
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-26T04:22:35.000Z",
      },
      likesLength: 2,
      Comments: [],
      isLiked: true,
    },
    {
      id: 3,
      text: "iuyituncg trdsnujkgta wefdfghhjbnsfgqerq dfsdfwerwerqwtrh fdsfe fdwer aswhjjyuir.",
      UserId: 2,
      createdAt: "2021-11-23T07:25:29.000Z",
      updatedAt: "2021-11-23T07:25:29.000Z",
      User: {
        id: 2,
        name: "user2",
        account: "user2",
        email: "user2@example.com",
        password:
          "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
        isAdmin: false,
        image: "https://i.imgur.com/RGxqLdu.png",
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-26T04:22:35.000Z",
      },
      likesLength: 3,
      Comments: [],
      isLiked: true,
    },
  ],
};

export default {
  name: "Tweets",
  components: {
    Navbar,
    AddTweet,
    TweetItems,
    TweetReplyModal,
    TweetModal,
    PopularUsersCard,
  },
  data() {
    return {
      currentUser: {},
      tweets: [],
      tweetItem: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.currentUser = dummyUser.currentUser;
      this.tweets = dummyData.tweets;
    },
    createNewTweet(payload) {
      const { tweetId, text, User } = payload;
      this.tweets.push({
        id: tweetId,
        text: text,
        createdAt: new Date(),
        updatedAt: new Date(),
        User: User,
        LikeUsers: [],
        Comments: [],
        isLiked: false,
      });
    },
    toggleTweetReply(tweetId) {
      this.tweetItem = this.tweets.find((tweet) => tweet.id === tweetId);
    },
    createNewReply(payload) {
      const { replyId, tweetId, text, User } = payload;
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            Comments: tweet.Comments.push({
              id: replyId,
              tweetId,
              text,
              User,
              createdAt: new Date(),
              updatedAt: new Date(),
            }),
          };
        } else {
          return tweet;
        }
      });
    },
    addLiked(tweetId) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            likesLength: tweet.likesLength + 1,
            isLiked: true,
          };
        } else {
          return tweet;
        }
      });
    },
    deleteLiked(tweetId) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            likesLength: tweet.likesLength - 1,
            isLiked: false,
          };
        } else {
          return tweet;
        }
      });
    },
  },
};
</script>



