<template>
  <div class="home">
    <button
      v-if="user_data"
      type="button"
      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="goTo('newCourse')"
    >
      Create new course
    </button>
    <Course
      :data="course"
      :key="'course-' + course.id"
      v-for="course in courses"
    />
  </div>
</template>

<script>
import Course from "@/components/Course.vue";
import { mapState } from "vuex";
export default {
  name: "HomeView",
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
  },
};
</script>
