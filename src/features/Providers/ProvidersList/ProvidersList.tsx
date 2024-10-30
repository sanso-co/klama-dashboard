import { useForm } from "react-hook-form";

import { useGetAllProviders, useUpdateProvider } from "@/hooks/api/provider/useProvider";

import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";

import { ProviderType } from "@/interfaces/provider";

import styles from "./providerslist.module.scss";

export const ProvidersList = () => {
    const { providers, refreshProviders } = useGetAllProviders();
    const { updateProvider } = useUpdateProvider();
    const { register, handleSubmit, getValues } = useForm();

    const onSubmit = (provider: ProviderType) => {
        return async () => {
            const inputValue = getValues(provider.id.toString());
            try {
                const updatedData: ProviderType = {
                    ...provider,
                    display_priority: inputValue,
                };
                await updateProvider(updatedData);
                await refreshProviders();
            } catch (error) {
                console.error(error);
            }
        };
    };

    return (
        <div className={styles.container}>
            {providers &&
                providers.length &&
                providers.map((provider) => (
                    <div key={provider.id} className={styles.item}>
                        <div className={styles.id}>{provider.id}</div>
                        <div className={styles.main}>
                            <div className={styles.names}>
                                <img src={provider.logo_path} alt="" className={styles.logo} />
                                <div className={styles.name}>{provider.name}</div>
                            </div>

                            <div className={styles.action}>
                                <TextInput
                                    name={provider.id.toString()}
                                    register={register}
                                    defaultValue={provider.display_priority}
                                />
                                <Button label="Update" onClick={handleSubmit(onSubmit(provider))} />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};
