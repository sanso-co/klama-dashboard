import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/api/auth/useAuth";

import { Header } from "@/components/global/Header";
import { Input } from "@/components/global/Input";
import { Button } from "@/components/global/Button";

import styles from "./auth.module.scss";

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const defaultValues = {
        username: "",
        password: "",
    };

    const methods = useForm({ defaultValues });

    const { loginAdmin } = useAuth();

    const onSubmit = async (data: any) => {
        try {
            const isLoggedIn = await loginAdmin(data.username, data.password);
            if (isLoggedIn) {
                navigate(from, { replace: true });
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div>
            <div>
                <Header title="Login" description="List of providers" />
            </div>

            <FormProvider {...methods}>
                <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                    <Input label="Username" name="username" />
                    <Input label="Password" name="password" type="password" />
                    <Button type="submit" label="Save" variant="primary" />
                </form>
            </FormProvider>
        </div>
    );
};

export default Auth;
