import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Tooltip, Alert } from "antd";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";
import useFirestore from "../../hooks/useFirestore";
import Message from "./Message";

const WrapperStyled = styled.div`
    height: 100vh;
`;

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 57px;
    padding: 0 16px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);

    .header {
        &-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &-title {
            margin: 0;
            font-weight: bold;
        }
        &-desc {
            font-size: 12px;
        }
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;

const ContentStyled = styled.div`
    height: calc(100vh - 57px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 11px;
`;

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`;

export default function ChatWindow() {
    const { selectedRoom, members, setIsInviteMemberVisible } =
        useContext(AppContext);
    const {
        user: { uid, photoURL, displayName }
    } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState("");
    const [form] = Form.useForm();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleOnSubmit = () => {
        addDocument("messages", {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName
        });
        form.resetFields(["message"]);
    };

    const messagesCondition = useMemo(
        () => ({
            fieldName: "roomId",
            operator: "==",
            compareValue: selectedRoom.id
        }),
        [selectedRoom.id]
    );
    const messages = useFirestore("messages", messagesCondition);

    return (
        <WrapperStyled>
            {selectedRoom.id ? (
                <>
                    <HeaderStyled>
                        <div className="header-info">
                            <p className="header-title">{selectedRoom.name}</p>
                            <span className="header-desc">
                                {selectedRoom.desc}
                            </span>
                        </div>
                        <ButtonGroupStyled>
                            <Button
                                type="text"
                                icon={<UserAddOutlined />}
                                onClick={() => setIsInviteMemberVisible(true)}
                            >
                                Mời
                            </Button>
                            <Avatar.Group size="small" maxCount={2}>
                                {members.map((member) => {
                                    const { uid, displayName, photoURL } =
                                        member;
                                    return (
                                        <Tooltip key={uid} title={displayName}>
                                            <Avatar src={photoURL}>
                                                {photoURL
                                                    ? ""
                                                    : displayName
                                                          ?.charAt(0)
                                                          ?.toUpperCase()}
                                            </Avatar>
                                        </Tooltip>
                                    );
                                })}
                            </Avatar.Group>
                        </ButtonGroupStyled>
                    </HeaderStyled>
                    <ContentStyled>
                        <MessageListStyled>
                            {messages.map((message) => (
                                <Message
                                    key={message.id}
                                    text={message.text}
                                    photoURL={message.photoURL}
                                    displayName={message.displayName}
                                    createdAt={message.createdAt}
                                />
                            ))}
                        </MessageListStyled>
                        <FormStyled form={form}>
                            <Form.Item name="message">
                                <Input
                                    onChange={handleInputChange}
                                    onPressEnter={handleOnSubmit}
                                    placeholder="Nhập tin nhắn..."
                                    bordered={false}
                                    autoComplete="off"
                                />
                            </Form.Item>
                            <Button type="primary" onClick={handleOnSubmit}>
                                Gửi
                            </Button>
                        </FormStyled>
                    </ContentStyled>
                </>
            ) : (
                <Alert
                    message="Hãy chọn phòng"
                    type="info"
                    style={{ margin: 10 }}
                    showIcon
                    closable
                />
            )}
        </WrapperStyled>
    );
}
