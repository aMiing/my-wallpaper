<script setup>
import { ref, onMounted } from "vue";
import { queryClassifications, queryWallList } from "../services/index.js";
const pageSize = 20;
let start = 0,
  id = 26;

const classifications = ref([]);
const wallList = ref([]);
const loading = ref(false);

const getClassifications = async () => {
  const { data } = await queryClassifications();
  classifications.value = data;
};
const loadMore = async () => {
  start += pageSize;
  getWallList(start, "more");
};

const getWallList = async (start = 0, type) => {
  loading.value = true;

  const { data } = await queryWallList(id, start);
  loading.value = false;
  type === "more"
    ? (wallList.value = wallList.value.concat(data))
    : (wallList.value = data);
};

onMounted(() => {
  getClassifications();
});
window.addEventListener("hashchange", () => {
  id = Number(location.hash.slice(1));
  start = 0;
  wallList.value = [];
  getWallList();
});
</script>

<template>
  <div class="class-content">
    <a
      v-for="(item, index) in classifications"
      class="class-item"
      :href="'#' + item.id"
    >
      {{ item.name }}
    </a>
  </div>
  <div
    class="sroll-box"
  >
    <div class="img-content" v-infinite-scroll="loadMore" infinite-scroll-distance="200">
      <div v-for="(item, index) in wallList" :key="index" class="img-box">
        <el-image
          :src="item.url || ''"
          class="img"
          :preview-src-list="[item.url || '']"
        >
          <template #placeholder>
            <div class="image-slot"></div>
          </template>
        </el-image>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.class-content {
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  background: rgba(0, 0, 0, 0.6);
  left: 0;
  top: 0;
  color: #fff;
  z-index: 99;
  .class-item {
    color: #fff;
    padding: 0 6px;
    cursor: pointer;
    &:hover {
      color: pink;
    }
  }
}
.sroll-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
.img-content {
  display: flex;
  flex-wrap: wrap;
  background: #000;

  .img-box {
    width: 25%;
    height: 15vw;
    position: relative;
    background: #000;
    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
