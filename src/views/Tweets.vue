<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <AddTweet :current-user="currentUser"/>
        <TweetItems :initial-tweets="tweets"/>
      </div>
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar";
import TweetItems from "./../components/TweetItems";
import PopularUsersCard from "./../components/PopularUsersCard";
import AddTweet from './../components/AddTweet.vue'

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
      LikeUsers: [{}, {}, {}],
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
      LikeUsers: [{}, {}],
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
      LikeUsers: [{}, {}, {}],
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
    PopularUsersCard,
  },
  data() {
    return {
      currentUser: {},
      tweets: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.currentUser = dummyUser.currentUser
      this.tweets = dummyData.tweets
    }
  }
};
</script>



