import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { ApiRegister } from "../api";
import { useRouter } from "next/router";
// import Cookies from "js-cookie";
import { URL } from "../api";
import Link from "next/link";
import { message, Select } from "antd";

const register = () => {
  const { Option } = Select;
  const [email, setEmail]: any = useState("");
  const [name, setName]: any = useState("");
  const [password, setPassword]: any = useState("");
  const [field, setField]: any = useState();
  const [courseId, setCourseId]: any = useState([]);

  const router = useRouter();
  const handleChange = (value: any) => {
    console.log(value);

    setCourseId(value);
  };
  console.log("this is me", courseId);

  // get all courses from the db
  useEffect(() => {
    const token: any = Cookies.get("LectureToken");
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions: any = {
      method: "Get",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/course/courses/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setField(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log("error", error));
  }, [router]);

  // Post the Rigister to the back-end
  console.log(field);

  const handleRegister = (e: any) => {
    e.preventDefault();
    ApiRegister(
      { email, name, password, courseId },
      (data: any, error: any) => {
        console.log(data);

        if (data.errMsg) return message.error(data.errMsg);

        Cookies.set("registerToken", data.token);
        router.push("/login");
      }
    );
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="left-side">
          <img src="./images/h6.png" alt="Logo" className="logo" />
        </div>
        <div className="right-side">
          <form onSubmit={handleRegister}>
            <p className="label">Email</p>
            <input
              required
              placeholder="Example@MK.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <p className="label">name</p>
            <input
              required
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <p className="label">Password</p>
            <input
              required
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <div className="block-Q">
              <p className="answers-p">Choose the field</p>

              <Select
                mode="multiple"
                // defaultValue="s"
                style={{
                  width: 250,
                  height: 40,
                  marginTop: 10,
                  marginBottom: 10,
                }}
                onChange={handleChange}
              >
                {field
                  ? field.map((e: any) => (
                      <Option value={e.Cid}>{e.name}</Option>
                    ))
                  : null}
              </Select>
            </div>
            <button type="submit">Sign Up</button>
            <div
              className="links-container"
              style={{ marginTop: 10, alignSelf: "center" }}
            >
              <p>Already have an account?</p>
              <Link href="/login">
                <p className="sign-up-link">Login</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
