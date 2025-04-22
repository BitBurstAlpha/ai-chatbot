// components/StatusCard.jsx
import React from 'react';

const StatusCardSection = () => {
  // Sample data
  const items = [
    {
      status: 'Open',
      statusColor: 'bg-yellow-400',
      created: '01 Nov 2023 at 23:02',
      name: 'Beatrice Campbell',
      startupType: 'SaaS',
    },
    {
      status: 'Assigned',
      statusColor: 'bg-green-500',
      created: '01 Nov 2023 at 23:02',
      name: 'Rosemary Davidson',
      startupType: 'E-Commerce',
    },
    {
      status: 'Need more info',
      statusColor: 'bg-yellow-400',
      created: '01 Nov 2023 at 23:02',
      name: 'Alan Chavez',
      startupType: 'Agency',
    },
  ];

  return (
    <div className=" text-white p-6 rounded-lg w-full max-w-screen-lg mx-auto bg-background-brand-hovered">
      {/* Header Row */}
      <div className="grid grid-cols-4 gap-4 mb-3 text-gray-400 text-sm">
        <div>Status</div>
        <div>Created</div>
        <div>What is your name?</div>
        <div>Which type of startup do you run?</div>
      </div>

      {/* Data Rows */}
      {items.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-4 py-4 border-t border-gray-800"
        >
          <div className="flex items-center">
            <span
              className={`w-3 h-3 rounded-full ${item.statusColor} mr-2`}
            ></span>
            <span className="text-white">{item.status}</span>
          </div>
          <div className="text-gray-400">{item.created}</div>
          <div className="text-white">{item.name}</div>
          <div className="text-white">{item.startupType}</div>
        </div>
      ))}
    </div>
  );
};

export default StatusCardSection;
