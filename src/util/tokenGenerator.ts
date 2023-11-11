import * as randomString from "randomized-string";

export const generateUserToken = (): string => {
//   let result;

  //    new Promise(async (resolve, reject) => {
  //     const token =  randomString.generate({
  //         charset: "alphanumeric",
  //       length: 6,
  //       prefix: "RR-",
  //     lowerCaseOnly: true,    //lower case only

  //     });
  //     if (token != null) {
  //       resolve({ result: token });
  //     } else {
  //       reject({ result: "ERR_No_TOKEN" });
  //     }
  //   })
  //     .then( (response:any) => {
  //       result =  response.result;
  //     })
  //     .catch( (error) => {
  //       result =  error.result;
  //       console.log(`error in generating Token. Error Code = ${error.result}`);
  //     })
  //     .finally(() => {
  //       console.log("Token Generated");
  //     });

  //   return result;

  const token = randomString.generate({
    charset: "alphanumeric", //alphanumeric
    lowerCaseOnly: true, //lower case only
    length: 6, //number of characters
    prefix: "RR-", //optional prefix
  });
  return token;
};
