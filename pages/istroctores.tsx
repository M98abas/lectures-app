import MainLayout from "../components/MainLayout";
import { message, Table } from "antd";
import { useEffect, useState } from "react";
import { URL } from "../api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const istroctores = () => {
  const [data, setData] = useState([]);
  const [loading, setLoadin] = useState(false);
  const Router = useRouter();

  const handelClickDelete = async (row: any) => {
    const token: any = Cookies.get("LectureToken");
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions: any = {
      method: "put",
      headers: myHeaders,
      redirect: "follow",
    };
    // console.log(row.id);
    let id = row.id;
    fetch(`${URL}/question/delete/${id}`, requestOptions)
      .then((response: any) => response.text())
      .then((result: any) => {
        message.success("The product has been deleted !");
        // Router.reload();
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  /**
   *
   */
  const getData = () => {
    setLoadin(true);
    const token: any = Cookies.get("LectureToken");
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions: any = {
      method: "Get",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/course/all`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        console.log(result);

        setLoadin(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);
  const columns: any = [
    {
      title: "IDs",
      dataIndex: "id",
      width: 50,
      sorter: (a: any, b: any) => a.id - b.id,
      render: (text: any, row: any, index: any) => (
        <a href={`/${text}`}>{text}</a>
      ),

      defaultSortOrder: "descend",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (name: any) => <strong>{name}</strong>,
      // width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (name: any) => <strong>{name}</strong>,
      // width: 200,
    },
    {
      title: "Field",
      dataIndex: "cName",
      render: (data: any) => <strong>{data}</strong>,
    },
    {
      title: "Score",
      dataIndex: "score",
      render: (data: any) => <strong>{data}</strong>,
    },
  ];

  return (
    <div className="home-container">
      <MainLayout title="Students" hasBack="true" subTitle="Table of Content" />
      <div className="container">
        <div className="header">
          <h1>Students</h1>
        </div>
        <Table
          scroll={{ x: "700px" }}
          pagination={{
            defaultPageSize: 10,
          }}
          size="small"
          rowKey={(record: any) => record.id}
          loading={loading}
          className="table"
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default istroctores;
