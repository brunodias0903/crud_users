import api from "@/services/api";

export interface User {
  id: number;
  name: string;
}

export const getUsers = async (): Promise<User[]> => {
  return (await api.get<User[]>("/users")).data;
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    return (await api.get<User>(`/users/${id}`)).data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
};

export const createUser = async (name: string): Promise<User> => {
  return (await api.post<User>("/users", { name })).data;
};

export const updateUser = async (
  id: number,
  name: string
): Promise<User | null> => {
  try {
    return (await api.put<User>(`/users/${id}`, { name })).data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return null;
  }
};

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/users/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return false;
  }
};
