import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CardsDisplay = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        async function getCards() {
            const response = await fetch(`http://localhost:5500/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getCards();

        return;
    }, [records.length]);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5500/${id}`, {
            method: "DELETE",
        });

        const newRecords = records.filter((record) => record._id !== id);
        setRecords(newRecords);
    };

    const columns = [
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <Button
                    size="large"
                    shape="circle"
                    danger
                    className="deleteBtn"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record._id)}
                ></Button>
            ),
        },
    ];

    return (
        <div className="tableWrapper">
            <Table
                dataSource={records}
                columns={columns}
                pagination={false}
                rowKey="_id"
            />
        </div>
    );
};

export default CardsDisplay;
