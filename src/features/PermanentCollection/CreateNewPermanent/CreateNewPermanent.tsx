import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";
import { useCreatePermanent } from "@/hooks/api/collection/usePermanentCollection";

interface Props {
    onSuccess: (id: string) => void;
}

export const CreateNewPermanent = ({ onSuccess }: Props) => {
    const { createPermanent, isLoading, error } = useCreatePermanent();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await createPermanent({
                name: data.name,
                description: data.description,
            });
            onSuccess(response._id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput label="Name" name="name" register={register} />
            <TextInput label="Description" name="description" register={register} />
            {error && <p>{error.message}</p>}
            <Button label="Create" disabled={isLoading} />
        </form>
    );
};
