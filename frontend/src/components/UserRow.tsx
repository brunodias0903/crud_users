import { User } from "@/services/userService";
import styles from "@styles/UserRow.module.css";
import React from "react";

interface UserRowProps {
  user: User;
  onEdit: (id: number, newName: string) => void;
  onDelete: (id: number) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onEdit, onDelete }) => {
  const handleEdit = () => {
    const newName = prompt(`Editar nome de ${user.name}:`, user.name);
    if (newName && newName.trim() !== "") {
      onEdit(user.id, newName);
    }
  };

  const handleDelete = () => {
    const confirmation = confirm(
      `Tem certeza que deseja deletar ${user.name}?`
    );
    if (confirmation) {
      onDelete(user.id);
    }
  };

  return (
    <tr className={styles.row}>
      <td className={styles.name}>{user.name}</td>
      <td className={styles.actions}>
        <button onClick={handleEdit} className={styles.editButton}>
          Editar
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Deletar
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
