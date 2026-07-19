import { Purchase } from "../models/purchase.model.js";
export const hasCourseAccess = async (userId, courseId) => {
  if (!userId || !courseId) {
    return false;
  }

  const purchase = await Purchase.findOne({
    userId,
    courseId,
  }).select("_id");

  return Boolean(purchase);
};
