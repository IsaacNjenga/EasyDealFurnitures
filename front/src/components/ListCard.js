import { Avatar, Button, Card, Typography } from "antd";
import React from "react";
import { useUser } from "../context/UserContext";

const { Title, Text } = Typography;

function ListCard({ data }) {
  const { isMobile } = useUser();
  return (
    <div>
      {data?.map((d) => (
        <Card key={d._id} style={{ width: "100%", marginBottom: 10 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              {/* avatar */}
              <div style={{}}>
                <Avatar src={d.img} size={isMobile ? 70 : 120} />
              </div>
              {/* name and other descps below */}
              <div style={{}}>
                <div style={{ marginBottom: 0 }}>
                  <Title
                    level={isMobile ? 4 : 3}
                    style={{ marginBottom: 0, fontFamily: "Raleway" }}
                    ellipsis={true}
                  >
                    {d.name}
                  </Title>
                </div>
                <div style={{ marginTop: 0 }}>
                  <Text
                    type="secondary"
                    style={{ fontSize: isMobile ? 16 : 20, marginTop: 0 }}
                  >
                    KES. {d.price.toLocaleString()}
                  </Text>
                </div>
              </div>
            </div>

            {/* action buttons */}
            <div
              style={{
                width: "auto",
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? 7 : 15,
              }}
            >
              <div>
                <Button
                  type="primary"
                  style={{ width: "100%", fontFamily: "Raleway" }}
                >
                  View
                </Button>
              </div>
              <div>
                <Button
                  type="primary"
                  style={{ width: "100%", fontFamily: "Raleway" }}
                  danger
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default ListCard;
