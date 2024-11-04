// composables/useTree.ts
import { ref } from 'vue';
import type { ITreeNode } from '../types/TreeNode';

export const useTree = () => {
  const tree = ref<ITreeNode[]>([]);

  const loadTree = async () => {
    const response = await fetch('/api/tree');
    if (!response.ok) {
      throw new Error('Failed to fetch tree data');
    }
    const data = await response.json();
    tree.value = data;
  };

  loadTree();

  return { tree };
};
