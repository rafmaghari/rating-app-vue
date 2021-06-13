<template>
  <main>
    <section class="absolute w-full h-full">
      <div class="container mx-auto px-4 h-full">
        <div class="flex content-center items-center justify-center h-full">
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-50 border-0">
              <div class="flex-auto px-4 lg:px-10 py-10 pt-10">
                <form>
                  <div class="relative w-full mb-3">
                    <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                    >Email</label
                    ><input
                      v-model="email"
                      type="email"
                      class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Email"
                      style="transition: all 0.15s ease 0s;"
                  />
                  </div>
                  <div class="relative w-full mb-3">
                    <label
                        class="block uppercase text-gray-700 text-xs font-bold mb-2"
                        for="grid-password"
                    >Password</label
                    ><input
                      v-model="password"
                      type="password"
                      class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Password"
                      style="transition: all 0.15s ease 0s;"
                  />
                  </div>
                  <div class="flex">
                    <div class="text-center mt-6">
                      <button class="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              @click="login"
                      >
                        Log in
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="flex flex-wrap mt-6">
              <div class="w-1/2">
                <a href="#pablo" class="text-gray-300"
                ><small>Forgot password?</small></a>
              </div>
              <div class="w-1/2 text-right">
                <a href="#pablo" class="text-gray-300"
                ><small>Create new account</small></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {LoginService} from "@/services/LoginService";
import UserStore from "../store/UserStore";

@Component
export default class Login extends Vue {
  email = 'admin@gmail.com';
  password = 'password';

  async login() {
    const loginService = new LoginService(this.email, this.password)
    const authenticateResponse = await loginService.validate();
    if (authenticateResponse) {
      const {data} = authenticateResponse;
      UserStore.setUserInfo(data.user || {})
      localStorage.setItem('user-info', JSON.stringify(data.user))
      localStorage.setItem('token', data.token || "")
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>

</style>