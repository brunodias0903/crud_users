import { User } from "@/services/userService";
import styles from "@styles/UserRow.module.css";
import React from "react";
import Loader from "./Loader";

interface UserRowProps {
  user: User;
  onEdit: (id: number, newName: string) => void;
  onDelete: (id: number) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onEdit, onDelete }) => {
  const [loadingEdit, setLoadingEdit] = React.useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = React.useState<boolean>(false);

  const handleEdit = () => {
    setLoadingEdit(true);

    const newName = prompt(`Editar nome de ${user.name}:`, user.name);
    if (newName && newName.trim() !== "") {
      onEdit(user.id, newName);
    }

    setLoadingEdit(false);
  };

  const handleDelete = () => {
    setLoadingDelete(true);

    const confirmation = confirm(
      `Tem certeza que deseja deletar ${user.name}?`
    );
    if (confirmation) {
      onDelete(user.id);
    }

    setLoadingDelete(false);
  };

  return (
    <tr className={styles.row}>
      <td className={styles.name}>{user.name}</td>
      <td className={styles.actions}>
        <button onClick={handleEdit} className={styles.editButton}>
          {!loadingEdit ? (
            "✏️"
          ) : (
            <Loader customStyle={{ width: 10, height: 10 }} />
          )}
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          {!loadingDelete ? (
            "🗑️"
          ) : (
            <Loader customStyle={{ width: 10, height: 10 }} />
          )}
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
