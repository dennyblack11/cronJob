import axios from "axios";

const URL = "http://localhost:4001";

export const createUser = async (data: any) => {
  try {
    return await axios.post(`${URL}/create-user`, data).then((res) => {
      return res.data?.data;
    });
  } catch (error) {
    return error;
  }
};

export const upGradePlan = async (data: any) => {
  try {
    return await axios.patch(`${URL}/upgrade-user-plan`, data).then((res) => {
      console.log(res);
    });
  } catch (error) {
    return error;
  }
};
