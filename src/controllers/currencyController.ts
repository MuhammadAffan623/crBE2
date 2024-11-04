import { Request, Response } from "express";
import { CurrencyService } from "../service/currencyService";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response";

interface CustomError extends Error {
  statusCode?: number;
}
export class CurrencyController {
  static async getCurrencies(req: Request, res: Response) {
    try {
      const response = await CurrencyService.fetchLatestRates();
       sendSuccessResponse({ res, data: response.data });
    } catch (error) {
      const err = error as CustomError;
        sendErrorResponse({
        req,
        res,
        statusCode: err?.statusCode || 400,
        error: err,
      });
    }
  }

  static async convertCurrency(req: Request, res: Response) {
    const { from, to, amount } = req.body;
    try {
      const { result, rate } = await CurrencyService.convertCurrency(
        from,
        to,
        amount
      );
      sendSuccessResponse({ res, data: { result, rate } });
    } catch (error) {
      const err = error as CustomError;
      sendErrorResponse({
        req,
        res,
        statusCode: err?.statusCode || 400,
        error:err,
      });
    }
  }
}
