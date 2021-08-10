import { Button, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthProvider";
import { auth } from "../../firebase/config";

const UserInfoStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 83, 1);

    .username {
        color: white;
        margin-left: 5px;
    }
`;

export default function UserInfo() {
    const {
        user: { displayName, photoURL }
    } = useContext(AuthContext);

    return (
        <UserInfoStyled>
            <div>
                <Avatar src={photoURL}>
                    {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className="username">
                    {displayName}
                </Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>
                Đăng xuất
            </Button>
        </UserInfoStyled>
    );
}
