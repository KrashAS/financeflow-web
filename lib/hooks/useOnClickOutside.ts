import { RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
    reference: RefObject<T>,
    callback: (event: Event) => void,
    ignoreClass?: string
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const shouldIgnore =
                ignoreClass &&
                event.target instanceof Element &&
                event.target.closest(`.${ignoreClass}`);

            if (
                reference.current &&
                !reference.current.contains(event.target as Node) &&
                !shouldIgnore
            ) {
                callback(event);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [reference, callback, ignoreClass]);
};

export default useOnClickOutside;
