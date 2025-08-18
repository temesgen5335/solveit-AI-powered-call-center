"use client";
import "../../styles/globals.css";

import React, { useState, useRef, useEffect } from "react";
import { Mic, FileText, Loader2, Play, Send } from "lucide-react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../ui/tabs";

import { toast } from "react-hot-toast";
import RequestLogTable from "./tables/requestLogTable";
import RequestSpecialistResponseTable from "./tables/requestSpecialistResponseTable";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import UserRequestChannelPanel from './userRequestChannelPanel'; // adjust path if needed
const serviceItems = [
  { id: "1", name: "General Inquiry" },
  { id: "2", name: "Technical Support" },
  { id: "3", name: "Billing Question" },
  { id: "4", name: "Account Management" },
];

const Transcriber = () => {
  const [interactions, setInteractions] = useState([
    {
      id: 1,
      type: "Voice",
      timestamp: "2024-03-15",
      request: "What are your business hours?",
      response: "Our business hours are Monday to Friday, 9 AM to 5 PM EST.",
      servicecategory: "Telecom Egypt FAQs",
      company: "Solvit,LLC",
      status: "success",
      service: "Business related",
    },
    {
      id: 2,
      type: "Text",
      timestamp: "2025-03-15",
      request: "How do I reset my password?",
      response: "",
      servicecategory: "Telecom Egypt FAQs",
      company: "Solvit,LLC",
      status: "pending",
      service: "Account Support",
    },
    {
      id: 3,
      type: "Voice",
      timestamp: "2025-03-16",
      request: "What are your business hours?",
      response: "",
      servicecategory: "Telecom Egypt FAQs",
      company: "Solvit,LLC",
      status: "error",
      service: "Business Hours",
    },
    {
      id: 4,
      type: "Text",
      timestamp: "2025-03-16",
      request: "How do I reset my password?",
      response: "To reset your password, please visit our password reset page.",
      servicecategory: "Telecom Egypt FAQs",
      company: "Solvit,LLC",
      status: "success",
      service: "Account management",
    },
  ]);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [response, setResponse] = useState("");
  const [responseStatus, setResponseStatus] = useState("idle");
  const [activeTab, setActiveTab] = useState("main");

  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const toggleListening = () => {
    if (isListening) {
      mediaRecorderRef.current?.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      setIsListening(false);
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaStreamRef.current = stream;
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.ondataavailable = () => {
            setTranscript("Transcribing...");
          };
          mediaRecorderRef.current.start();
          setIsListening(true);
        })
        .catch(() => toast.error("Could not access microphone."));
    }
  };

  const handleSendRequest = () => {
    if (!transcript.trim()) {
      toast.error("Please enter a message or use voice input");
      return;
    }

    setIsProcessing(true);
    setResponseStatus("processing");

    setTimeout(() => {
      const fakeResponse = "This is a sample response from the AI assistant.";
      const isPending = Math.random() < 0.5;
      const status = isPending ? "pending" : "success";
      const serviceName =
        serviceItems.find((s) => s.id === selectedService)?.name || "Uncategorized";

      const newInteraction = {
        id: Date.now(),
        type: transcript.length > 20 ? "Text" : "Voice",
        timestamp: new Date().toISOString().split("T")[0],
        request: transcript,
        response: fakeResponse,
        status,
        service: serviceName,
      };

      setInteractions((prev) => [newInteraction, ...prev]);
      setResponse(fakeResponse);
      setResponseStatus(isPending ? "idle" : "completed");
      setIsProcessing(false);
      setTranscript("");
    }, 2000);
  };

  const pendingInteractions = interactions.filter((i) => i.status === "pending");
  const filteredInteractions = interactions;

  return (
    <div className="min-h-screen default_bg_theme p-6">
      <div className="overflow-x-auto w-full sm:w-[90%] mx-auto">
        <h1 className="text-4xl md:text-5xl title mb-10 flex items-center gap-3">
          AI Voice Assistant Console
        </h1>
        <Tabs defaultValue="main" value={activeTab} onValueChange={setActiveTab} className=" w-full">
          <TabsList className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl grid grid-cols-2 mb-8">
            <TabsTrigger
              value="main"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700
                        dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-white
                        px-4 font-semibold rounded-lg transition-colors"
            >
              Main
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700
                        dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-white
                        px-4 font-semibold rounded-lg transition-colors"
            >
              History
            </TabsTrigger>
          </TabsList>
  
          <AnimatePresence mode="wait">
            {activeTab === "main" && (
              <TabsContent
                value="main"
                className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-6"
                forceMount
              >
                {/* Left Panel */}
                <UserRequestChannelPanel
                  transcript={transcript}
                  setTranscript={setTranscript}
                  isListening={isListening}
                  isProcessing={isProcessing}
                  toggleListening={toggleListening}
                  handleSendRequest={handleSendRequest}
                  response={response}
                  responseStatus={responseStatus}
                  selectedService={selectedService}
                  setSelectedService={setSelectedService}
                />

  
                {/* Right Panel (Pending Specialist Responses) */}
                <div className="tiles_theme rounded-lg shadow-lg p-6">
                  <h2 className="text-xl title mb-6">
                    Specialist Response For Pending Request
                  </h2>
                  <RequestSpecialistResponseTable interactions={interactions} onUpdate={setInteractions} />
                </div>
              </TabsContent>
            )}
  
            {activeTab === "history" && (
              <TabsContent value="history" forceMount>
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="tiles_theme p-4 rounded-xl border border-gray-200">
                    <h3 className="text-xl title mb-4">
                      Interaction History
                    </h3>
                    <RequestLogTable interactions={filteredInteractions} />
                  </div>
                </motion.div>
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};  

export default Transcriber;
