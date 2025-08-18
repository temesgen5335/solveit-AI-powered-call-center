"use client";
import "../../styles/globals.css";
import React from "react";
import { Mic, Loader2, Send, Play } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import Button from "../ui/button";
import Textarea from "../ui/textarea";
import { cn } from "../../lib/utils";

const serviceItems = [
  { id: "1", name: "General Inquiry" },
  { id: "2", name: "Technical Support" },
  { id: "3", name: "Billing Question" },
  { id: "4", name: "Account Management" },
];

const UserRequestChannelPanel = ({
  transcript,
  setTranscript,
  isListening,
  isProcessing,
  toggleListening,
  handleSendRequest,
  response,
  responseStatus,
  selectedService,
  setSelectedService,
}) => {
  return (
    <div className="tiles_theme rounded-lg shadow-lg p-6">
      {/* Service Selector */}
      <div className="tiles_theme p-6 rounded-xl border border-gray-300">
        <h2 className="text-lg title mb-3">Service Category</h2>
        <Select onValueChange={setSelectedService} value={selectedService}>
          <SelectTrigger>
            <SelectValue placeholder="Select a service item" />
          </SelectTrigger>
          <SelectContent>
            {serviceItems.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Request Input */}
      <div className="tiles_theme p-6 rounded-xl border border-gray-300 mt-6">
        <h2 className="text-lg title mb-3">Voice Input / Message</h2>
        <Textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={5}
          placeholder="Type your message or record voice..."
        />
        <div className="mt-4 flex justify-between gap-3 flex-wrap">
          <Button
            onClick={toggleListening}
            disabled={isProcessing}
            className={cn(
              "flex items-center gap-2",
              isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
            )}
          >
            <Mic className="w-4 h-4" />
            {isListening ? "Stop" : "Record"}
          </Button>
          {isProcessing && <Loader2 className="w-4 h-4 animate-spin text-gray-500" />}
          <Button
            onClick={handleSendRequest}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit
          </Button>
        </div>
      </div>

      {/* Response Box */}
      <div className="tiles_theme p-6 mt-6 rounded-xl border border-gray-300">
        <h2 className="text-lg title mb-3">AI Response</h2>
        <div className="mb-3 flex items-center gap-2">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              {
                processing: "bg-yellow-100 text-yellow-800",
                completed: "bg-green-100 text-green-800",
                escalated: "bg-red-100 text-red-800",
                idle: "bg-gray-100 text-gray-700",
              }[responseStatus]
            )}
          >
            {responseStatus.charAt(0).toUpperCase() + responseStatus.slice(1)}
          </span>
          {response && (
            <Button variant="ghost" size="sm">
              <Play className="w-4 h-4" />
            </Button>
          )}
        </div>
        <div className="bg-gray-100 p-4 rounded-md min-h-[100px] text-sm text-gray-800 border border-gray-300">
          {response || "Response will appear here..."}
        </div>
      </div>
    </div>
  );
};

export default UserRequestChannelPanel;
