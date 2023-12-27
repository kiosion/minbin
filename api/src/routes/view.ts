import { Paste } from '$app/models/paste';
import { OK, ERR } from '$lib/response';
import type { Request, Response } from 'express';

const GET = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return ERR(res, { message: 'No paste ID provided', code: 400 });
  }

  try {
    const paste = await Paste.findOne({ id });

    if (paste) {
      await Paste.findOneAndUpdate({
        id
      }, {
        $inc: { views: 1 }
      }, {
        new: true,
        upsert: true
      });

      OK(res, { data: {
        id,
        content: paste.value,
        encrypted: paste.encrypted,
        title: paste.id,
        views: paste.views
      }});

      if (paste.burn && paste.views >= 1) {
        await Paste.deleteOne({
          id
        });
      }
    } else {
      ERR(res, { message: 'Paste not found', code: 404 });
    }
  } catch (err: unknown) {
    console.error('[View] Error: ', err);
    ERR(res, { message: 'An error occurred while viewing the paste' });
  }
};

const OPTIONS = async (req: Request, res: Response) => {
  OK(res, { data: {} });
};

export default { GET, OPTIONS };
