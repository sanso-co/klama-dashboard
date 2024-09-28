import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { Button } from "@/components/global/Button";
import { TextInput } from "@/components/global/TextInput";
import { useGetAiRecommendations } from "@/hooks/api/collection/useAiRecommendations";

const OpenAIRecommendations = () => {
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { sendPrompt } = useGetAiRecommendations();

    const onSubmit = async (data: FieldValues) => {
        try {
            await sendPrompt(data.name);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput label="Name" name="name" register={register} />
                <Button label="Create" disabled={isLoading} />
            </form>
        </div>
    );
};

export default OpenAIRecommendations;
