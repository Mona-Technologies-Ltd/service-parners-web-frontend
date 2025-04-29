import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ActiveChat from "../components/ActiveChat";
import ChatHistory from "../components/ChatHistory";

// Chat Component
const ChatComponent = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "bot",
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
      time: "6:30 pm",
    },
    {
      sender: "user",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
      time: "6:30 pm",
    },
    {
      sender: "bot",
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
      time: "6:30 pm",
    },
    {
      sender: "user",
      text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
      time: "6:30 pm",
    },
  ]);

  const [activeTab, setActiveTab] = useState("active");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const now = new Date();
    const timeString = now.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    setChatHistory([
      ...chatHistory,
      {
        sender: "user",
        text: message,
        time: timeString.toLowerCase(),
      },
    ]);
    setMessage("");

    // Simulate bot response
    setTimeout(() => {
      const now = new Date();
      const timeString = now.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      setChatHistory((prevChat) => [
        ...prevChat,
        {
          sender: "bot",
          text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,",
          time: timeString.toLowerCase(),
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Header */}
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #eee",
        }}
      >
        <h3 className="mb-4">Chats</h3>
        {/* Tabs */}
        <div style={{ display: "flex", marginTop: "10px" }}>
          <div
            onClick={() => setActiveTab("active")}
            style={{
              marginRight: "30px",
              paddingBottom: "10px",
              borderBottom:
                activeTab === "active" ? "2px solid #0057B8" : "none",
              color: activeTab === "active" ? "#0057B8" : "#888",
              fontWeight: activeTab === "active" ? "500" : "normal",
              cursor: "pointer",
            }}
          >
            Active Chat
          </div>
          <div
            onClick={() => setActiveTab("history")}
            style={{
              paddingBottom: "10px",
              borderBottom:
                activeTab === "history" ? "2px solid #0057B8" : "none",
              color: activeTab === "history" ? "#0057B8" : "#888",
              fontWeight: activeTab === "history" ? "500" : "normal",
              cursor: "pointer",
            }}
          >
            Chat History
          </div>
        </div>
      </div>

      {activeTab === "active" ? (
        <ActiveChat
          chatHistory={chatHistory}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      ) : (
        <ChatHistory />
      )}
    </>
  );
};

const SupportPage = () => {
  // State to track which FAQ item is expanded (0 = first item expanded by default)
  const [expandedItem, setExpandedItem] = useState(null);
  // State to track if all items are collapsed or expanded
  const [allExpanded, setAllExpanded] = useState(false);
  // State to control chat visibility
  const [showChat, setShowChat] = useState(false);

  // Sample FAQ data - replace with actual data
  const faqItems = [
    {
      question: "What is Mona protect experts?",
      answer:
        "We exist to help people get answers to questions they've not found. Either that they cannot ask them or they do not know to frame them, or the answers are not framed well.",
    },
    {
      question: "What is Mona protect all about?",
      answer:
        "Mona protect is a comprehensive service designed to help users secure their digital assets and personal information.",
    },
    {
      question: "What is Mona protect all about?",
      answer:
        "Mona protect is a comprehensive service designed to help users secure their digital assets and personal information.",
    },
    {
      question: "What is Mona protect all about?",
      answer:
        "Mona protect is a comprehensive service designed to help users secure their digital assets and personal information.",
    },
    {
      question: "What is Mona protect all about?",
      answer:
        "Mona protect is a comprehensive service designed to help users secure their digital assets and personal information.",
    },
  ];

  // Toggle FAQ item expansion
  const toggleItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  // Toggle chat visibility
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  // If chat is showing, render the ChatComponent
  if (showChat) {
    return <ChatComponent onClose={() => setShowChat(false)} />;
  }

  return (
    <div style={{ padding: "20px", margin: "0 auto" }}>
      {/* FAQ Header */}
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            fontSize: "28px",
            color: "#1A2E35",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          FAQ
        </h1>
        <p style={{ color: "#666", fontSize: "16px", margin: 0 }}>
          This is list of commonly asked questions and their answers related
        </p>
        <div
          style={{
            padding: "15px 20px",
            backgroundColor: "#D7F0FF",
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            margin: "20px auto 0",
          }}
        >
          <h4 style={{ margin: 0, color: "#38B6FF" }}>
            What is Mona protect experts?
          </h4>
          <p style={{ margin: 0, color: "#666", marginTop: "20px" }}>
            We exist to help people get answers to questions threy've not found.
            Either that they cannot ask them or they do not know to frame them,
            or the answers are not framed well.
          </p>
        </div>
      </div>

      {/* FAQ Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {faqItems.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {/* FAQ Question */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 20px",
                cursor: "pointer",
                backgroundColor: "white",
              }}
              onClick={() => toggleItem(index)}
            >
              <h3
                style={{
                  margin: 0,
                  fontWeight: "500",
                  fontSize: "16px",
                  color:
                    expandedItem === index || expandedItem === "all"
                      ? "#00A3FF"
                      : "#1A2E35",
                }}
              >
                {item.question}
              </h3>
              <span>
                {expandedItem === index || expandedItem === "all" ? (
                  <MdKeyboardArrowUp size={24} color="#888" />
                ) : (
                  <MdKeyboardArrowDown size={24} color="#888" />
                )}
              </span>
            </div>

            {/* FAQ Answer */}
            {(expandedItem === index || expandedItem === "all") && (
              <div
                style={{
                  padding: "15px 20px",
                  backgroundColor: "#F5FAFF",
                }}
              >
                <p style={{ margin: 0, color: "#666" }}>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Support */}
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          display: "flex",
          alignItems: "flex-end",
          gap: "12px",
        }}
      >
        {/* Chat Bubble */}
        <div
          style={{
            backgroundColor: "#0057B8",
            color: "white",
            padding: "12px 24px",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ margin: 0 }}>Hello, how can we help?</p>
        </div>

        {/* Robot Icon */}
        <div
          onClick={toggleChat}
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {/* Hexagon Background */}
          <div
            style={{
              backgroundColor: "rgba(0, 74, 173, 0.08)",
              width: "120px",
              height: "120px",
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
          >
            {/* Outer hexagon ring */}
            <div
              style={{
                backgroundColor: "#DCE8F9",
                width: "110px",
                height: "110px",
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
            >
              {/* Middle hexagon ring */}
              <div
                style={{
                  backgroundColor: "rgba(0, 74, 173, 0.15)",
                  width: "100px",
                  height: "100px",
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                }}
              >
                {/* Inner circle with icon */}
                <div
                  style={{
                    backgroundColor: "#00A3FF",
                    width: "75px",
                    height: "75px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  <img
                    src="/chat.svg"
                    alt="Chat Icon"
                    style={{
                      width: "70px",
                      height: "70px",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
