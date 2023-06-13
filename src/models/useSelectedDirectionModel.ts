import React from "react";

export default function useSelectedDirectionModel() {
    const [selectedDirectionText, setSelectedDirectionText] = React.useState<number | null>();
    return {
        selectedDirectionText,
        setSelectedDirectionText,
    }
}