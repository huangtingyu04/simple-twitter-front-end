<template>
  <div class="modal fade" id="user-edit-modal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div
            class="modal-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >X</div>
          <div class="modal-header-title">編輯個人資料
          </div>
          <button class="btn-save" :disabled="savable">儲存</button>
        </div>
        <div class="modal-body">
          <div class="modal-body-bg">
            <img src="https://i.imgur.com/ifqzNgs.png" alt="" class="modal-body-bg-photo">
            <div class="modal-body-bg-option">
              <img src="https://i.imgur.com/OCJg3AO.png" alt="" class="modal-body-bg-option-edit">
              <img src="https://i.imgur.com/qF89t4v.png" alt="" class="modal-body-bg-option-delete">
            </div>
          </div>
          <div class="modal-body-header">
            <img src="https://i.imgur.com/RGxqLdu.png" alt="" class="modal-body-header-photo">
            <div class="modal-body-header-edit">
               <img src="https://i.imgur.com/OCJg3AO.png" alt="" class="modal-body-header-edit-photo">
            </div>
          </div>
          <div class="modal-body-form">
            <form action="">
              <div class="form-label-group">
                <label for="name">名稱</label>
                <input v-model="userName" type="text" name="name" id="name"   :invalid="userNameLength > 50" required>
                <div class="modal-body-form-limit">
                  <div v-show="userNameLength>50"  class="modal-body-form-limit-alert">字數超出上限!</div>
                  <div class="modal-body-form-limit-count">{{userNameLength}}<span>/50</span></div>
                </div>
              </div>
              <div class="form-label-group" id="modal-intro">
                <label for="intro">自我介紹</label>
                <textarea v-model="userintro" name="intro" id="intro" cols="30" rows="10"></textarea>
                <div class="modal-body-form-limit">
                  <div v-show="userIntroLength>160"  class="modal-body-form-limit-alert">字數超出上限!</div>
                  <div class="modal-body-form-limit-count">{{userIntroLength}}<span>/160</span></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserSettingModal',
  data() {
    return {
      userName: 'John Doe',
      userintro: '',
      savable: false,
    }
  },
  computed: {
    userNameLength() {
      return this.userName.length
    },
    userIntroLength() {
      return this.userintro.length
    }
  },
  watch: {
    userNameLength() {
      if(this.userNameLength === 0 || this.userNameLength > 50 || this.userIntroLength > 160) {0
        return this.savable = true
      } else {
        return this.savable = false
      }
    },
    userIntroLength() {
      if(this.userNameLength === 0 || this.userNameLength > 50 || this.userIntroLength > 160) {
        return this.savable = true
      } else {
        return this.savable = false
      }
    }
    
  }
}
</script>

<style lang="sass" scoped>
  @import '../styles/_modal.sass'
</style>