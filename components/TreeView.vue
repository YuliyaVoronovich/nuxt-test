<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { ITreeNode } from '../types/TreeNode';

const treeData = ref<ITreeNode[]>([]);
const locale = ref<keyof ITreeNode['locale']>('ru');

const fetchTreeData = async () => {
  try {
    const response = await fetch('/api/tree');
    const data: ITreeNode[] = await response.json();
    treeData.value = data;
  } catch (error) {
    console.error('Error:', error);
  }
};

onMounted(fetchTreeData);

watch(locale, () => {
  fetchTreeData();
});
</script>

<template>
  <div class="flex flex-col justify-center m-auto max-w-screen-xl">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Категории</h1>
    <div class="mb-4">
      <label for="locale" class="block text-sm font-medium text-gray-700 mb-1"
        >Выберите язык</label
      >
      <select
        id="locale"
        v-model="locale"
        class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="ru">Русский</option>
        <option value="en">Английский</option>
        <option value="fr">Французский</option>
      </select>
    </div>
    <ul v-if="treeData.length">
      <TreeNode
        v-for="node in treeData"
        :key="node.id"
        :node="node"
        :tree-nodes="treeData"
        :locale="locale"
        :current-path="[]"
      />
    </ul>
    <div v-else>Загрузка...</div>
  </div>
</template>

<style scoped></style>
