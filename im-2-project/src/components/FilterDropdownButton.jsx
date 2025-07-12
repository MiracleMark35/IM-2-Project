import React, { useState } from "react";
import "./FilterDropdownButton.css";

const sortOptions = ["Relevance", "price: low to high", "high to low"];
const transmissionOptions = ["Manual", "Automatic"];
const ecoOptions = ["electric", "hybrid"];
const seatOptions = ["4", "5", "6", "7", "8 or more"];

export default function FilterDropdownButton({
  filters,
  setFilters,
  onApply,
  appliedCount = 0,
}) {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters || {
  sortBy: "Relevance",
  transmission: "",
  eco: "",
  seats: "",
});

  // Reset a single filter
  const resetFilter = (key) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: key === "eco" ? "" : (key === "paymentStatus" ? "Relevance" : "Any"),
    }));
  };

  // Reset all filters
  const resetAll = () => {
    setLocalFilters({
      paymentStatus: "Relevance",
      transmission: "Any",
      eco: "",
    });
  };

  // Apply filters
  const handleApply = () => {
    setOpen(false);
    setFilters(localFilters);
    if (onApply) onApply(localFilters);
  };

  // Modal close on background click
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("filter-modal-backdrop")) setOpen(false);
  };

  return (
    <>
      <button
        className="filter-dropdown-btn"
        onClick={() => setOpen(true)}
        type="button"
      >
        ALL FILTERS
        <span className="filter-dropdown-arrow">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path d="M6 8l4 4 4-4" stroke="#d2a14d" strokeWidth="2" fill="none" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="filter-modal-backdrop" onClick={handleBackdropClick}>
          <div className="filter-modal">
            <div className="filter-modal-title">Sort by:</div>

            <div className="filter-group">
            <div className="filter-label-row">
                <span>Sort by</span>
                <button className="filter-reset" onClick={() => resetFilter("sortBy")}>Reset</button>
            </div>
            <div className="filter-select-wrapper">
                <select
                value={localFilters.sortBy}
                onChange={e =>
                    setLocalFilters(f => ({ ...f, sortBy: e.target.value }))
                }
                >
                {sortOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
                </select>
                <span className="filter-select-arrow">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M6 8l4 4 4-4" stroke="#fff" strokeWidth="2" fill="none" />
                </svg>
                </span>
            </div>
            </div>

            <div className="filter-group">
            <div className="filter-label-row">
                <span>Transmission</span>
                <button className="filter-reset" onClick={() => resetFilter("transmission")}>Reset</button>
            </div>
            <div className="filter-select-wrapper">
                <select
                value={localFilters.transmission}
                onChange={e =>
                    setLocalFilters(f => ({ ...f, transmission: e.target.value }))
                }
                >
                <option value="">Any</option>
                {transmissionOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
                </select>
                <span className="filter-select-arrow">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M6 8l4 4 4-4" stroke="#fff" strokeWidth="2" fill="none" />
                </svg>
                </span>
            </div>
            </div>

            <div className="filter-group">
            <div className="filter-label-row">
                <span>Eco friendly</span>
                <button className="filter-reset" onClick={() => resetFilter("eco")}>Reset</button>
            </div>
            <div className="filter-eco-options">
                {ecoOptions.map(opt => (
                <button
                    key={opt}
                    className={
                    "filter-eco-btn" +
                    (localFilters.eco === opt ? " selected" : "")
                    }
                    onClick={() =>
                    setLocalFilters(f => ({
                        ...f,
                        eco: f.eco === opt ? "" : opt,
                    }))
                    }
                >
                    {localFilters.eco === opt && (
                    <span className="filter-eco-check">✓</span>
                    )}
                    {opt}
                </button>
                ))}
            </div>
            </div>

            <div className="filter-group">
            <div className="filter-label-row">
                <span>Number of seats</span>
                <button className="filter-reset" onClick={() => resetFilter("seats")}>Reset</button>
            </div>
            <div className="filter-select-wrapper">
                <select
                value={localFilters.seats}
                onChange={e =>
                    setLocalFilters(f => ({ ...f, seats: e.target.value }))
                }
                >
                <option value="">Any</option>
                {seatOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
                </select>
                <span className="filter-select-arrow">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M6 8l4 4 4-4" stroke="#fff" strokeWidth="2" fill="none" />
                </svg>
                </span>
            </div>
            </div>

            <div className="filter-modal-actions">
              <button className="filter-reset-all" onClick={resetAll}>
                Reset All
              </button>
              <button className="filter-apply" onClick={handleApply}>
                Apply Filters
                {appliedCount > 0 && (
                  <span className="filter-apply-count">({appliedCount})</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
