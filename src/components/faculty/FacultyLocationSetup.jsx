// src/components/faculty/FacultyLocationSetup.jsx
import { useState, useEffect } from "react";
import { Card, Title, Button, Input, Select, Badge } from "../common";
import { AppState } from "../../AppState";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function FacultyLocationSetup({ faculty, onComplete }) {
  const [location, setLocation] = useState({
    block: "",
    floor: "",
    roomNumber: "",
    cabinLocation: "",
    buildingName: "",
    landmark: ""
  });
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const blockOptions = [
    { value: "Academic Block A", label: "Academic Block A" },
    { value: "Academic Block B", label: "Academic Block B" },
    { value: "Academic Block C", label: "Academic Block C" },
    { value: "Science Block", label: "Science Block" },
    { value: "Engineering Block", label: "Engineering Block" },
    { value: "Administrative Block", label: "Administrative Block" },
    { value: "Central Library Block", label: "Central Library Block" }
  ];

  const floorOptions = [
    { value: "Ground Floor", label: "Ground Floor" },
    { value: "1st Floor", label: "1st Floor" },
    { value: "2nd Floor", label: "2nd Floor" },
    { value: "3rd Floor", label: "3rd Floor" },
    { value: "4th Floor", label: "4th Floor" },
    { value: "5th Floor", label: "5th Floor" }
  ];

  useEffect(() => {
    loadSavedLocation();
  }, []);

  const loadSavedLocation = () => {
    const savedLocation = loadFromStorage(`${STORAGE_KEYS.FACULTY_LOCATION}_${faculty.id}`, null);
    if (savedLocation) {
      setLocation(savedLocation);
      setIsSaved(true);
    }
  };

  const handleChange = (field, value) => {
    setLocation(prev => ({ ...prev, [field]: value }));
    // Auto-generate cabin location
    if (field === 'block' || field === 'roomNumber') {
      const blockShort = value === 'block' ? value.substring(0, 1) : location.block.substring(0, 1);
      const roomNum = field === 'roomNumber' ? value : location.roomNumber;
      if (blockShort && roomNum) {
        setLocation(prev => ({ 
          ...prev, 
          cabinLocation: `${blockShort}-${roomNum}` 
        }));
      }
    }
  };

  const handleSave = () => {
    if (!location.block || !location.floor || !location.roomNumber) {
      alert("Please fill Block, Floor, and Room Number");
      return;
    }

    const fullLocation = {
      ...location,
      cabinLocation: location.cabinLocation || `${location.block.substring(0, 1)}-${location.roomNumber}`,
      lastUpdated: new Date().toISOString()
    };

    saveToStorage(`${STORAGE_KEYS.FACULTY_LOCATION}_${faculty.id}`, fullLocation);
    
    // Also update in AppState faculty
    const facultyIndex = AppState.faculty.findIndex(f => f.id === faculty.id);
    if (facultyIndex !== -1) {
      AppState.faculty[facultyIndex].location = fullLocation;
      saveToStorage(STORAGE_KEYS.FACULTY, AppState.faculty);
    }

    setLocation(fullLocation);
    setIsSaved(true);
    setIsEditing(false);
    alert("Location saved successfully!");
    if (onComplete) onComplete();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const getFullLocationText = () => {
    const parts = [];
    if (location.block) parts.push(location.block);
    if (location.floor) parts.push(location.floor);
    if (location.roomNumber) parts.push(`Room ${location.roomNumber}`);
    if (location.cabinLocation) parts.push(`(${location.cabinLocation})`);
    if (location.buildingName) parts.push(location.buildingName);
    if (location.landmark) parts.push(`Near ${location.landmark}`);
    return parts.join(', ');
  };

  return (
    <Card>
      <Title level={4}>My Office Location</Title>
      
      {isSaved && !isEditing ? (
        <div>
          <div style={{ 
            padding: 16, 
            background: C.accent.greenBg, 
            borderRadius: 12,
            marginBottom: 16
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>📍</span>
              <strong style={{ color: C.accent.green }}>Your Saved Location:</strong>
            </div>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>{getFullLocationText()}</p>
            {location.lastUpdated && (
              <p style={{ fontSize: 11, color: C.text.tertiary, marginTop: 8 }}>
                Last updated: {new Date(location.lastUpdated).toLocaleString()}
              </p>
            )}
          </div>
          <Button onClick={handleEdit} variant="primary" fullWidth>
            Edit Location
          </Button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 16, padding: 12, background: C.accent.blueBg, borderRadius: 8 }}>
            <p style={{ margin: 0, color: C.accent.blue }}>
              📍 Please set your office location. This will be shared with students when they book appointments with you.
            </p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            <Select
              label="Block"
              value={location.block}
              onChange={e => handleChange('block', e.target.value)}
              options={[{ value: "", label: "-- Select Block --" }, ...blockOptions]}
              required
            />
            
            <Select
              label="Floor"
              value={location.floor}
              onChange={e => handleChange('floor', e.target.value)}
              options={[{ value: "", label: "-- Select Floor --" }, ...floorOptions]}
              required
            />
            
            <Input
              label="Room / Cabin Number"
              value={location.roomNumber}
              onChange={e => handleChange('roomNumber', e.target.value)}
              placeholder="e.g., 301, A-101"
              required
            />
            
            <Input
              label="Cabin Location (Auto-generated)"
              value={location.cabinLocation}
              onChange={e => handleChange('cabinLocation', e.target.value)}
              placeholder="e.g., A-301"
              disabled
            />
            
            <Input
              label="Building Name (Optional)"
              value={location.buildingName}
              onChange={e => handleChange('buildingName', e.target.value)}
              placeholder="e.g., Dr. APJ Abdul Kalam Block"
            />
            
            <Input
              label="Nearby Landmark (Optional)"
              value={location.landmark}
              onChange={e => handleChange('landmark', e.target.value)}
              placeholder="e.g., Near Cafeteria, Opposite Lift"
            />
          </div>
          
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            <Button onClick={handleSave} variant="success" fullWidth>
              Save Location
            </Button>
            {isEditing && (
              <Button onClick={() => setIsEditing(false)} variant="secondary" fullWidth>
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}