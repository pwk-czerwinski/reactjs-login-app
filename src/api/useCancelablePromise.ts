import { useRef, useEffect } from 'react';

/**
 * Prepares cancelable promise.
 * @param promise
 */
const makeCancelable = (promise: Promise<any>) => {
    let isCanceled = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise
            .then((val: any) => (isCanceled ? reject({ isCanceled }) : resolve(val)))
            .catch((error: any) => (isCanceled ? reject({ isCanceled }) : reject(error)));
    });

    return {
        promise: wrappedPromise,
        cancel() {
            isCanceled = true;
        }
    };
}

/**
 * This hook gives possibility to cancel a promise.
 * @param cancelable
 */
const useCancellablePromise = (cancelable = makeCancelable) => {
    const emptyPromise = Promise.resolve(true);

    if (cancelable(emptyPromise).cancel === undefined) {
        throw new Error(
            'promise wrapper argument must provide a cancel() function'
        );
    }

    const promises: any = useRef();

    useEffect(() => {
        promises.current = promises.current || [];

        const cancel = () => {
            promises.current.forEach((p: any) => p.cancel());
            promises.current = [];
        }

        return cancel;
    }, []);

    const cancellablePromise = (p: Promise<any>) => {
        const cPromise = cancelable(p);
        promises.current.push(cPromise);

        return cPromise.promise;
    }

    return { cancellablePromise };
}

export default useCancellablePromise;
