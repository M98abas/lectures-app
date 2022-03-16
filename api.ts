import Cookies from "js-cookie";
export const URL = "http://localhost:4000";

export const ApiLogin = (info: any, callback: any) => {
  // console.log(info);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch(`${URL}/lecture/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};
// export const ApiGetExams = (info: any, callback: any) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify(info);
//   console.log(raw);

//   var requestOptions: any = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch(`${URL}/question`, requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       if (result.status) return callback(result, null);
//       callback(null, result.errMsg);
//     })
//     .catch((error) => console.log("error", error));
// };
export const ApiRegister = (info: any, callback: any) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${URL}/lecture/register`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};
export const ApiGetAllQuestion = (info: any, callback: any) => {
  const token: any = Cookies.get("LectureToken");
  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions: any = {
    method: "Get",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${URL}/question`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};

export const ApiAddQuestion = (info: any, callback: any) => {
  const token: any = Cookies.get("LectureToken");
  var myHeaders = new Headers();
  myHeaders.append("token", token);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(info);

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${URL}/question/question`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.status) return callback(result, null);
      callback(null, result.errMsg);
    })
    .catch((error) => console.log("error", error));
};
