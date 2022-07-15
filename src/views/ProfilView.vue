<template>
<!-- component -->

<main class="profile-page">
  <section class="relative block h-500-px">
    <div class="absolute top-0 w-full h-full bg-center bg-cover" style="
            background-image: url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2447&q=80');
          ">
    </div>
   
  </section>
  <section class="relative py-16 bg-blueGray-200" style="background-color: black;">
    <div class="container mx-auto px-4">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
              
            </div>
            <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
              <div class="py-6 px-3 mt-32 sm:mt-0">
               
              </div>
            </div>
            
          </div>
          <div class="text-center mt-12">
            <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
             {{user_data.email}}
            </h3>
            
            
            <div class="mb-2 text-blueGray-600">
              <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of IIM
            </div>
          </div><br><h2>My courses :</h2><br>
           <Course
      :data="course"
      :key="'course-' + course.id"
      v-for="course in courses"
    />
          <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div class="flex flex-wrap justify-center">
              <div class="w-full lg:w-9/12 px-4">
                <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes,
                  performs and records all of his own music, giving it a
                  warm, intimate feel with a solid groove structure. An
                  artist of considerable range.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="relative bg-blueGray-200 pt-8 pb-6 mt-8" style="background-color: black;">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap items-center md:justify-between justify-center">
      <div class="w-full md:w-6/12 px-4 mx-auto text-center">
        <div class="getAllCoursestext-sm text-blueGray-500 font-semibold py-1">
          Made with <a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" class="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
        </div>
      </div>
    </div>
  </div>
</footer>
  </section>
</main>
</template>
<script>

import { mapState } from "vuex";
import Course from "@/components/Course.vue"; 
export default {
  components: {
    Course,
  },
  data() {
    return {
      courses: [],
    };
  },
  computed: {
    ...mapState(["user_data"]),
  },
  mounted() {
    this.getAllCourses();
  },
  methods: {
    goTo(name) {
      this.$router.push({ name: name });
    },
    async getAllCourses() {
      
      const { data, error } = await this.$supabase.from("courses").select();
      if (data) {
        this.courses = data;
      } else {
        console.log(error);
      }
    },
    async update() {
      const { data, error } = await this.$supabase
        .from("courses")
        .update(this.course)
        .match({ id: this.$route.params.id });
      if (data) {
        this.$router.push({ name: "home" });
      } else {
        console.log(error);
      }
    },
    async submit() {
      const { data, error } = await this.$supabase
        .from("courses")
        .insert([this.course]);
      if (data) {
        this.goTo("home");
      } else {
        console.log(error);
      }
    },
    async getCourse() {
      const { data, error } = await this.$supabase
        .from("courses")
        .select()
        .match({ id: this.$route.params.id })
        .single();
      if (data) {
        this.course = data;
      } else {
        console.log(error);
      }
    },
    async signOut() {
      const { error } = await this.$supabase.auth.signOut()
    }
   
  },
};

</script>
