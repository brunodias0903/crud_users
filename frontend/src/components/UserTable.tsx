import { User } from "@/services/userService";
import UserRow from "@components/UserRow";
import styles from "@styles/UserTable.module.css";

interface UserTableProps {
  users: User[];
  handleEdit: (id: number, newName: string) => void;
  handleDelete: (id: number) => void;
}

const UserTable = ({ users, handleDelete, handleEdit }: UserTableProps) => {
  return (
    <table className={styles.table}>
      <tbody>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
