import { Button } from "antd";

const CardQuestion = ({ question }: any) => {
  return (
    <div className="container" key={question[0].id}>
      {question.length != 0 ? (
        <>
          <h3 className="title">Q: {question[0].question}</h3>
          <p className="truth">
            Truth Answer{" "}
            <span className="answer">{question[0].truth_answer}</span>
          </p>
          <ul className="answers">
            {question.map((e: any) => (
              <p key={e.id}>{e.aswers}</p>
            ))}
          </ul>
          <div className="buttons">
            <Button className="btn" type="primary">
              Edit
            </Button>
            <Button type="primary" danger>
              Delete
            </Button>
          </div>
        </>
      ) : (
        <h3 className="title">This Question is not containe any answers</h3>
      )}
    </div>
  );
};
export default CardQuestion;
