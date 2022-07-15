<template>

<div class="bg-black-lighter min-h-screen flex flex-col" style="background-color:black;">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        v-model="userCreation.name"
                        placeholder="Full Name" />

                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        v-model="userCreation.email"
                        placeholder="Email" />
                    
                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                         v-model="userCreation.password"
                        placeholder="Password" />
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="role"
                        v-model="userCreation.role"
                        placeholder="role" />
                    
                    <button @click="signUp()"
                        type="submit"
                        class="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                    >Create Account</button>
                  

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
                    Already have an account? 
                    <a class="no-underline border-b border-blue text-blue" href="/sigin-in/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
        
</template>
<script>
export default {
  data() {
    return {
      userCreation: {
        name:"",
        email: "",
        password: "",
        role:"",
      },
    };
  },
  methods: {
    async signUp() {
      const { user, error} = await this.$supabase.auth.signUp({
        email:this.userCreation.email,
        password:this.userCreation.password,
        fullname:this.userCreation.name,
        role:this.userCreation.role,
      });
      if (user) {
        swal({
          title: "Your account has been successfully created",
          text: "Do you want to login?",
          icon: "success",
          buttons: true,
          buttons: true,
        })
        .then((willDelete) => {
          if (willDelete) {
           location.href = "/sigin-in/";
          } else {
            //swal("Your imaginary file is safe!");
          }
        });
        console.log(user);
      } else {
        //console.log(error);
        swal("Error!", error.message, "warning");
        console.log(error);
      }
    },
  },
};
</script>x