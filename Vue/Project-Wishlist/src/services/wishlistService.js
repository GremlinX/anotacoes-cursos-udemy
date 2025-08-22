import axios from 'axios'

const API_URL = 'https://localhost:7206/api/wishlist'

export const GetItems = async () => {
  try {
    const response = await axios.get(`${API_URL}`)
    return response.data;
  } catch (error) {
    console.error('Ocorreu um erro ao buscar a lista completa: ', error.message)
  }
}

export const GetById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data;
  } catch (error) {
    console.error('Ocorreu um erro ao buscar o item: ', error.message)
  }
}

export const AddNewItem = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}`, formData);
        return response.data;
    } catch (error) {
        console.error ("Ocorreu um erro ao salvar seu item: ", error.message)
    }
}

export const UpdateById = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, formData)
        return response.data;
    } catch (error) {
        console.error ("Ocorreu um erro ao atualizar seu item: ", error.message)
    }
}

export const DeleteItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        return response.data;
    } catch (error) {
        console.error ("Ocorreu um erro ao excluír seu item: ", error.message)
    }
}