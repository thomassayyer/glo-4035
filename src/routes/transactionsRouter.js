import koaRouter from 'koa-router';
import TransactionManager from '../Manager/Transaction';
import Dispatcher from '../Dispatcher';

const router = new koaRouter();

router.get('/transactions', async ctx => {
  ctx.body = await TransactionManager.getAll();
});

router.post('/transactions', async ctx => {
  const payload = ctx.request.body;
  const result = await Dispatcher.filter(payload);
  if (result === 'transaction') ctx.body = await Dispatcher.createTransaction(payload);
  else ctx.status = 400;
});

router.delete('/transactions', async ctx => {
  const payload = ctx.request.body;
  const result = await TransactionManager.remove(payload);
  if(result.status === 1) {
    ctx.status = 401;
  }
  ctx.body = result;
});

export {
  router,
}