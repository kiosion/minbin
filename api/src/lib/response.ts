import type { Response } from 'express';

// Common RESTful response templates
export const OK = (res: Response, { data }: { data: unknown }) => {
  return res
    .status(200)
    .header('Access-Control-Allow-Origin', '*')
    .header('Content-Type', 'application/json')
    .send(
      JSON.stringify({
        status: 200,
        data
      })
    );
};

export const ERR = (res: Response, { message = undefined, code = 500 }: { message?: string, code?: number } = {}) => {
  return res
    .status(code ?? 500)
    .header('Access-Control-Allow-Origin', '*')
    .header('Content-Type', 'application/json')
    .send(
      JSON.stringify({
        status: code ?? 500,
        message: message ?? 'Oops, something went wrong'
      })
    );
};
