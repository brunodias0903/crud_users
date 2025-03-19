import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  User,
} from "@/services/userService";
import Loader from "@components/Loader";
import UserTable from "@components/UserTable";
import styles from "@styles/App.module.css";
import { useCallback, useEffect, useState } from "react";

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      setUsers(await getUsers());
    } catch (error) {
      console.log("Error fetchUsers: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAdd = async () => {
    const newName = prompt("Digite o nome do novo usuário:");
    if (newName && newName.trim() !== "") {
      const newUser = await createUser(newName);
      if (newUser) {
        setUsers([...users, newUser]);
        fetchUsers();
      }
    }
  };

  const handleEdit = useCallback(
    async (id: number, newName: string) => {
      const updatedUser = await updateUser(id, newName);
      if (updatedUser) {
        fetchUsers();
      }
    },
    [fetchUsers]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      const deleted = await deleteUser(id);
      if (deleted) {
        fetchUsers();
      }
    },
    [fetchUsers]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className={styles.root}>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.tableContainer}>
          <h1 className={styles.tableTitle}>CRUD de Usuários</h1>
          <UserTable
            users={users}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <button className={styles.addButton} onClick={handleAdd}>
            Adicionar usuário
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
