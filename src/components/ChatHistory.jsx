import React from "react";

const ChatHistory = () => {
  return (
    <div
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 150px)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <img src="/nochat.svg" alt="No chat" />
      <p
        style={{
          fontSize: "24px",
          color: "#333",
          fontWeight: "500",
          margin: 0,
        }}
      >
        Nothing to see here for now
      </p>
    </div>
  );
};

export default ChatHistory;
