<script setup>
import { ref, onMounted } from 'vue'
import { AddNewItem, GetItems, UpdateById, DeleteItem } from './services/wishlistService';

const wishlist = ref([]);

const newItem = ref({
  nome: null,
  descricao: null
});

const editingItem = ref(null);

onMounted(async () => {
  const result = await GetItems();
  wishlist.value = result;
});

const addItem = async () => {
  if (editingItem.value) {
    await UpdateById(editingItem.value.id, newItem.value);

    const index = wishlist.value.findIndex(item => item.id === editingItem.value.id);
    wishlist.value[index] = { ...editingItem.value, ...newItem.value };
    editingItem.value = null;
  } else {
    const newItemData = await AddNewItem(newItem.value);
    wishlist.value.push(newItemData);
  }

  newItem.value = { nome: '', descricao: '' };
};

const editItem = (item) => {
  newItem.value = { nome: item.nome, descricao: item.descricao };
  editingItem.value = item;
};

const removeItem = async (id) => {
  await DeleteItem(id);
  wishlist.value = wishlist.value.filter(item => item.id !== id);
};
</script>

<template>
  <div class="container py-5">
    <h1 class="mb-5 text-center text-primary">Minha Wishlist 💫</h1>

    <div class="card mb-4 shadow-lg rounded">
      <div class="card-body">
        <form @submit.prevent="addItem">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Nome do item" v-model="newItem.nome" required />
            <input type="text" class="form-control" placeholder="Descrição do item" v-model="newItem.descricao"
              required />
            <button class="btn btn-success" type="submit">
              {{ editingItem ? 'Salvar Alterações' : 'Adicionar à Wishlist' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Lista de Itens -->
    <div class="row">
      <div class="col-lg-4 col-md-6 col-sm-12 mb-4" v-for="(item) in wishlist" :key="item.id">
        <div class="card shadow-sm border-light">
          <div class="card-body">
            <h5 class="card-title">{{ item.nome }}</h5>
            <p class="card-text text-muted">{{ item.descricao }}</p>
            <div class="d-flex justify-content-between">
              <!-- Botão Editar -->
              <button class="btn btn-outline-primary btn-sm" @click="editItem(item)">
                ✏️ Editar
              </button>
              <!-- Botão Remover -->
              <button class="btn btn-outline-danger btn-sm" @click="removeItem(item.id)">
                🗑️ Remover
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>