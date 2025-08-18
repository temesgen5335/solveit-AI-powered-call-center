
"use client";
import "../../styles/globals.css"
import React, { useState, useEffect } from "react";
import {
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Mail,
  Phone,
  Upload,
} from "lucide-react";
import Button from "../ui/button";
import Input from "../ui/input";
import { motion, AnimatePresence} from "framer-motion";
import ServicesLogTable from "./tables/servicesLogTable";
import ServicesSpecialistResponseTable from "./tables/servicesSpecialistResponseTable";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../ui/tabs";

const ServiceSettings = () => {
  const [formData, setFormData] = useState({
    topics: [],
    escalationEmail: "",
    escalationPhone: "",
    pdfFiles: [],
  });

  const [newTopic, setNewTopic] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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

  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  const [filteredInteractions, setFilteredInteractions] = useState(interactions);
  const [activeTab, setActiveTab] = useState("main");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      setFormData((prev) => ({ ...prev, topics: [...prev.topics, newTopic.trim()] }));
      setNewTopic("");
    }
  };

  const handleRemoveTopic = (index) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index),
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData((prev) => ({ ...prev, pdfFiles: [...prev.pdfFiles, file] }));
    }
  };

  const handleDateFilterChange = (e) => {
    const { name, value } = e.target;
    setDateFilter((prev) => ({ ...prev, [name]: value }));
  };

  const applyDateFilter = () => {
    if (!dateFilter.startDate || !dateFilter.endDate) {
      setFilteredInteractions(interactions);
      return;
    }
    const filtered = interactions.filter((interaction) => {
      const interactionDate = new Date(interaction.timestamp);
      const startDate = new Date(dateFilter.startDate);
      const endDate = new Date(dateFilter.endDate);
      return interactionDate >= startDate && interactionDate <= endDate;
    });
    setFilteredInteractions(filtered);
  };

  useEffect(() => {
    applyDateFilter();
  }, [dateFilter.startDate, dateFilter.endDate]);

  return (
    <div className="min-h-screen overflow-x-hidden default_bg_theme p-6">
      
      <div className="overflow-x-auto w-full sm:w-[90%] mx-auto">
        <h1 className="text-4xl md:text-5xl title mb-10 flex items-center gap-3">
        Customer Service Admin
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
                <div className="tiles_theme rounded-lg shadow-lg p-6">
                  <h2 className="text-xl title mb-6">Content Manager</h2>
                  <form className="space-y-6">
                    <div>
                      <h2 className="text-md mb-3">Service Topics</h2>
                      <div className="flex gap-2">
                        <Input value={newTopic} onChange={(e) => setNewTopic(e.target.value)} placeholder="Add new topic" />
                        <Button type="button" onClick={handleAddTopic} className="flex items-center gap-2">
                          <Plus className="w-4 h-4" /> Add
                        </Button>
                      </div>
                      <div className="space-y-2 mt-3">
                        {formData.topics.map((topic, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded">
                            <span className="text-sm">{topic}</span>
                            <Button type="button" variant="ghost" onClick={() => handleRemoveTopic(index)} className="text-red-500 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-md mb-3">Q&A Documents</h2>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Drag and drop PDF files here, or click to select files</p>
                        <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" id="pdf-upload" />
                        <label htmlFor="pdf-upload" className="cursor-pointer text-blue-500 hover:text-blue-600">Select files</label>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-md mb-3">Escalation Contacts</h2>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <Input type="email" name="escalationEmail" value={formData.escalationEmail} onChange={handleChange} placeholder="escalation@company.com" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <Input type="tel" name="escalationPhone" value={formData.escalationPhone} onChange={handleChange} placeholder="+200 123-4567" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button type="button" variant="outline" className="flex text-gray-800 items-center gap-2">
                        <RefreshCw className="w-4 h-4" /> Reset
                      </Button>
                      <Button type="submit" className="flex items-center gap-2">
                        <Save className="w-4 h-4" />  Save Changes
                      </Button>
                    </div>
                  </form>
                </div>

                <div className="tiles_theme rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Specialist Response For Pending Request</h2>
                  <ServicesSpecialistResponseTable interactions={interactions} onUpdate={setInteractions} />
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
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    {/* <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                      History
                    </h3> */}
                    <ServicesLogTable interactions={filteredInteractions} />
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

export default ServiceSettings;