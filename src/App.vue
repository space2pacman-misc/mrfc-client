<template>
  <div id="app">
    <b-container class="mt-5">
      <Auth v-if="!isAuth" @auth="onAuth" />
      <div v-if="isAuth" class="border pt-4 pb-4 pr-3 pl-3 d-flex">
        <div class="buttons">
          <b-button v-if="!data.allowedUserTables || data.allowedUserTables.includes('Т1')" block variant="primary" @click="getData('Т1')">Т1</b-button>
          <b-button v-if="!data.allowedUserTables || data.allowedUserTables.includes('Т2')" block variant="primary" @click="getData('Т2')">Т2</b-button>
          <b-button v-if="!data.allowedUserTables || data.allowedUserTables.includes('Т3')" block variant="primary" @click="getData('Т3')">Т3</b-button>
        </div>
        <b-table striped hover :items="data.fields" class="ml-3"></b-table>
      </div>
    </b-container>
  </div>
</template>

<script>
import Auth from './components/Auth';

export default {
  name: 'App',
  components: {
    Auth
  },
  data() {
    return {
      token: null,
      isAuth: false,
      data: {
        fields: null,
        allowedUserTables: null
      }
    }
  },
  methods: {
    onAuth(data) {
      this.token = data.token;
      this.user = data.user;
      this.data.allowedUserTables = data.allowedUserTables;
      this.isAuth = true;
    },
    async getData(type) {
      const response = await this.$request(`data/?token=${this.token}&type=${type}`);

      this.data.fields = response.data.map((item, index) => {
        return {
          index,
          name: item
        }
      });
    }
  }
}
</script>

<style>
.buttons {
  width: 150px;
}
</style>
