import axios from "axios";
import { API_ROOT } from "~/utils/constants";

//board Api
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  return response.data;
};

//update Api
export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updateData
  );
  return response.data;
};
//columns Api
export const CreateNewColumnApi = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);
  return response.data;
};
//columns update API
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updateData
  );
  return response.data;
};

//cards Api
export const CreateNewCardApi = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData);
  return response.data;
};
