<template>
  <div>
    <Navbar />
    <div class="wide-container">
      <div class="main">
        <!-- <UserFollow /> -->
        <div class="top">
          <img src="../../public/images/icon_back.png" alt="" class="top-back" @click="$router.back()">
          <div class="top-title">
            <div class="top-title-name">{{ name }}</div>
            <div class="top-title-tweet">{{ tweetsNum }}<span class="top-title-tweet-count">推文</span></div>
          </div>
        </div>
        <div class="user-follow">
          <FollowNavPills />
          <FollowItems v-for="follower in followers" :key="follower.id"  :initial-follower="follower" />
        </div>
      </div>
      <PopularUsersCard />
    </div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import FollowNavPills from '../components/FollowNavPills.vue'
import FollowItems from '../components/FollowItems.vue'
import PopularUsersCard from './../components/PopularUsersCard'

const dummyData = {
  id: "1",
  name: "Emery Huang",
  tweetsNum: 25,
  followers: [
    {
      id: "1",
      name: "Laure",
      account: "LaureBill",
      image: 'https://i.imgur.com/RGxqLdu.png',
      text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      isFollowing: false,
    },
    {
      id: "2",
      name: "Laure123",
      account: "LaureBill123",
      image: 'https://i.imgur.com/RGxqLdu.png',
      text: '123Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      isFollowing: true,
    },
  ],
};

export default {
  name: 'UserFollowers',
  components: {
    Navbar,
    FollowNavPills,
    FollowItems,
    PopularUsersCard
  },
  data() {
    return {
      id: -1,
      name: '',
      tweetsNum: 0,
      followers: []
    }
  },
  methods: {
    fetchFollowers() {
      const { id, name, tweetsNum, followers } = dummyData
      this.id= id
      this.name= name
      this.tweetsNum= tweetsNum
      this.followers= followers
    }
  },
  created() {
    this.fetchFollowers()
  }
}
</script>

<style lang="sass" scoped>
.top
  padding: 6px 19px 6px 19px
  height: 55px
  display: flex
  align-items: center
  .top-back
    width: 24px
    height: 24px
    object-fit: cover
    margin-right: 5%
    cursor: pointer
  .top-title
    .top-title-name
      font-size: 19px
      font-weight: 900
      color: $text-content
    .top-title-tweet
      font-size: 13px
      color: $input-label
  
</style>