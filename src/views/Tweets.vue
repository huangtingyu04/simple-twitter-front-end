<template>
    <div>
        <Navbar />
        <div class="wide-container">
            <div class="main">
                <AddTweet />
                <TweetItems />
            </div>
            <PopularUsersCard />
        </div>
    </div>
</template>

<script>
import Navbar from './../components/Navbar'
import PopularUsersCard from './../components/PopularUsersCard'
import AddTweet from './../components/AddTweet.vue'
import TweetItems from './../components/TweetContent.vue'

export default {
    name: 'Tweets',
    components: {
        Navbar,
        PopularUsersCard,
        AddTweet,
        TweetItems
    }
}
</script>



