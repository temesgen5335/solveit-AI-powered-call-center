'use client';
import "../../../styles/globals.css";
import React, { useState, useMemo } from 'react';
import Textarea from '../../ui/textarea';
import Button from '../../ui/button';
import Input from '../../ui/input';
import {
  CheckCircle2,
  Clock,
  XCircle,
  Check,
  Search,
  CalendarDays,
} from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../ui/select';

const getStatusIcon = (status) => {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'error':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return null;
  }
};

const RequestSpecialistResponseTable = ({ interactions, onUpdate }) => {
  const [responses, setResponses] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredData = useMemo(() => {
    return interactions
      .filter((item) => item.status !== 'success')
      .filter((item) => {
        const matchesSearch =
          item.request.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.response.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === 'all' || item.status === statusFilter;

        const interactionDate = new Date(item.timestamp);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        const matchesDate =
          (!start || interactionDate >= start) && (!end || interactionDate <= end);

        return matchesSearch && matchesStatus && matchesDate;
      });
  }, [interactions, searchTerm, statusFilter, startDate, endDate]);

  const handleChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (id) => {
    const updated = interactions.map((item) =>
      item.id === id
        ? {
            ...item,
            response: responses[id] || item.response,
            status: 'success',
          }
        : item
    );
    onUpdate(updated);
    setResponses((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
        <div className="flex items-center gap-2 w-full md:w-[45%]">
          <Search className="w-4 h-4 text-gray-500 " />
          <Input
            type="text"
            placeholder="Search request or response..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-40"
          />
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-40"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-blue-50 dark:bg-blue-900">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Request</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Type</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Service Category</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase text-xs tracking-wider">Response Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50  transition">
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-900 max-w-xs truncate">
                    {item.request || '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {item.type || '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {item.servicecategory || '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    <div className="space-y-2">
                      waiting...
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No pending requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestSpecialistResponseTable;
