import { Button, Col, Row, Typography } from "antd";
import React from "react";
import firebase, { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";

const GgProvider = new firebase.auth.GoogleAuthProvider();
const FbProvider = new firebase.auth.FacebookAuthProvider();

export default function Login() {
    const handleGgLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(
            GgProvider
        );

        if (additionalUserInfo.isNewUser) {
            addDocument("users", {
                diplayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            });
        }
    };

    const handleFbLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(
            FbProvider
        );

        if (additionalUserInfo.isNewUser) {
            addDocument("users", {
                diplayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            });
        }
    };

    return (
        <Row
            align="middle"
            justify="center"
            style={{ width: "100vw", height: "100vh" }}
        >
            <Col span={8}>
                <Typography.Title style={{ textAlign: "center" }}>
                    Chat App
                </Typography.Title>

                <Button
                    style={{ width: "100%", marginBottom: "10px" }}
                    onClick={handleGgLogin}
                >
                    Đăng nhập bằng Google
                </Button>

                <Button style={{ width: "100%" }} onClick={handleFbLogin}>
                    Đăng nhập bằng Facebook
                </Button>
            </Col>
        </Row>
    );
}
