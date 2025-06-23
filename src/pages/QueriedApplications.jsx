import React, { useState } from "react";

const QueriedApplications = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="query-container">
      <h4 className="title">Queried Applications</h4>
      <div className="filters">
        <label className="filter-label">Filter by:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="calendar-input"
        />
        <select className="dropdown">
          <option>Status</option>
          <option value=''>Queried</option>
          <option value=''>Closed</option>
        </select>
        <input type="text" className="search-box" placeholder="Search" />
      </div>
    </div>
  );
};

export default QueriedApplications;
