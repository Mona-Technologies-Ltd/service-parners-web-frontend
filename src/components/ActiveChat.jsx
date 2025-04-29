import React from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import { BsPaperclip, BsThreeDotsVertical } from "react-icons/bs";

const ActiveChat = ({ chatHistory, message, setMessage, sendMessage }) => {
  return (
    <>
      {/* Active Chat Messages - Scrollable Area */}
      <div
        style={{
          flex: "1",
          overflowY: "auto",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          height: "calc(100vh - 150px)",
        }}
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: chat.sender === "bot" ? "flex-end" : "flex-start",
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                width: "40%",
                padding: "15px",
                backgroundColor: chat.sender === "bot" ? "#0057B8" : "#F5F5F5",
                color: chat.sender === "bot" ? "#fff" : "#333",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              <p style={{ margin: 0 }}>{chat.text}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "5px",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: chat.sender === "bot" ? "#f0f0f0" : "#888",
                  }}
                >
                  {chat.time}
                </span>
                <BsThreeDotsVertical
                  size={14}
                  color={chat.sender === "bot" ? "#f0f0f0" : "#888"}
                />
              </div>
            </div>
            {chat.sender === "user" && (
              <img
                src="/chatrobo.svg"
                alt="User Avatar"
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div
        style={{
          borderTop: "1px solid #eee",
          padding: "15px 20px",
          backgroundColor: "#fff",
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <form
          onSubmit={sendMessage}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#888",
            }}
          >
            <FaMicrophone size={20} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write message"
            style={{
              flex: 1,
              padding: "12px 15px",
              border: "none",
              outline: "none",
              fontSize: "16px",
            }}
          />
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#888",
            }}
          >
            <BsPaperclip size={20} />
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "#0057B8",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "8px 15px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>Send</span>
            <FaPaperPlane size={14} />
          </button>
        </form>
      </div>
    </>
  );
};

export default ActiveChat;
