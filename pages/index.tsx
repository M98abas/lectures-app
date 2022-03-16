import type { NextPage } from "next";
import MainLayout from "../components/MainLayout";
import RouteProtect from "../HOC/routerProtect";
import Link from "next/link";
// import Head from "next/head";
// import questionImg from "../public/questionImg.svg";
const Home: NextPage = () => {
  return (
    <>
      <RouteProtect>
        <MainLayout title="Home">
          <div className="container">
            <div className="cards">
              <Link href="/question">
                <div className="card">
                  <img
                    src="./images/questions.svg"
                    alt="Q"
                    className="logo-cate"
                  />
                  <h3 className="title">Questions</h3>
                </div>
              </Link>
              <Link href="/istroctores">
                <div className="card">
                  <img
                    src="./images/exams.svg"
                    alt="Students"
                    className="logo-cate"
                  />
                  <h3 className="title">Students</h3>
                </div>
              </Link>
              <Link href="/courses">
                <div className="card">
                  <img
                    src="./images/course.svg"
                    alt="Courses"
                    className="logo-cate"
                  />
                  <h3 className="title">Courses</h3>
                </div>
              </Link>
            </div>
          </div>
        </MainLayout>
      </RouteProtect>
    </>
  );
};

export default Home;
