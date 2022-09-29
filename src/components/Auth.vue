<template>
  <div class="d-flex justify-content-center">
    <b-card header="Авторизация" class="auth">
      <b-form-input placeholder="Логин" class="mb-3" v-model="login" />
      <b-form-input type="password" placeholder="Пароль" class="mb-3" v-model="password" />
      <span class="text-danger">{{ message }}</span>
      <b-button variant="primary" class="float-right" @click="auth">Войти</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: '',
      password: '',
      message: ''
    }
  },
  methods: {
    async auth() {
      const response = await this.$request('login', {
        login: this.login, 
        password: this.password
      }, 'POST');

      if (response.status === 'error') {
        this.message = response.message;
      }

      if (response.status === 'success') {
        this.$emit('auth', {
          token: response.data.token,
          allowedUserTables: response.data.allowedUserTables,
          user: this.login
        });
      }
    }
  },
  watch: {
    login() {
      this.message = '';
    },
    password() {
      this.message = '';
    }
  }
}
</script>

<style>
.auth {
  width: 400px;
} 
</style>