import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { URL } from "../../api";
import Cookies from "js-cookie";
import { TiInputChecked } from "react-icons/ti";
import { Button, message, Table } from "antd";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";

const viewQuestion = () => {
  const Router: any = useRouter();
  const [ids, setIds]: any = useState(0);
  const [answers, setAnswers]: any = useState([]);
  const [truthAnswers, setTruthAnswers]: any = useState([]);
  const [question, setQuestion]: any = useState("");

  const [loading, setLoadin]: any = useState(false);
  let id: any;
  if (ids) id = ids;
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

    fetch(`${URL}/question/getOne/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAnswers(result.questionAnswer);
        console.log(result.questionAnswer);

        setQuestion(result.questionAnswer[0].question);
        setTruthAnswers(result.questionAnswer[0].truth_answer);
        setLoadin(false);
      })
      .catch((error) => console.log("error", error.errMsg));
  };

  useEffect(() => {
    setIds(parseInt(Router.query.id));
    getData();
  }, [Router, ids]);
  // console.log(data);
  console.log(question);

  const columnsSecond: any = [
    {
      title: "IDs",
      dataIndex: "id",
      width: 10,
      align: "center",
      sorter: (a: any, b: any) => a.id - b.id,
      render: (text: any, row: any, index: any) => <p>{index + 1}</p>,

      defaultSortOrder: "descend",
    },
    {
      title: "answers",
      //   width: 5,
      dataIndex: "aswers",
      render: (data: any) => (
        <p>
          {truthAnswers == data ? (
            <p
              style={{
                alignItems: "center",
                display: "flex",
                // justifyContent: "center",
              }}
            >
              {" "}
              {data} <TiInputChecked size="30" color="green" />
            </p>
          ) : (
            data
          )}
        </p>
      ),
    },
  ];
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

  return (
    <div className="home-container">
      <MainLayout
        title="Question"
        hasBack="true"
        subTitle={`Table of Question`}
      />
      <div className="container">
        <div className="header">
          <h1>{question}</h1>
          <Button
            className="btn"
            onClick={() => {
              handelDeleteClick(id);
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
        <Table
          rowKey={(record) => record.id}
          columns={columnsSecond}
          dataSource={answers}
          pagination={false}
        />
      </div>
    </div>
  );
};
export default viewQuestion;
