/**
 * @zh 异步函数组合器，每个函数都会传入两个参数
 *     shareData：共享所有中间函数返回的结果
 *     next：如果调用这个函数，意味着下个中间件函数会被执行
 * @en to combine function for asynchronous function. every function be pass two params:
 *     shareData which save previous function call result
 *     next function which be invoked mean the next function will be invoked
 */

type IMiddleware<K> = (shareData: K, next: () => void) => Promise<void>;

export function compose<K>(middlewares: IMiddleware<K>[], shareData: K) {
  async function dispatch(index: number) {
    if (index === middlewares.length) return;
    const fn = middlewares[index];
    if (!fn) return Promise.resolve();
    try {
      await fn(shareData, dispatch.bind(null, index + 1));
      return Promise.resolve(shareData);
    } catch (err) {
      throw err;
    }
  }
  return dispatch(0);
}
