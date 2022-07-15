<template>
  <div class="space-y-8 divide-y divide-gray-200">
    <pre>{{ user_data }}</pre>
    <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{
              $route.name == "updateCourse" ? "Update Course" : "Create course"
            }}
          </h3>
        </div>
        <div class="space-y-6 sm:space-y-5">
          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Name
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                v-model="course.name"
                placeholder="Vue.js"
                class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="teacher"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Teacher
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="teacher"
                id="teacher"
                v-model="course.teacher"
                autocomplete="teacher"
                placeholder="Marine dupont"
                class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Description
            </label>
            <div class="mt-1 sm:mt-0 sm:col-span-2">
              <input
                id="description"
                name="description"
                type="text"
                v-model="course.description"
                autocomplete="description"
                placeholder="A course on..."
                class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div
            class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
          >
            <label
              for="city"
              class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Date
            </label>
            <div class="flex mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="date"
                name="start_at"
                id="start_at"
                v-model="course.start_at"
                autocomplete="address-level2"
                class="max-w-lg mr-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
              <input
                type="date"
                name="end_at"
                id="end_at"
                v-model="course.end_at"
                autocomplete="address-level2"
                class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <button
          type="button"
          class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="goTo('home')"
        >
          Cancel
        </button>
        <button
          v-if="$route.name == 'updateCourse'"
          type="submit"
          class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="update()"
        >
          Update
        </button>
        <button
          v-else
          type="submit"
          class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="submit()"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      course: {
        name: "",
        teacher: "",
        description: "",
        start_at: "",
        end_at: "",
      },
    };
  },
  computed: {
    ...mapState(["user_data"]),
  },
  mounted() {
    if (this.$route.name == "updateCourse") {
      this.getCourse();
    }
  },
  methods: {
    goTo(name) {
      this.$router.push({ name: name });
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
  },
};
</script>
