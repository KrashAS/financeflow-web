import { RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = (
    reference: RefObject<HTMLElement | null>,
    callback: (event: Event) => void,
    options?: {
        ignoreClass?: string;
        ignoreRefs?: RefObject<HTMLElement | null>[];
    }
) => {
    useEffect(() => {
        const handler = (event: Event) => {
            const target = event.target as Node;

            const clickedInsideRef =
                reference.current && reference.current.contains(target);

            const clickedInsideIgnoreRef = options?.ignoreRefs?.some(
                (ref) => ref.current && ref.current.contains(target)
            );

            const clickedInsideIgnoreClass =
                options?.ignoreClass &&
                target instanceof Element &&
                target.closest(`.${options.ignoreClass}`);

            if (
                !clickedInsideRef &&
                !clickedInsideIgnoreRef &&
                !clickedInsideIgnoreClass
            ) {
                callback(event);
            }
        };

        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [reference, callback, options]);
};

export default useOnClickOutside;
