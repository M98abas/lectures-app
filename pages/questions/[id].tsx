import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { URL } from "../../api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillDelete, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const question = () => {
  const [question, setQuestion]: any = useState([]);
  const [loading, setLoadin]: any = useState(false);
  const Router: any = useRouter();
  const [ids, setIds]: any = useState(0);
  const handelDeleteClick = async (row: any) => {
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
        Router.reload();
        // console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  const handelClickUnactivate = async (row: any) => {
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
    fetch(`${URL}/question/unactivate/${id}`, requestOptions)
      .then((response: any) => response.text())
      .then((result: any) => {
        message.success("The product has been deleted !");
        Router.reload();
        // console.log(result);
      })
      .catch((error) => console.log("error", error));
  };
  /**
   *
   */
  // console.log(id);
  let id: any;
  if (ids) id = ids;  
  // console.log(id);
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

    fetch(`${URL}/question/question/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setQuestion(result.questions);
        setLoadin(false);
      })
      .catch((error) => console.log("error", error.errMsg));
  };
  useEffect(() => {
    setIds(parseInt(Router.query.id));
    getData();
  }, [Router, ids]);
  // console.log(data);

  const columnsFirst: any = [
    {
      title: "IDs",
      dataIndex: "id",
      width: 50,
      sorter: (a: any, b: any) => a.id - b.id,
      render: (text: any, row: any, index: any) => (
        <a href={`/more-datails/${text}`}>{text}</a>
      ),

      defaultSortOrder: "descend",
    },
    {
      title: "Question",
      dataIndex: "question",
      render: (name: any) => <strong>{name}</strong>,
    },
    {
      title: "Truth Answer",
      dataIndex: "truth_answer",
      render: (data: any) => <strong>{data}</strong>,
    },
    {
      title: "active",
      dataIndex: "Qactive",
      render: (data: any) => (
        <strong>{data == 1 ? "It's Actvie" : "It's Unactvie"}</strong>
      ),
    },
    {
      title: "Course Name",
      dataIndex: "name",
      render: (data: any) => <strong>{data}</strong>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      render: (data: any) => <strong>{data}</strong>,
    },
    {
      title: "Action",
      dataIndex: "Qactive",
      render: (data: any, row: any) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <Button
            onClick={() => handelClickUnactivate(row)}
            type="primary"
            className={data == 1 ? "" : "btn"}
            // ghost
            // secondary
            style={
              data == 1
                ? {
                    background: "rgb(190, 200, 200)",
                    width: 120,
                    // color: "white",
                    // background: "red",
                    borderRadius: 10,
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                    borderColor: " rgb(190, 200, 200)",
                  }
                : {
                    width: 120,

                    background: "green",
                    borderRadius: 10,
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                    borderColor: "green",
                  }
            }
          >
            {data == 1 ? <AiFillEye /> : <AiFillEyeInvisible />}

            {data == 1 ? "Unactive" : "Activate"}
          </Button>
          <Button
            className="btn"
            onClick={() => {
              handelDeleteClick(row);
            }}
            type="primary"
            style={{
              width: 90,
              background: "red",
              borderRadius: 10,
              display: "flex",
              gap: 5,
              alignItems: "center",
              borderColor: "red",
            }}
            danger
          >
            <AiFillDelete /> Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="home-container">
      <MainLayout title="Question" hasBack="true" subTitle={`Table of Question`} />
      <div className="container">
        <div className="header">
          <h1>Question</h1>
          <div className="cont-btn">
            <Link href={`/add-question/${ids}`}>Add Question</Link>
          </div>
        </div>
        <Table
          scroll={{ x: "700px" }}
          pagination={{
            defaultPageSize: 20,
          }}
          size="small"
          rowKey={(record: any) => record.Cid}
          loading={loading}
          className="table"
          columns={columnsFirst}
          dataSource={question}
        />
      </div>
    </div>
  );
};

export default question;
