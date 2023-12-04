import {
    ChakraProvider,
    Flex,
    Box,
    Text,
    FormControl,
    Input,
    Button,
    Heading,
    VStack,
    HStack,
  } from "@chakra-ui/react";
  import { Send, Check } from "lucide-react";
  import React, { useState, useEffect, useRef } from "react";
  
  const InterviewPage = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const [userAnswer, setUserAnswer] = useState("");
    const [summary, setSummary] = useState("");
    const [subject, setSubject] = useState("Experience in leading cross-functional teams.");
    const chatEndRef = useRef(null);
  
    const handleSendMessage = () => {
      if (userAnswer) {
        const newMessage = {
          id: chatMessages.length + 1,
          message: userAnswer,
          isUser: true,
        };
        setChatMessages([...chatMessages, newMessage]);
        setUserAnswer("");
        updateSummary(userAnswer);
      }
    };
  
    const updateSummary = (answer) => {
      // Logic to update the summary based on the answer
    };
  
    const scrollToBottom = () => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(scrollToBottom, [chatMessages]);
  
    return (
      <ChakraProvider>
        <Flex direction="row" h="100vh" p="4">
          <Box flex="1" overflowY="auto">
            {/* Chat interface */}
          </Box>
          <Box flex="1" ml="4">
            {/* Summary panel */}
          </Box>
        </Flex>
      </ChakraProvider>
    );
  };
  
  export default InterviewPage;