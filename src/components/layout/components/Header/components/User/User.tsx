// import { Link, useNavigate } from "react-router-dom";
// import { useGeneralStore } from "@/store/useStore";
// import { useAuthStore } from "@/store/useAuthStore";
// import { UserIcon } from "@/assets/icons/UserIcon";

import styles from "./user.module.scss";

interface Props {
    isUserMenuOpen: boolean;
    setIsUserMenuOpen: (isOpen: boolean) => void;
    userRef: React.RefObject<HTMLDivElement>;
}

export const User = ({ userRef, isUserMenuOpen, setIsUserMenuOpen }: Props) => {
    // const navigate = useNavigate();
    // const store = useGeneralStore();
    // const { user, logout } = useAuthStore();

    const handleUserClick = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    // const goToLogin = () => {
    //     navigate("/login");
    // };

    // const goToProfile = () => {
    //     navigate(`/profile/${user?.username}`);
    //     setIsUserMenuOpen(false);
    // };

    // const handleLogout = () => {
    //     logout();
    //     setIsUserMenuOpen(false);
    // };

    return (
        <div className={styles.avatar} ref={userRef}>
            <div className={styles.user} onClick={handleUserClick}>
                <div className={styles.avatar}>A</div>
            </div>

            <div className={`${styles.dropdown} ${isUserMenuOpen ? styles.dropdownOpen : ""}`}>
                <div className={styles.menuContent}>
                    <div className={styles.info}>
                        <div className={styles.avatar}></div>
                        <div>Admin</div>
                    </div>
                    <div className={styles.menu}>
                        <div className={styles.menuItem}>Profile</div>
                        <div className={styles.menuItem}>Logout</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
