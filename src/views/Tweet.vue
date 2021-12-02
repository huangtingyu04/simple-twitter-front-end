<template>
    <div>
        <Navbar />
        <div class="wide-container">
            <div class="main">
                <TweetContent />
            </div>
            <PopularUsersCard />
        </div>
    </div>
</template>

<script>
import Navbar from './../components/Navbar'
import PopularUsersCard from './../components/PopularUsersCard'
import TweetContent from './../components/TweetContent.vue'
export default {
    name: 'Tweet',
    components: {
        Navbar,
        TweetContent,
        PopularUsersCard
    }
}
</script>