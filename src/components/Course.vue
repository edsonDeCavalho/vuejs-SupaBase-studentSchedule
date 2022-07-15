<template>
  <div class="bg-black px-4 m-5 py-5 sm:px-6" @click="goTo('updateCourse')">
    <div class="flex space-x-3">
      <div class="min-w-0 flex-1">
        <p class="text-sm font-medium text-white text-left">
          <a href="#" class="hover:underline"
            >{{ data.name }} ({{ data.teacher }})</a
          >
        </p>
        <p class="text-sm text-gray-500 text-left">
          <a href="#" class="hover:underline">{{ data.start_at }}</a>
        </p>
      </div>
      <div class="flex-shrink-0 self-center flex">
        <div class="relative z-30 inline-block text-left">
          <div>
            <button
              type="button"
              class="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600"
              id="menu-0-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span class="sr-only">Open options</span>
              <!-- Heroicon name: solid/dots-vertical -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
  },
  methods: {
    goTo(name) {
      this.$router.push({
        name: name,
        params: {
          id: this.data.id,
        },
      });
    },
  },
};
</script>
