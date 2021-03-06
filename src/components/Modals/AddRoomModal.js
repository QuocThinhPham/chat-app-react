import { Form, Input, Modal } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/services";

export default function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const {
        user: { uid }
    } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        // add new room to firestore
        addDocument("rooms", {
            ...form.getFieldsValue(),
            members: [uid]
        });
        // reset form value
        form.resetFields();
        // close modal
        setIsAddRoomVisible(false);
    };

    const handleCancel = () => {
        // reset form value
        form.resetFields();
        setIsAddRoomVisible(false);
    };

    return (
        <>
            <Modal
                title="Tạo phòng"
                visible={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên phòng" name="name">
                        <Input placeholder="Nhập tên phòng..." />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="desc">
                        <Input.TextArea placeholder="Nhập mô tả..." />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
