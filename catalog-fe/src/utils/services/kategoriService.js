import api from "../api";

const kategoriService = {
  // Get all categories
  async getCategories() {
    try {
      const response = await api("/kategori");
      console.log("kategoriService.getCategories response:", response);
      return response;
    } catch (error) {
      console.error("Error in getCategories:", error);
      throw error;
    }
  },

  // Get single category by ID
  async getCategoryById(id) {
    try {
      const response = await api(`/kategori/${id}`);
      return response;
    } catch (error) {
      console.error(`Error in getCategoryById (${id}):`, error);
      throw error;
    }
  },

  // Create new category
  async createCategory(data) {
    try {
      const response = await api("/kategori", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.error("Error in createCategory:", error);
      throw error;
    }
  },

  // Update category by ID
  async updateCategory(id, data) {
    try {
      const response = await api(`/kategori/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.error(`Error in updateCategory (${id}):`, error);
      throw error;
    }
  },

  // Delete category by ID
  async deleteCategory(id) {
    try {
      const response = await api(`/kategori/${id}`, {
        method: "DELETE",
      });
      return response;
    } catch (error) {
      console.error(`Error in deleteCategory (${id}):`, error);
      throw error;
    }
  },
};

export default kategoriService;
