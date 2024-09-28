import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

//api
import useSearch from "../../../hooks/api/useSearch";

//ui
import { TextInput } from "../../../components/global/TextInput";
import { Button } from "../../../components/global/Button";
import Search from "../../../components/pages/collection/Search";
import { Grid } from "../../../components/global/containers/Grid";
import { DramaCard } from "../../../components/global/cards/DramaCard";
import { Show } from "../../../interfaces/show";

interface Props {
    group: boolean;
    onSubmit: (data: any) => void;
}

const Create = ({ group, onSubmit }: Props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [valid, setValid] = useState(false);
    const [added, setAdded] = useState<Show[]>([]);
    const { data } = useSearch(searchTerm);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const handleFormSubmit = (data: FieldValues) => {
        if (data.releaseDate && added.length > 9) {
            setValid(true);

            const collection = {
                ...data,
                shows: added,
            };
            onSubmit(collection);
            reset();
        }
    };

    const onShowClick = (show: Show) => {
        const newAdded = [...added, show];
        setAdded(newAdded);
    };

    const onShowRemove = (id: number) => {
        const newAdded = added.filter((show) => show.id !== id);
        setAdded(newAdded);
    };

    return (
        <>
            <TextInput
                label="Add Release Date"
                name="releaseDate"
                register={register}
                type="date"
            />
            {/* <TextInput label="Add Release Period" name="releaseDate" register={register} /> */}
            <div>
                <h3>Shows</h3>
                <ul>
                    {added.map((show) => (
                        <li key={show.id} onClick={() => onShowRemove(show.id)}>
                            {show.name}
                        </li>
                    ))}
                </ul>
                <Button label="Create" onClick={handleSubmit(handleFormSubmit)} />
            </div>
            <Search onSearch={(search) => setSearchTerm(search)} />
            <Grid col={6}>
                {data?.map((show) => (
                    <div key={show.id} onClick={() => onShowClick(show)}>
                        <DramaCard show={show} />
                    </div>
                ))}
            </Grid>
        </>
    );
};

export default Create;
