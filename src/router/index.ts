const requireContext = require('require-context-async');
const path = require('path')

export interface IRouter {
    method: string,
    route: string,
    controller: any,
    action: string,
}

const Routes: Array<IRouter> = [];
requireContext(path.resolve(__dirname, './'), false, /\.router\.ts$/, async (item: any) => {
    let module = await import(item)
    Routes.push(...module);
});

export default Routes;


