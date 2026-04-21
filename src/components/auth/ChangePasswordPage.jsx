// src/components/auth/ChangePasswordPage.jsx
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "../../context/RouterContext";
import { Card, Button, Input, Title } from "../common";
import { C } from "../../styles/theme";

export function ChangePasswordPage() {
  const { user, updateUser } = useAuth();
  const { navigate } = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Create updated user with passwordChanged = true
      const updatedUser = { 
        ...user, 
        password: newPassword, 
        passwordChanged: true 
      };
      
      // Update the user in AuthContext and localStorage
      updateUser(updatedUser);
      
      // Navigate to the appropriate dashboard
      const targetRoute = updatedUser.role === "admin" ? "admin" : 
                          updatedUser.role === "coordinator" ? "coordinator" : 
                          updatedUser.role === "faculty" ? "faculty" : 
                          updatedUser.role === "director" ? "director" : "student";
      
      localStorage.setItem('acadplan_route', targetRoute);
      navigate(targetRoute);
      
    } catch (err) {
      setError("Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: C.bg, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      padding: 20
    }}>
      <Card padding="32px" hover={false} style={{ width: 400, maxWidth: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: C.gradient.blue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 auto 16px auto",
            boxShadow: C.shadow.lg,
          }}>AP</div>
          <Title level={2}>Change Password</Title>
          <p style={{ color: C.text.secondary, marginTop: 8 }}>
            Welcome {user?.name}! Please set a new password to continue.
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Input 
            label="New Password" 
            type="password" 
            value={newPassword} 
            onChange={e => setNewPassword(e.target.value)} 
            placeholder="Enter new password (min 6 characters)"
            required 
          />
          <Input 
            label="Confirm Password" 
            type="password" 
            value={confirmPassword} 
            onChange={e => setConfirmPassword(e.target.value)} 
            placeholder="Confirm your new password"
            required 
          />
          
          {error && (
            <div style={{ 
              padding: "12px", 
              background: C.accent.redBg, 
              border: `1px solid ${C.accent.red}`,
              borderRadius: 8, 
              color: C.accent.red, 
              fontSize: 13, 
              marginBottom: 20 
            }}>
              {error}
            </div>
          )}
          
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            size="lg"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Card>
    </div>
  );
}