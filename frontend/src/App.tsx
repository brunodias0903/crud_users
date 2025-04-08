import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  User,
} from "@/services/userService";
import Loader from "@components/Loader";
import UserTable from "@components/UserTable";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

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
    <Container fluid className="p-3">
      {loading ? (
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xs={12} className="text-center">
            <Loader customStyle={{ width: 100, height: 100 }} />
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="bg-white p-4 rounded shadow">
              <h1 className="text-center mb-4">CRUD de Usuários</h1>
              <UserTable
                users={users}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
              <div className="text-center mt-3">
                <button className="btn btn-primary" onClick={handleAdd}>
                  Adicionar usuário
                </button>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default App;
