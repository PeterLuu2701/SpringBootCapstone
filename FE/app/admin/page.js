"use client"
import AdminNavbar from "@/components/admin-navbar/AdminNavbar";
import UsersDashboard from "@/components/user-dashboard/UserDashboard";
import AdminLayout from "@/layout/AdminLayout";
import { Container, Row, Col } from "react-bootstrap"; 

const AdminPage = () => {
  return (
    <AdminLayout>
      <Container fluid> 
        <Row>
          <Col lg={3} xl={2}> 
            <AdminNavbar />
          </Col>
          <Col lg={9} xl={10}> 
            <UsersDashboard />
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default AdminPage;