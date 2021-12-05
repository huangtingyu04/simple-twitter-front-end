<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <UserProfile :current-user="currentUser" />
        <TweetItems />
        <UserEditModal :current-user="currentUser" />
      </div>
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
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
  users: {
    id: "1",
    name: "Apple",
    account: "apple",
    email: "apple@example.com",
    image: "https://i.imgur.com/RGxqLdu.png",
    Followings: [
      {
        id: "1",
        name: "John Doe",
        email: "heyjohn@example.com",
        Followship: {
          createdAt: "2021-11-25T12:49:25.000Z",
          followerId: 2,
          followeringId: 1,
          updatedAt: "2021-11-25T12:49:25.000Z",
        },
      },
      {
        id: "3",
        name: "Macdonalds",
        email: "macdonalds@example.com",
        Followship: {
          createdAt: "2021-11-25T12:49:25.000Z",
          followerId: 1,
          followeringId: 3,
          updatedAt: "2021-11-25T12:49:25.000Z",
        },
      },
    ],
    Followers: [
      {
        id: "1",
        name: "John Doe",
        email: "heyjohn@example.com",
        Followship: {
          createdAt: "2021-11-25T12:49:25.000Z",
          followerId: 1,
          followeringId: 2,
          updatedAt: "2021-11-25T12:49:25.000Z",
        },
      },
      {
        id: "3",
        name: "Macdonalds",
        email: "macdonalds@example.com",
        Followship: {
          createdAt: "2021-11-25T12:49:25.000Z",
          followerId: 3,
          followeringId: 2,
          updatedAt: "2021-11-25T12:49:25.000Z",
        },
      },
    ],
    // 推文被 like 的數量
    Likes: [
      {
        id: 56,
        text: "Autem veniam tempore.",
        isLiked: true,
        TweetId: 8,
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-23T07:25:29.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
        UserLike: {
          id: 1,
          name: "Apple",
          account: "apple",
          email: "apple@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
      },
      {
        id: 57,
        text: "Autem veniam tempore.",
        isLiked: true,
        TweetId: 8,
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-23T07:25:29.000Z",
        User: {
          id: 1,
          name: "Apple",
          account: "apple",
          email: "apple@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
        UserLike: {
          id: 1,
          name: "Apple",
          account: "apple",
          email: "apple@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
      },
    ],
    // 推文數量
    Tweets: [
      {
        id: 56,
        text: "Autem veniam tempore.",
        isLiked: false,
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-23T07:25:29.000Z",
        User: {
          id: 1,
          name: "Apple",
          account: "apple",
          email: "apple@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
      },
      {
        id: 57,
        text: "從 isAuthenticated 的狀態可以了解此 token 是否有效，接著在「如果 token 無效則轉址到登入頁」，很自然的會寫出下面的程式碼（但這樣會導致無窮迴圈的問題.",
        isLiked: false,
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-23T07:25:29.000Z",
        User: {
          id: 1,
          name: "Apple",
          account: "apple",
          email: "apple@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
      },
      {
        id: 59,
        text: "sdfsdf wertyyyuivmv rew hgfdhi kjhaopnc dsdfsdfy jhjklpubc.",
        isLiked: false,
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-23T07:25:29.000Z",
        User: {
          id: 1,
          name: "Apple",
          account: "apple",
          email: "apple@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
      },
      {
        id: 60,
        text: "asdferr fdfdfsas rewerfsdf reweqrwerq.",
        isLiked: false,
        createdAt: "2021-11-23T07:25:29.000Z",
        updatedAt: "2021-11-23T07:25:29.000Z",
        User: {
          id: 1,
          name: "Apple",
          account: "apple",
          email: "apple@example.com",
          password:
            "$2a$10$xSAOmUrVGjFXNuA6pENgM.ldkJ/Nu4uf6PSXAYAfPxNnbGocDZ4rO",
          isAdmin: false,
          image: "https://i.imgur.com/RnQRoJb.png",
          createdAt: "2021-11-23T07:25:29.000Z",
          updatedAt: "2021-11-26T04:22:35.000Z",
        },
      },
    ],
  },
};

import Navbar from "./../components/Navbar";
import UserProfile from "../components/UserProfile.vue";
import TweetItems from "../components/TweetItems.vue";
import UserEditModal from "../components/UserEditModal.vue";
import PopularUsersCard from "./../components/PopularUsersCard";

export default {
  name: "User",
  components: {
    Navbar,
    UserProfile,
    TweetItems,
    UserEditModal,
    PopularUsersCard,
  },
  data() {
    return {
      currentUser: {},
      user: {
        id: 0,
        name: '', 
        account: '', 
        email: '', 
        image: '', 
        followingsLength: 0, 
        followersLength: 0
      },
      tweets: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.currentUser = dummyUser.currentUser;
      const { id, name, account, email, image, Tweets, Followings, Followers } = dummyData.users;
      this.user = { id, name, account, email, image,
        followingsLength: Followings? Followings.length: 0,
        followersLength: Followers ? Followers.length: 0 };
      this.tweets = Tweets;
    },
  },
};
</script>