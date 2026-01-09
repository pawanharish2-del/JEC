import React, { useState } from 'react';
// Import the data functions from the library
import { Country, State, City } from 'country-state-city';

const LocationSelector = () => {
  // These variables store what the user has selected
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // 1. Get the list of all countries immediately
  const countries = Country.getAllCountries();

  // 2. Get states specifically for the selected country
  // We check 'if selectedCountry exists, get its states, else return empty list'
  const states = selectedCountry 
    ? State.getStatesOfCountry(selectedCountry) 
    : [];

  // 3. Get cities specifically for the selected state
  const cities = selectedState 
    ? City.getCitiesOfState(selectedCountry, selectedState) 
    : [];

  return (
    <div className="location-selector-container">
      <h3>Select Your Location</h3>

      {/* --- Country Dropdown --- */}
      <div style={{ marginBottom: '15px' }}>
        <label>Country:</label> <br />
        <select 
          value={selectedCountry} 
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedState(''); // Reset state when country changes
            setSelectedCity('');  // Reset city when country changes
          }}
          style={{ padding: '8px', width: '100%' }}
        >
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            // We use the 'isoCode' (like "IN" for India) to track selection
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* --- State Dropdown --- */}
      <div style={{ marginBottom: '15px' }}>
        <label>State:</label> <br />
        <select 
          value={selectedState} 
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity(''); // Reset city when state changes
          }}
          // Disable this dropdown if no country is selected
          disabled={!selectedCountry}
          style={{ padding: '8px', width: '100%' }}
        >
          <option value="">-- Select State --</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {/* --- City Dropdown --- */}
      <div style={{ marginBottom: '15px' }}>
        <label>City:</label> <br />
        <select 
          value={selectedCity} 
          onChange={(e) => setSelectedCity(e.target.value)}
          // Disable this dropdown if no state is selected
          disabled={!selectedState}
          style={{ padding: '8px', width: '100%' }}
        >
          <option value="">-- Select City --</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* Debug View: Just to show you what is selected */}
      <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
        <strong>You Selected:</strong> <br/>
        Country Code: {selectedCountry} <br/>
        State Code: {selectedState} <br/>
        City: {selectedCity}
      </div>
    </div>
  );
};

export default LocationSelector;