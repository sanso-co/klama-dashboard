import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LeanShowType } from "@/types/show";

interface Props {
    shows: LeanShowType[];
    page: number;
    setPage: (page: number) => void;
    setShows: (shows: LeanShowType[]) => void;
    appendShows: (newShows: LeanShowType[]) => void;
    resetCategory: () => void;
}

export const useShowStore = create<Props>()(
    devtools(
        (set) => ({
            shows: [],
            page: 1,
            setPage: (page) => set({ page }),
            setShows: (shows) => set({ shows }),
            appendShows: (newShows) =>
                set((state) => ({
                    shows: [...state.shows, ...newShows],
                })),
            resetCategory: () => set({ shows: [], page: 1 }),
        }),
        {
            name: "ShowStore",
        }
    )
);
