import { initBackButton, initHapticFeedback } from "@telegram-apps/sdk-react";
import { useEffect } from "react";

export default function BackButton() {
    const [backButton] = initBackButton();
    const hapticFeedback = initHapticFeedback();

    useEffect(() => {
        if (backButton) {
            backButton.show();
            const handleClick = () => {
                window.history.back();
                hapticFeedback.impactOccurred('soft');
            };
            backButton.on('click', handleClick);

            return () => {
                backButton.off('click', handleClick);
                backButton.hide();
            };
        }
    }, [backButton]);
}
