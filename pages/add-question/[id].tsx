import { Button, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiAddQuestion } from "../../api";
import MainLayout from "../../components/MainLayout";
import RouteProtect from "../../HOC/routerProtect";
import { Radio } from "antd";

const addQuestion = () => {
  const Router = useRouter();
  const [courseId, setCourseId]: any = useState(0);
  const [question, setQuestion]: any = useState("");
  const [truthAnswer, setTruthAnswer]: any = useState();
  const [answer1, setAnswer1]: any = useState("");
  const [answer2, setAnswer2]: any = useState("");
  const [answer3, setAnswer3]: any = useState("");
  const [answer4, setAnswer4]: any = useState("");
  const [id, setId]: any = useState();
  // this array to save the answers that the user will send it
  let answers: any = [];
  let idROuter: any = Router.query.id;
  useEffect(() => {
    setCourseId(parseInt(idROuter));
    setId(Math.floor(Math.random() * 1000));
  }, [Router]);

  let courseValueId: any = courseId != NaN ? courseId : 0;
  console.log("here", courseValueId);
  const handelClick = (e: any) => {
    answers.push(answer1, answer2, answer3, answer4);
    e.preventDefault();
    ApiAddQuestion(
      { id, question, truthAnswer, answers, courseValueId },
      (data: any, error: any) => {
        if (error) return alert(error);
        message.success("تم الخزن");
        Router.push(`/questions/${courseValueId}`);
      }
    );
  };

  // OnChange the value of Combobox
  const onChange = (e: any) => {
    setTruthAnswer(e.target.value);
  };
  // console.log("Heeeeeeeeeeeee", courseId);

  return (
    <RouteProtect>
      <MainLayout title="Add Question">
        <div className="container">
          <h1 className="big-o">Question ID : {id}</h1>
          <div className="content-container">
            <div className="question-title">
              <h3>Enter your Question</h3>
              {""}
              <input
                value={question}
                onChange={(e: any) => setQuestion(e.target.value)}
                placeholder="Enter your Question"
                type="text"
                className="question-input"
              />
            </div>
            <div className="answers-block">
              <Radio.Group onChange={onChange} value={truthAnswer}>
                <Radio value={answer1}>
                  <div className="block-Q">
                    <p className="answers-p">First Answer</p>
                    <input
                      value={answer1}
                      placeholder="Enter First choice"
                      onChange={(e: any) => setAnswer1(e.target.value)}
                      type="text"
                      className="answers-input"
                    />
                  </div>
                </Radio>
                <Radio value={answer2}>
                  <div className="block-Q">
                    <p className="answers-p">Second Answer</p>
                    <input
                      value={answer2}
                      onChange={(e: any) => setAnswer2(e.target.value)}
                      placeholder="Enter Second choice"
                      type="text"
                      className="answers-input"
                    />
                  </div>
                </Radio>
                <Radio value={answer3}>
                  <div className="block-Q">
                    <p className="answers-p">Third Answer</p>
                    <input
                      placeholder="Enter Third choice"
                      value={answer3}
                      onChange={(e: any) => setAnswer3(e.target.value)}
                      type="text"
                      className="answers-input"
                    />
                  </div>
                </Radio>
                <Radio value={answer4}>
                  <div className="block-Q">
                    <p className="answers-p">Fourth Answer</p>
                    <input
                      value={answer4}
                      placeholder="Enter Fourth choice"
                      onChange={(e: any) => setAnswer4(e.target.value)}
                      type="text"
                      className="answers-input"
                    />
                  </div>
                </Radio>
              </Radio.Group>
              <div className="button">
                <Button className="submit" type="primary" onClick={handelClick}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </RouteProtect>
  );
};

export default addQuestion;
