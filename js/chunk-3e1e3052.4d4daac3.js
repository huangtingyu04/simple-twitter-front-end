(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e1e3052"],{"0c81":function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Navbar"),r("div",{staticClass:"wide-container"},[r("Spinner",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}]}),r("div",{directives:[{name:"show",rawName:"v-show",value:!e.isLoading,expression:"!isLoading"}],staticClass:"main"},[r("UserProfile",{attrs:{"current-user":e.currentUser,"initial-user":e.user},on:{refresh:e.refresh}}),0===e.replies.length?r("div",{staticClass:"empty"},[e._v(" 使用者沒有任何推文回復 ")]):e._e(),e._l(e.replies,(function(e){return r("UserReplyItems",{key:e.id,attrs:{"initial-reply":e}})})),r("UserEditModal",{attrs:{"current-user":e.currentUser},on:{refresh:e.refresh}}),r("TweetModal",{attrs:{"current-user":e.currentUser},on:{refresh:e.refresh}})],2),r("PopularUsersCard",{on:{refresh:e.refresh}})],1)],1)},a=[],n=r("1da1"),i=r("5530"),c=(r("b0c0"),r("96cf"),r("2f62")),o=r("4cce"),u=r("eae4"),l=r("d178"),d=r("9f73"),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"replies"},[r("div",{staticClass:"reply"},[r("router-link",{attrs:{to:{name:"user-tweet",params:{id:e.reply.id}}}},[r("img",{staticClass:"reply-icon",attrs:{src:e._f("emptyImage")(e.reply.avatar),alt:""}})]),r("div",{staticClass:"reply-content"},[r("div",{staticClass:"reply-content-title"},[r("router-link",{staticClass:"reply-content-title-name",attrs:{to:{name:"user-tweet",params:{id:e.reply.id}}}},[e._v(" "+e._s(e.reply.name)+" ")]),r("router-link",{staticClass:"reply-content-title-account",attrs:{to:{name:"user-tweet",params:{id:e.reply.id}}}},[e._v(" @"+e._s(e.reply.account)),r("span",[e._v("・")])]),r("div",{staticClass:"reply-content-title-time"},[e._v(" "+e._s(e._f("fromNow")(e.reply.createdAt))+" ")])],1),r("div",{staticClass:"reply-content-target"},[e._v(" 回覆 "),r("span",{staticClass:"reply-content-target-account"},[e._v("@"+e._s(e.reply.tweetAccount))])]),r("div",{staticClass:"reply-content-comment"},[e._v(e._s(e.reply.comment))])])],1)])},f=[],h=r("2708"),m={name:"UserReplyItems",mixins:[h["b"],h["a"]],props:{initialReply:{type:Object,required:!0}},data:function(){return{reply:{}}},watch:{initialReply:function(){this.fetchReply()}},created:function(){this.fetchReply()},methods:{fetchReply:function(){var e=this.initialReply,t=e.Tweet,r=e.User,s=e.comment,a=e.createdAt;this.reply={id:r?r.id:0,name:r?r.name:"",account:r?r.account:"",avatar:r?r.avatar:"",createdAt:a,comment:s,tweetAccount:t&&t.User?t.User.account:""}}}},v=m,y=(r("93c1"),r("2877")),w=Object(y["a"])(v,p,f,!1,null,"cddbb142",null),b=w.exports,U=r("eb69"),_=r("4287"),g=r("2375"),R=r("5a23"),C={name:"UserReply",components:{Navbar:l["a"],UserProfile:d["a"],UserReplyItems:b,UserEditModal:U["a"],TweetModal:_["a"],Spinner:g["a"],PopularUsersCard:R["a"]},data:function(){return{user:{},tweetsCount:0,replies:[],isLoading:!0}},computed:Object(i["a"])({},Object(c["b"])(["currentUser","isAuthenticated"])),created:function(){var e=this.$route.params.id;this.fetchUser({userId:e}),this.fetchReplies({userId:e})},beforeRouteUpdate:function(e,t,r){var s=e.params.id;this.fetchUser({userId:s}),this.fetchReplies({userId:s}),r()},methods:{fetchReplies:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var s,a,n,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return s=e.userId,r.prev=1,r.next=4,o["a"].getUserReplies({userId:s});case 4:if(a=r.sent,n=a.data,i=a.statusText,"OK"===i){r.next=8;break}throw new Error;case 8:t.replies=n,t.isLoading=!1,r.next=16;break;case 12:r.prev=12,r.t0=r["catch"](1),console.log(r.t0),u["a"].fire({title:"無法取得使用者回覆"});case 16:case"end":return r.stop()}}),r,null,[[1,12]])})))()},fetchUser:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){var s,a,n,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return s=e.userId,r.prev=1,r.next=4,o["a"].getUser({userId:s});case 4:if(a=r.sent,n=a.data,i=a.statusText,"OK"===i){r.next=8;break}throw new Error;case 8:t.user=n,t.isLoading=!1,r.next=15;break;case 12:r.prev=12,r.t0=r["catch"](1),console.log(r.t0);case 15:case"end":return r.stop()}}),r,null,[[1,12]])})))()},userUpdate:function(e){var t=e.name,r=e.introduction,s=e.avatar,a=e.cover;this.user.name=t,this.user.introduction=r,this.user.avatar=s,this.user.cover=a},refresh:function(){var e=this.$route.params.id;this.fetchUser({userId:e}),this.fetchReplies({userId:e})}}},x=C,I=(r("df25"),Object(y["a"])(x,s,a,!1,null,"2333b700",null));t["default"]=I.exports},"1d2e":function(e,t,r){},"93c1":function(e,t,r){"use strict";r("cba9")},cba9:function(e,t,r){},df25:function(e,t,r){"use strict";r("1d2e")}}]);
//# sourceMappingURL=chunk-3e1e3052.4d4daac3.js.map