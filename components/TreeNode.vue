<script lang="ts" setup>
import { ref, computed, defineProps } from 'vue';
import type { ILocale, ITreeNode } from '~/types/TreeNode';

const props = defineProps<{
  node: ITreeNode;
  treeNodes: ITreeNode[];
  locale: keyof ITreeNode['locale'];
  currentPath: string[];
}>();

const isOpen = ref(false);

const getLocalizedValue = (
  node: ITreeNode,
  locale: keyof ITreeNode['locale'],
  key: keyof ILocale
): string => {
  if (node.locale[locale] && node.locale[locale][key]) {
    return String(node.locale[locale][key]);
  }

  const fallbackLocales: Array<keyof ITreeNode['locale']> = ['ru', 'fr'];

  for (const fallbackLocale of fallbackLocales) {
    if (
      node.locale[fallbackLocale] &&
      node.locale[fallbackLocale][key] !== undefined
    ) {
      return String(node.locale[fallbackLocale][key]);
    }
  }

  return '';
};

const currentPath = ref<string[]>([
  ...props.currentPath,
  getLocalizedValue(props.node, props.locale, 'cg_name'),
]);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const displayName = computed(() => {
  return getLocalizedValue(props.node, props.locale, 'cg_name');
});

const externalLink = computed(() => {
  return `${getLocalizedValue(props.node, props.locale, 'link')}${props.node.id}`;
});

const breadcrumbs = computed(() => {
  return currentPath.value.join(' -> ');
});
</script>

<template>
  <li>
    <div class="flex items-center cursor-pointer" @click="toggle">
      <span class="font-semibold">{{ displayName }}</span>
      <a
        :href="externalLink"
        target="_blank"
        class="ml-2 text-blue-500 underline"
        @click.stop
        >Link</a
      >
    </div>
    <div class="text-gray-500">
      {{ breadcrumbs }}
    </div>
    <ul v-if="isOpen" class="ml-4">
      <TreeNode
        v-for="child in node.childs"
        :key="child.id"
        :node="child"
        :tree-nodes="treeNodes"
        :locale="locale"
        :current-path="currentPath"
      />
    </ul>
  </li>
</template>

<style scoped></style>
