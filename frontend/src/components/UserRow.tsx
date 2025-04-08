import { User } from "@/services/userService";
import React from "react";
import { Button } from "react-bootstrap";
import Loader from "./Loader";

interface UserRowProps {
  user: User;
  onEdit: (id: number, newName: string) => void;
  onDelete: (id: number) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onEdit, onDelete }) => {
  const [loadingEdit, setLoadingEdit] = React.useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = React.useState<boolean>(false);

  const handleEdit = async () => {
    setLoadingEdit(true);
    try {
      const newName = prompt(`Editar nome de ${user.name}:`, user.name);
      if (newName && newName.trim() !== "") {
        await onEdit(user.id, newName);
      }
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const confirmation = confirm(
        `Tem certeza que deseja deletar ${user.name}?`
      );
      if (confirmation) {
        await onDelete(user.id);
      }
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <tr>
      <td className="align-middle">{user.name}</td>
      <td className="text-end">
        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="outline-warning"
            size="sm"
            onClick={handleEdit}
            disabled={loadingEdit}
            className="d-flex align-items-center justify-content-center"
            style={{ width: "32px", height: "32px" }}
          >
            {loadingEdit ? (
              <Loader customStyle={{ width: 16, height: 16 }} />
            ) : (
              <span>✏️</span>
            )}
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleDelete}
            disabled={loadingDelete}
            className="d-flex align-items-center justify-content-center"
            style={{ width: "32px", height: "32px" }}
          >
            {loadingDelete ? (
              <Loader customStyle={{ width: 16, height: 16 }} />
            ) : (
              <span>🗑️</span>
            )}
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
