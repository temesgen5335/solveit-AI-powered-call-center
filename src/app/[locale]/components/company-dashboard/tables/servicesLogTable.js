'use client';

import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, Clock, Search, CalendarDays } from 'lucide-react';
import Input from '../../ui/input';
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
    case 'error':
      return <XCircle className="w-4 h-4 text-red-500" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    default:
      return null;
  }
};

const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'error':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  }
};

const ServicesLogTable = ({ interactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredData = useMemo(() => {
    return interactions.filter((interaction) => {
      const matchesSearch =
        interaction.request.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interaction.response.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || interaction.status === statusFilter;

      const interactionDate = new Date(interaction.timestamp);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const matchesDate =
        (!start || interactionDate >= start) &&
        (!end || interactionDate <= end);

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [interactions, searchTerm, statusFilter, startDate, endDate]);

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full sm:w-[48%]">
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="text"
            placeholder="Search request or response..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>

        {/* Start Date */}
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-40"
          />
        </div>

        {/* End Date */}
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-40"
          />
        </div>
      </div>

      {/* Table */}
      {/* Table */}
<div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
    <thead className="bg-blue-50 dark:bg-blue-900">
      <tr>
        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-white uppercase text-xs tracking-wider">Timestamp</th>
        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-white uppercase text-xs tracking-wider">Request</th>
        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-white uppercase text-xs tracking-wider">Type</th>
        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-white uppercase text-xs tracking-wider">Response</th>
        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-white uppercase text-xs tracking-wider">Status</th>
        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-white uppercase text-xs tracking-wider">Service Category</th>
        <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-white uppercase text-xs tracking-wider">Company</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
      {filteredData.length > 0 ? (
        filteredData.map((interaction) => (
          <tr key={interaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <td className="px-4 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
              {new Date(interaction.timestamp).toLocaleString()}
            </td>
            <td className="px-4 py-4 text-gray-900 dark:text-white max-w-xs truncate">
              {interaction.request}
            </td>
            <td className="px-4 py-4 text-gray-900 dark:text-white max-w-xs truncate">
              {interaction.type}
            </td>
            <td className="px-4 py-4 text-gray-900 dark:text-white max-w-xs truncate">
              {interaction.response || <span className="italic text-gray-400">No response</span>}
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(interaction.status)}`}>
                {getStatusIcon(interaction.status)}
                {interaction.status}
              </span>
            </td>
            <td className="px-4 py-4 text-gray-900 dark:text-white max-w-xs truncate">
              {interaction.servicecategory || <span className="text-gray-400 italic">-</span>}
            </td>
            <td className="px-4 py-4 text-gray-900 dark:text-white max-w-xs truncate">
              {interaction.company || <span className="text-gray-400 italic">-</span>}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7" className="text-center py-6 text-gray-500 dark:text-gray-400">
            No interactions found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default ServicesLogTable;
