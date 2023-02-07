import throwUserErrors from './throw-user-errors';
import { customerActivateByUrlMutation } from './mutations';
const handleAccountActivation = async (fetch, input)=>{
    try {
        const { customerActivateByUrl  } = await fetch({
            query: customerActivateByUrlMutation,
            variables: {
                input
            }
        });
        throwUserErrors(customerActivateByUrl === null || customerActivateByUrl === void 0 ? void 0 : customerActivateByUrl.customerUserErrors);
    } catch (error) {}
};
export default handleAccountActivation;
