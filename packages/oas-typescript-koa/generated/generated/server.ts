import Router from '@koa/router';
import bodyParser from '@koa/bodyparser';
import {
  AddPetSecurity,
  UpdatePetSecurity,
  AddPetParameters,
  UpdatePetParameters
} from './client.js';
import { KoaGeneratedUtils } from './utils.js';

import { PetController } from '../controllers/PetController.js';

const router = new Router();

router.use(bodyParser());

router.post(
  '/pet',
  KoaGeneratedUtils.createSecurityMiddleware(AddPetSecurity),
  async (ctx, next) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: AddPetParameters
    });
    if (!parsedRequestInfo) {
      ctx.status = 400;
      return;
    }

    const result = await PetController.addPet(parsedRequestInfo);
    ctx.status = result.status;

    if (result.status > 400) {
      ctx.body = result.error;
    } else {
      ctx.body = result.data;
    }
  }
);

router.put(
  '/pet',
  KoaGeneratedUtils.createSecurityMiddleware(UpdatePetSecurity),
  async (ctx, next) => {
    const parsedRequestInfo = KoaGeneratedUtils.parseRequestInfo({
      ctx,
      oasParameters: UpdatePetParameters
    });
    if (!parsedRequestInfo) {
      ctx.status = 400;
      return;
    }

    const result = await PetController.updatePet(parsedRequestInfo);
    ctx.status = result.status;

    if (result.status > 400) {
      ctx.body = result.error;
    } else {
      ctx.body = result.data;
    }
  }
);

export const generatedRouter = router;
