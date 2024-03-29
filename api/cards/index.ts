import axios from "@/lib/axios";

/**
 * 카드 목록 조회
 */
export const getCardList = async (size: Number, columnId: Number) => {
  const response = await axios.get(`/cards?size=${size}&columnId=${columnId}`);
  return response.data;
};

/**
 * 카드 상세조회
 */
export const getCardinfoList = async (cardId: number) => {
  const response = await axios.get(`/cards/${cardId}`);
  return response.data;
};

/**
 * 카드 삭제
 */
export const deleteCard = async (cardId: number) => {
  const response = await axios.delete(`/cards/${cardId}`);
  return response.data;
};
