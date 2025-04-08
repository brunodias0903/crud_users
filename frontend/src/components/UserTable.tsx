import { User } from "@/services/userService";
import UserRow from "@components/UserRow";
import { Col, Container, Row, Table } from "react-bootstrap";

interface UserTableProps {
  users: User[];
  handleEdit: (id: number, newName: string) => void;
  handleDelete: (id: number) => void;
}

const UserTable = ({ users, handleDelete, handleEdit }: UserTableProps) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="table-responsive">
            <Table hover bordered responsive>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
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
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserTable;
