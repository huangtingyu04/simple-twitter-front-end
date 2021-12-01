<template>
    <div>
        <Navbar />
        tweets page
        <PopularUsersCard />
    </div>
</template>

<script>
import Navbar from './../components/Navbar'
import PopularUsersCard from './../components/PopularUsersCard'

export default {
    components: {
        Navbar,
        PopularUsersCard
    }
}
</script>



