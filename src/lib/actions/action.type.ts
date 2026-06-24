export type SuccessActionResult<T = unknown> = {
  success: true;
  data?: T;
};

export type ErrorActionResult = {
  success: false;
  code?: string;
  message?: string;
};

export type ActionResult = SuccessActionResult | ErrorActionResult;
