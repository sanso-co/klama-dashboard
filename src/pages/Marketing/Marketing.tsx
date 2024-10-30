import { Helmet } from "react-helmet";

import { Hero } from "@/features/Marketing/Hero";
import { Header } from "@/components/global/Header";

const Marketing = () => {
    return (
        <div>
            <Helmet>
                <title>Marketing</title>
            </Helmet>
            <Header title="Marketing Elements" />
            <Hero />
        </div>
    );
};

export default Marketing;
