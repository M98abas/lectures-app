import { PageHeader, Button, Tooltip } from "antd";
import { useRouter } from "next/router";
import { LogoutOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
// import myImg from "";
const MainLayout = ({ children, title, hasBack, subTitle }: any) => {
  const Router = useRouter();
  const handleLogout = () => {
    Cookies.remove("LectureToken");
    Cookies.remove("user");
    Router.push("/login");
  };
  // const
  // console.log("Has back", hasBack);

  return (
    <>
      {hasBack ? (
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={subTitle}
          onBack={() => Router.push("/")}
          extra={[
            <Tooltip title="Logout">
              <Button
                danger
                type="primary"
                size="large"
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              />
            </Tooltip>,
          ]}
        />
      ) : (
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={subTitle}
          extra={[
            <Tooltip title="Logout">
              <Button
                danger
                type="primary"
                size="large"
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              />
            </Tooltip>,
          ]}
        />
      )}

      <div className="container">{children}</div>
    </>
  );
};

export default MainLayout;
