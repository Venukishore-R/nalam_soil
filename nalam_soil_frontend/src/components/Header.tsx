import { useAuth } from "../lib/auth-context";
import { Button, Layout, Typography, Avatar } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AntHeader
      style={{
        background: "#001529",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link
        to="/home"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "white",
          textDecoration: "none",
        }}
      >
        <Avatar style={{ backgroundColor: "white", color: "#001529" }}>
          N
        </Avatar>
        <Title level={4} style={{ color: "white", margin: 0 }}>
          Nalam Soil
        </Title>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {user && (
          <>
            <span style={{ color: "white" }}>
              Welcome, <strong>{user.name}</strong>
            </span>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </AntHeader>
  );
}

export default Header;
