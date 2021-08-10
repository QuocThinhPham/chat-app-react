import React, { createContext, useContext, useMemo, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState("");
    const {
        user: { uid }
    } = useContext(AuthContext);

    const roomsCondition = useMemo(() => {
        return {
            fieldName: "members",
            operator: "array-contains",
            compareValue: uid
        };
    }, [uid]);
    const rooms = useFirestore("rooms", roomsCondition);

    const selectedRoom = useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId]
    );

    const membersCondition = useMemo(() => {
        return {
            fieldName: "uid",
            operator: "in",
            compareValue: selectedRoom.members
        };
    }, [selectedRoom.members]);
    const members = useFirestore("users", membersCondition);

    return (
        <AppContext.Provider
            value={{
                rooms,
                members,
                selectedRoom,
                isAddRoomVisible,
                setIsAddRoomVisible,
                isInviteMemberVisible,
                setIsInviteMemberVisible,
                selectedRoomId,
                setSelectedRoomId
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
