import { Request, Response } from "express";
import * as services from "../services";
import type { LoginPayload, RegistrationPayload } from "../models/types";
import { handleResponse } from "../utils/utils";

export const RegisterFarmer = async (req: Request, res: Response) => {
  try {
    const payload = req.body as RegistrationPayload;
    
    const result = await services.RegisterFarmer(payload);
    
    return handleResponse(res, result.httpStatus, {
      data: result.data,
      message: result.message,
      error: result.error,
      status: result.status,
    });
  } catch (error) {
    console.error("registration error", error);
    
    return handleResponse(res, 500, {
      data: null,
      message: "internal server error",
      error: "internal server error",
      status: false,
    });
  }
};

export const LoginFarmer = async (req: Request, res: Response) => {
  try {
    const payload = req.body as LoginPayload;
    
    const result = await services.LoginFarmer(payload);
    
    return handleResponse(res, result.httpStatus, {
      data: result.data,
      message: result.message,
      error: result.error,
      status: result.status,
    });
  } catch (error) {
    console.error("login error", error);
   
    return handleResponse(res, 500, {
      data: null,
      message: "internal server error",
      error: "internal server error",
      status: false,
    });
  }
};
