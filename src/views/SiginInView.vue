<template>
<div class="bg-black-lighter min-h-screen flex flex-col" style="background-color:black;">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign In</h1>
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        v-model="user_data.email"
                        placeholder="Email" />
                    
                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        v-model="user_data.password"
                        placeholder="Password" />

                    <button @click="signIn()"
                        type="submit"
                        class="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                    >Sign in</button>
                  

                    <div class="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div class="text-grey-dark mt-6">
                    You don't have an account? 
                    <a class="no-underline border-b border-blue text-blue" href="/sigin-up/">
                        Sigin Up
                    </a>.
                </div>
            </div>
            
        </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      user_data: {
        email:"",
        password: "",
      },
    };
  },
  methods: {
    goTo(name) {
      this.$router.push({ name: name });
    },
    async signIn() {
      const { user, error } = await this.$supabase.auth.signIn({
        email: this.user_data.email,
        password:this.user_data.password,
      });
      if (user) {
        this.goTo("profil");
        console.log(user);
      } else {
        swal("Erreur !", error.message, "warning");
        console.log(error);
      }
    },
  },
};
</script>