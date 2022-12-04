import crypto from 'crypto';
import { Paste } from '$app/models/paste';
import { OK, ERR } from '$lib/response';
import type { Request, Response } from 'express';

const POST = async (req: Request, res: Response) => {
  const { value, encrypt = true, burn = false } = req.body;

  const id = crypto.randomBytes(16).toString('hex');

  try {
    await Paste.create({
      id,
      views: 0,
      encrypted: encrypt,
      burn,
      value
    });
    OK(res, { data: { id } });
  } catch (err: unknown) {
    console.error('[Save] Error: ', err);
    ERR(res, { message: 'An error occurred while saving the paste' });
  }
};

export default { POST };
