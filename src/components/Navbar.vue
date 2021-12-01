<template>
    <nav class="nav">
       <div class="logo">
           <img src="./../../public/images/Logo.png">
       </div>
       <ul>
           <li>
               <a href="javascript:;">.
                   <img class="img" src="./../../public/images/icon_index.png">
                   <img class="img-hover" src="./../../public/images/icon_index_hover.png">
                   首頁
                </a>
           </li>
           <li>
                <img class="img" src="./../../public/images/icon_user.png">
                <img class="img-hover" src="./../../public/images/icon_user_hover.png">
               <a href="javascript:;">個人資料</a>
           </li>
           <li>
               <a href="javascript:;">
                    <img class="img" src="./../../public/images/icon_setting.png">
                    <img class="img-hover" src="./../../public/images/icon_setting_hover.png">
                   設定
                </a>
           </li>
       </ul>
       <button type="button" class="tweet-btn">推文</button>
       <div class="logout">
           <a href="javascript:;">登出</a>
       </div>
    </nav>
</template>

<style scoped lang="sass">
    @import '../styles/navbar'
</style>

