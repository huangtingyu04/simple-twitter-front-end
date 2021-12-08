<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <UserProfile 
          :current-user="currentUser" 
          :user="user"
          @add-follow="addFollow"
          @delete-follow="deleteFollow" />
        <UserReplyItems :replies="replies" />
        <UserEditModal :current-user="currentUser" />
        <TweetModal
          :current-user="currentUser"
          @create-new-tweet="createNewTweet"
        />
      </div>
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import usersAPI from "../apis/users";
import { errorToast } from "../utils/toast";

import Navbar from "./../components/Navbar";
import UserProfile from "../components/UserProfile.vue";
import UserReplyItems from "../components/UserReplyItems.vue";
import UserEditModal from "../components/UserEditModal.vue";
import TweetModal from "../components/TweetModal.vue";
import PopularUsersCard from "./../components/PopularUsersCard";

export default {
  name: "UserReply",
  components: {
    Navbar,
    UserProfile,
    UserReplyItems,
    UserEditModal,
    TweetModal,
    PopularUsersCard,
  },
  data() {
    return {
      user: {
        id: 0,
        name: "",
        account: "",
        email: "",
        introduction: "",
        avatar: "",
        cover: "",
        followingsLength: 0,
        followersLength: 0,
        isFollower: false,
        tweetsCount: 0
      },
      replies: [],
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const { id: userId } = this.$route.params
    // this.fetchUser({userId});
    this.fetchReplies({userId});
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params
    // this.fetchUser({userId});
    this.fetchReplies({userId});
    next()
  },
  methods: {
    async fetchReplies({userId}) {
      try {
        const response = await usersAPI.getUserReplies({userId})
        const { data, statusText } = response
        if(statusText !== 'OK') {
          throw new Error
        }
        const { tweets, user } = data
        const {
          id,
          name,
          account,
          email,
          avatar,
          cover,
          introduction,
          FollowersCount,
          FollowingsCount,
          isFollower,
        } = user;
        this.user = {
          id,
          name,
          account,
          email,
          avatar,
          cover,
          introduction,
          followersLength: FollowersCount,
          followingsLength: FollowingsCount,
          isFollower,
          tweetsCount: tweets.length
        };
        this.replies = tweets
        console.log(response)
      } catch (error) {
        console.log(error)
        errorToast.fire({
          title: '無法取得使用者回覆'
        })
      }
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
        likesLength: 0,
        Comments: [],
        commentsLength: 0,
        isLiked: false,
      });
    },
    userUpdate(payload) {
      const { name, introduction, avatar, cover } = payload;
      this.user.name = name;
      this.user.introduction = introduction;
      this.user.avatar = avatar;
      this.user.cover = cover;
    },
    async addFollow(userId) {
      try {
        console.log(userId);
        const response = await usersAPI.addFollow({ userId });
        console.log(response);
        this.user.isFollower = true;
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法追蹤此使用者",
        });
      }
    },
    async deleteFollow(userId) {
      try {
        console.log(userId);
        const response = await usersAPI.deleteFollow({ userId });
        console.log(response);
        this.user.isFollower = false;
      } catch (error) {
        console.log(error);
        errorToast.fire({
          title: "無法取消追蹤此使用者",
        });
      }
    },
  },
};
</script>