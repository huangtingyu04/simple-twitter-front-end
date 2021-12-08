<template>
  <div class="modal fade" id="user-edit-modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <form action="" >
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
              :disabled="savable"
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
                <input type="file" name="cover" id="cover" ref="cover" @change="handleImage('cover')">
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
                <input type="file" name="avatar" id="avatar" ref="avatar" @change="handleImage('avatar')">
              </div>
            </div>
            <div class="modal-body-form">
              <form action="">
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
                      v-show="user.introduction.length > 160"
                      class="modal-body-form-limit-alert"
                    >
                      字數超出上限!
                    </div>
                    <div class="modal-body-form-limit-count">
                      {{ user.introduction.length }}<span>/160</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
 import { emptyImageFilter } from '../utils/mixins'

export default {
  name: "UserEditModal",
  mixins: [ emptyImageFilter ],
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {},
      savable: false
    };
  },
  computed: {
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
        ...newValue
      }
    }
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.user = this.currentUser
    },
    updateCover() {
      this.$refs.cover.click()
    },
    removeCover() {
      this.$refs.cover.value= ""
      this.userCover = ''
    },
    updateAvatar() {
      this.$refs.avatar.click()
    },
    handleImage(target) {
      const { files } = event.target
      if(!files.length) return
      
      const imageURL = window.URL.createObjectURL(files[0])
      switch(target) {
        case 'cover':
          this.userCover = imageURL
          break
        case 'avatar':
          this.userAvatar = imageURL
      }
    }
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/_modal.sass'
</style>