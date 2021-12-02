<template>
    <div>
        <Navbar />
        <div class="wide-container">
            <div class="main">
                <TweetContent />
                <ReplyItems />
            </div>
            <PopularUsersCard />
        </div>
    </div>
</template>

<script>
import Navbar from './../components/Navbar'
import PopularUsersCard from './../components/PopularUsersCard'
import TweetContent from './../components/TweetContent.vue'
import ReplyItems from './../components/ReplyItems.vue'
export default {
    name: 'Tweet',
    components: {
        Navbar,
        TweetContent,
        ReplyItems,
        PopularUsersCard
    }
}
</script>