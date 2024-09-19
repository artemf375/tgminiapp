import { useBackButton, initNavigator } from "@telegram-apps/sdk-react";
import { useEffect } from "react";

export default function BackButton() {
    const backButton = useBackButton();

    const navigator = initNavigator('app-navigator-state', {
        hashMode: 'slash',
    });

    useEffect(() => {
        if (backButton) {
            backButton.show();
            const handleClick = () => {
                navigator.attach().then(() => {
                    navigator.back();
                })
            };
            backButton.on('click', handleClick);

            return () => {
                backButton.off('click', handleClick);
            };
        }
    }, [backButton]);
}
