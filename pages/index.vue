<script lang="ts" setup>
import contenteditable from "vue-contenteditable";

const text = ref("");
const testforApi = ref("");
const counter = ref(0);
const frToEn = ref(true);

const { data: translation } = await useAsyncData(
  "translation",
  () =>
    $fetch("/api/translate", {
      method: "POST",
      body: {
        text: text.value,
        source_lang: frToEn.value ? "FR" : "EN",
        target_lang: frToEn.value ? "EN" : "FR",
      },
    }),
  {
    watch: [testforApi, counter,frToEn],
    immediate: false,
  }
);

watch(text, (newText) => {
  if (newText.at(-1) === " " || newText.at(-1) === "." || newText.length - counter.value > 5) {
    text.value = newText;
    counter.value = newText.length;
    console.log("called");
  }
});

// const { data: translation } = await useFetch("/api/translate", {
//   method:"POST",
//   body: {
//     text: text,
//     source_lang: frToEn.value ? "FR" : "EN",
//     target_lang: frToEn.value ? "EN" : "FR",
//   },
//   watch:[text],
// });
</script>
<template>
  <div class="w-[95%] md:w-[80%] m-auto h-full flex flex-col">
    <h1 class="text-center text-4xl font-bold flex-initial mt-8">DeepL UI</h1>
    <div class="flex-auto">
      <div class="grid grid-cols-3 mt-12 font-medium">
        {{  }}
        <p>{{ frToEn ? "Français" : "Anglais" }}</p>
        <div class="flex justify-center">
          <button
            class="text-xl hover:scale-105 transition-all ease-in"
            @click="
              frToEn = !frToEn;
              translation?.data ? (text = translation.data ?? '') : '';
            "
          >
            💱
          </button>
        </div>
        <p class="text-right">{{ !frToEn ? "Français" : "Anglais" }}</p>
      </div>
      <div class="grid grid-cols-2 gap-2 font-light font-[GeissLight]">
        <contenteditable
          tag="div"
          :no-html="true"
          class="overflow-hidden min-h-[200px] border border-gray-300 rounded-lg p-4 focus:outline-2 focus:outline-sky-500 bg-white shadow-md shadow-black/5"
          contenteditable
          v-model="text"
        >
        </contenteditable>
        <div class="p-4 min-h-[200px] border border-gray-300 bg-white rounded-lg shadow-md shadow-black/5">
          {{ translation?.data ? translation.data : "" }}
        </div>
      </div>
    </div>
    <p class="text-xs text-center text-gray-500 pb-1">Made by Matou</p>
  </div>
</template>
