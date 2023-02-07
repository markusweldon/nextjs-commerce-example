import { useMemo } from 'react';
import useCheckout from '@vercel/commerce/checkout/use-checkout';
import useSubmitCheckout from './use-submit-checkout';
import { useCheckoutContext } from '@components/checkout/context';
export default useCheckout;
export const handler = {
    fetchOptions: {
        query: '_',
        method: '_'
    },
    useHook: ()=>function useHook() {
            const { cardFields , addressFields  } = useCheckoutContext();
            const submit = useSubmitCheckout();
            // Basic validation - check that at least one field has a value.
            const hasEnteredCard = Object.values(cardFields).some((fieldValue)=>!!fieldValue
            );
            const hasEnteredAddress = Object.values(addressFields).some((fieldValue)=>!!fieldValue
            );
            const response = useMemo(()=>({
                    data: {
                        hasPayment: hasEnteredCard,
                        hasShipping: hasEnteredAddress
                    }
                })
            , [
                hasEnteredCard,
                hasEnteredAddress
            ]);
            return useMemo(()=>Object.create(response, {
                    submit: {
                        get () {
                            return submit;
                        },
                        enumerable: true
                    }
                })
            , [
                submit,
                response
            ]);
        }
};
