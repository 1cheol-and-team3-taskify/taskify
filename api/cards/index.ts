import axios from "@/lib/axios";

/**
 * 대시보드 목록 조회
 */

// export const getCardList = async (size: Number, columnId: Number) => {
//   const response = await axios.get(`/cards`, {
//     params: {
//       size,
//       columnId,
//     },
//   });
//   return response.data;
// };
export const getCardList = async (size: Number, columnId: Number) => {
  const response = await axios.get(`/cards?size=${size}&columnId=${columnId}`);
  return response.data;
};
