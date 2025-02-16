import { Helmet } from "react-helmet";

import { Header } from "@/components/global/Header";
import { MarkdownEditor } from "@/components/global/MarkdownEditor";
import { useGetProfile, useUpdateProfile } from "@/hooks/api/profile/useProfile";

const Profile = () => {
    const { profile } = useGetProfile();
    const { updateProfile } = useUpdateProfile();

    const handleProfileSubmit = async (content: string) => {
        try {
            const response = await updateProfile(content);
            console.log(response);
            alert("Successfully Updated");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile content");
        }
    };

    return (
        <div>
            <Helmet>
                <title>Marketing</title>
            </Helmet>
            <Header title="About K-lama" />
            <MarkdownEditor
                initialValue={profile?.about}
                onSubmit={(content) => handleProfileSubmit(content)}
            />
        </div>
    );
};

export default Profile;
