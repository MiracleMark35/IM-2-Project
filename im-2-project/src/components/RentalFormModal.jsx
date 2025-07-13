import '../styles/RentalFormModal.css';

export default function RentalFormModal({ vehicle, isOpen, onClose, selectedDateRange }) {
  if (!isOpen || !vehicle) return null;

  // Helper function to convert "MM/DD" to "YYYY-MM-DD" format
  const formatToYyyyMmDd = (mmDdStr) => {
    if (!mmDdStr) return '';
    const currentYear = new Date().getFullYear(); // Assumes the current year
    const [month, day] = mmDdStr.split('/');
    return `${currentYear}-${month}-${day}`;
  };

  // Parse the date range string
  const [startDateStr, endDateStr] = selectedDateRange ? selectedDateRange.split(' - ') : ['', ''];
  const pickupDateValue = formatToYyyyMmDd(startDateStr);
  const returnDateValue = formatToYyyyMmDd(endDateStr);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>

        <h2 className="modal-title">Rent {vehicle.name}</h2>

        <form className="rental-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone #</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Vehicle</label>
            <input
              type="text"
              value={vehicle.name}
              readOnly
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Pick-up Location</label>
            <input
              type="text"
              placeholder="Enter location"
              className="form-input"
            />
          </div>

          <div className="form-group form-grid">
            <div>
              <label className="form-label">Pick-up Date</label>
              <input
                type="date"
                className="form-input"
                defaultValue={pickupDateValue}
              />
            </div>
            <div>
              <label className="form-label">Return Date</label>
              <input
                type="date"
                className="form-input"
                defaultValue={returnDateValue}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Attach Required Documents</label>
            <div className="file-upload-group">
              <input
                type="file"
                className="form-input-file"
                accept="image/*,application/pdf"
              />
              <input
                type="file"
                className="form-input-file"
                accept="image/*,application/pdf"
              />
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
