import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import _ from "lodash";

import { useAddProvider } from "@/hooks/api/provider/useProvider";

import { ProvidersList } from "@/features/Providers/ProvidersList";
import { Header } from "@/components/global/Header";
import { ImageUpload } from "@/components/global/ImageUpload";
import { TextInput } from "@/components/global/TextInput";
import { Button } from "@/components/global/Button";

import styles from "./provider.module.scss";

const Provider = () => {
    const { register, handleSubmit, reset } = useForm();
    const [logo, setLogo] = useState<string | null>("");

    const { addProvider, isLoading } = useAddProvider();

    // CREATE A NEW PROVIDER
    const handleCreate = (data: FieldValues) => {
        if (!logo) {
            return;
        }

        addProvider({
            id: parseInt(data.id),
            name: data.name,
            logo_path: logo,
            display_priority: 999,
        });

        reset();
        setLogo("");
    };

    return (
        <div className={styles.container}>
            <Header title="Provider" primaryDescription="List of providers" />
            <div className={styles.create}>
                <h2 className={styles.listHeader}>Create New</h2>
                <form onSubmit={handleSubmit(handleCreate)}>
                    <div className={styles.input}>
                        <ImageUpload
                            width={100}
                            placeholderLabel="upload"
                            image={logo}
                            onImageSelect={(image) => setLogo(image)}
                        />
                        <TextInput placeholder="Id" name="id" variant="sm" register={register} />
                        <TextInput
                            placeholder="Name"
                            name="name"
                            variant="sm"
                            register={register}
                        />
                    </div>
                    <Button variant="secondary" disabled={isLoading}>
                        Create
                    </Button>
                </form>
            </div>
            <ProvidersList />
        </div>
    );
};

export default Provider;
