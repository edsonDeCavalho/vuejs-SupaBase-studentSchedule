<template>
  <div class="about">
    <button @click="signUp()">Sign up</button>
    <button @click="signIn">Sign in</button>
    <button @click="signOut">Sign out</button>
  </div>
</template>
<script>
export default {
  methods: {
    async signUp() {
      const { user, error } = await this.$supabase.auth.signUp({
        email: "75quentinguerrier@gmail.com",
        password: "test1234",
      });
      if (user) {
        console.log(user);
      } else {
        console.log(error);
      }
    },
    async signIn() {
      const { user, error } = await this.$supabase.auth.signIn({
        email: "75quentinguerrier@gmail.com",
        password: "test1234",
      });
      if (user) {
        console.log(user);
      } else {
        console.log(error);
      }
    },
    async signOut() {
      const { error } = await this.$supabase.auth.signOut();
      if (error) {
        console.log(error);
      }
    },
  },
};
</script>
