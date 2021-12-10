<template>
  <div class="modal fade" id="user-edit-modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <form action="" @submit.stop.prevent="handleSubmit">
        <div class="modal-content">
          <div class="modal-header">
            <img
              src="../../public/images/icon_close.png"
              alt=""
              class="modal-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
            <div class="modal-header-title">編輯個人資料</div>
            <button
              type="submit"
              class="btn-save"
              :disabled="user.name.length < 1"
              :data-bs-dismiss="submitOK"
            >
              儲存
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-body-bg">
              <img
                :src="user.cover | emptyImage"
                alt=""
                class="modal-body-bg-photo"
              />
              <div class="modal-body-bg-option">
                <img
                  src="../../public/images/icon_uploadPhoto.png"
                  alt=""
                  class="modal-body-bg-option-edit"
                  @click="updateCover"
                />
                <img
                  src="../../public/images/icon_delete.png"
                  alt=""
                  class="modal-body-bg-option-delete"
                  @click="removeCover"
                />
                <input
                  type="file"
                  name="cover"
                  accept="image/*"
                  id="cover"
                  ref="cover"
                  @change="handleImage($event, 'cover')"
                />
              </div>
            </div>
            <div class="modal-body-header">
              <img
                :src="user.avatar | emptyImage"
                alt=""
                class="modal-body-header-photo"
              />
              <div class="modal-body-header-edit">
                <img
                  src="../../public/images/icon_uploadPhoto.png"
                  alt=""
                  class="modal-body-header-edit-photo"
                  @click="updateAvatar"
                />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  id="avatar"
                  ref="avatar"
                  @change="handleImage($event, 'avatar')"
                />
              </div>
            </div>
            <div class="modal-body-form">
              <div class="form">
                <div class="form-label-group">
                  <label for="name">名稱</label>
                  <input
                    v-model="user.name"
                    type="text"
                    name="name"
                    id="name"
                    :invalid="user.name.length > 50"
                    required
                  />
                  <div class="modal-body-form-limit">
                    <div
                      v-show="user.name.length < 1"
                      class="modal-body-form-limit-alert"
                    >
                      名稱不可為空!
                    </div>
                    <div
                      v-show="user.name.length > 50"
                      class="modal-body-form-limit-alert"
                    >
                      字數超出上限!
                    </div>
                    <div class="modal-body-form-limit-count">
                      {{ user.name.length }}<span>/50</span>
                    </div>
                  </div>
                </div>
                <div class="form-label-group" id="modal-intro">
                  <label for="intro">自我介紹</label>
                  <textarea
                    v-model="user.introduction"
                    name="intro"
                    id="intro"
                    cols="30"
                    rows="10"
                  ></textarea>
                  <div class="modal-body-form-limit">
                    <div
                      v-show="checkIsNull(user.introduction).length > 150"
                      class="modal-body-form-limit-alert"
                    >
                      字數超出上限!
                    </div>
                    <div class="modal-body-form-limit-count">
                      {{ checkIsNull(user.introduction).length
                      }}<span>/160</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import usersAPI from '../apis/users'
// import { errorToast } from '../utils/toast';
import { mapState } from 'vuex'

export default {
  name: "UserEditModal",
  mixins: [emptyImageFilter],
  // props: {
  //   currentUser: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  data() {
    return {
      user: {},
      savable: false,
    };
  },
  computed: {
    ...mapState(["currentUser" , "isAuthenticated"]),
    submitOK() {
      if (!this.savable) {
        return "modal";
      } else {
        return "";
      }
    },
  },
  watch: {
    currentUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
        nameCached: newValue.name,
        introductionCached: newValue.introduction,
        avatarCached: newValue.avatar,
        coverCached: newValue.cover,
      };
    },
  },
  created() {
    this.fetchUser();
  },
  mounted() {
    let self = this;
    document.addEventListener("click", function (event) {
      if (
        event.target.matches(".modal") ||
        event.target.matches(".modal-close")
      ) {
        self.user.avatar = self.user.avatarCached;
        self.user.cover = self.user.coverCached;
      }
    });
  },
  methods: {
    checkIsNull(value) {
      return value === null ? "" : value;
    },
    fetchUser() {
      this.user = this.currentUser;
    },
    updateCover() {
      this.$refs.cover.click();
    },
    removeCover() {
      this.$refs.cover.value = "";
      this.user.cover = "";
    },
    updateAvatar() {
      this.$refs.avatar.click();
    },
    handleImage(event, target) {
      const { files } = event.target;
      // console.log(456, files);

      if (files.length === 0) {
        // console.log(123);

        switch (target) {
          case "cover":
            this.user.cover = "";
            break;
          case "avatar":
            this.user.avatar = "";
        }
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);

        console.log(files[0]);
        switch (target) {
          case "cover":
            this.user.cover = imageURL;
            break;
          case "avatar":
            this.user.avatar = imageURL;
        }
      }
    },
    async handleSubmit(e) {
      try {
        const form = e.target
        const formData = new FormData(form)
        console.log(formData)
        this.$emit("update-profile", formData);
        const response = await usersAPI.upload({
          userId: this.currentUser.id,
          formData
        })
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/_modal.sass'
</style>