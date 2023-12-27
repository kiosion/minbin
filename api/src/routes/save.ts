import crypto from 'crypto';
import { Paste } from '$app/models/paste';
import { OK, ERR } from '$lib/response';
import type { Request, Response } from 'express';

const POST = async (req: Request, res: Response) => {
  const { content, encrypted = false, burn = false } = req?.body ?? {},
    id = crypto.randomBytes(8).toString('hex');

  try {
    const data = {
      id,
      views: 0,
      encrypted,
      burn,
      value: content ?? ''
    };
    await Paste.create(data);
    OK(res, { data: {
      id,
      value: content,
      encrypted,
      burn,
      views: 0
    } });
  } catch (err: unknown) {
    console.error('[Save] Error: ', err);
    ERR(res, { message: 'An error occurred while saving the paste' });
  }
};

const OPTIONS = async (req: Request, res: Response) => {
  OK(res, { data: {} });
};

export default { POST, OPTIONS };
