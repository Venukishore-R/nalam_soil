import { Request, Response, NextFunction } from "express";
import { handleResponse } from "../utils/utils";

const SECRET = process.env.APP_SECRET ?? "open-sesame";

export const requireAppSecret = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const provided = req.header("x-app-secret");
  if (provided !== SECRET) {
    return handleResponse(res, 401, {
      message: "missing or invalid X-App-Secret header",
      error: "missing or invalid X-App-Secret header",
      status: false,
    });
  }
  return next();
};
