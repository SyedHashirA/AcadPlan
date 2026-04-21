// // src/components/auth/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import { MOCK_USERS } from "../../data/mockData";

// const AuthContext = createContext(null);
// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Load user from localStorage on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem('acadplan_user');
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setUser(parsedUser);
//     }
//   }, []);

//   const login = async (email, password) => {
//     setLoading(true);
//     setError("");
//     await new Promise(r => setTimeout(r, 500));
    
//     // First check if user exists in localStorage (for users who changed password)
//     const savedUser = localStorage.getItem('acadplan_user');
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       if (parsedUser.email === email && parsedUser.password === password) {
//         setUser(parsedUser);
//         localStorage.setItem('acadplan_user', JSON.stringify(parsedUser));
//         setLoading(false);
//         return parsedUser;
//       }
//     }
    
//     // Then check mock users
//     let found = MOCK_USERS.find(u => u.email === email && u.password === password);
    
//     if (found) {
//       // Make a copy with passwordChanged = true for all mock users
//       const userWithPasswordChanged = { 
//         ...found, 
//         passwordChanged: true 
//       };
//       setUser(userWithPasswordChanged);
//       localStorage.setItem('acadplan_user', JSON.stringify(userWithPasswordChanged));
//     } else {
//       setError("Invalid credentials. Please try again.");
//     }
    
//     setLoading(false);
//     return found ? { ...found, passwordChanged: true } : null;
//   };
  
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('acadplan_user');
//     localStorage.setItem('acadplan_route', 'login');
//   };

//   // Function to update user after password change
//   const updateUser = (updatedUser) => {
//     setUser(updatedUser);
//     localStorage.setItem('acadplan_user', JSON.stringify(updatedUser));
//   };

//   return (
//     <AuthContext.Provider value={{ user, error, loading, login, logout, updateUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// src/components/auth/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { MOCK_USERS } from "../../data/mockData";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../../utils/storage";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('acadplan_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
    }
    loadAllUsers();
  }, []);

  const loadAllUsers = () => {
    // Get all faculty (including visiting faculty)
    const faculty = loadFromStorage(STORAGE_KEYS.FACULTY, []);
    const allUsersList = [...MOCK_USERS];
    
    // Add faculty to the list
    faculty.forEach(f => {
      if (!allUsersList.some(u => u.email === f.email)) {
        allUsersList.push({
          id: f.id,
          email: f.email,
          password: f.password || "visiting123",
          role: f.role || (f.designation?.toLowerCase().includes("visiting") ? "visiting_faculty" : "faculty"),
          name: f.name,
          avatar: f.avatar,
          designation: f.designation,
          course: f.course,
          passwordChanged: f.passwordChanged || false
        });
      }
    });
    
    setAllUsers(allUsersList);
  };

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 500));
    
    console.log("Login attempt for:", email);
    
    // First check if user exists in localStorage (for users who changed password)
    const savedUser = localStorage.getItem('acadplan_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.email === email && parsedUser.password === password) {
        console.log("User found in localStorage:", parsedUser);
        setUser(parsedUser);
        localStorage.setItem('acadplan_user', JSON.stringify(parsedUser));
        setLoading(false);
        return parsedUser;
      }
    }
    
    // Check in faculty list (including visiting faculty from AppState)
    const facultyList = loadFromStorage(STORAGE_KEYS.FACULTY, []);
    const facultyUser = facultyList.find(f => f.email === email && f.password === password);
    if (facultyUser) {
      console.log("User found in faculty list:", facultyUser);
      const userWithRole = { 
        ...facultyUser, 
        role: facultyUser.role || (facultyUser.designation?.toLowerCase().includes("visiting") ? "visiting_faculty" : "faculty"),
        passwordChanged: facultyUser.passwordChanged || false
      };
      setUser(userWithRole);
      localStorage.setItem('acadplan_user', JSON.stringify(userWithRole));
      setLoading(false);
      return userWithRole;
    }
    
    // Then check mock users
    let found = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (found) {
      console.log("User found in mock users:", found);
      // Make a copy with passwordChanged = true for all mock users
      const userWithPasswordChanged = { 
        ...found, 
        passwordChanged: true 
      };
      setUser(userWithPasswordChanged);
      localStorage.setItem('acadplan_user', JSON.stringify(userWithPasswordChanged));
    } else {
      console.log("No user found for email:", email);
      setError("Invalid credentials. Please try again.");
    }
    
    setLoading(false);
    return found ? { ...found, passwordChanged: true } : null;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('acadplan_user');
    localStorage.setItem('acadplan_route', 'login');
  };

  // Function to update user after password change
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('acadplan_user', JSON.stringify(updatedUser));
    
    // Also update in faculty list if exists
    const facultyList = loadFromStorage(STORAGE_KEYS.FACULTY, []);
    const updatedFacultyList = facultyList.map(f => 
      f.id === updatedUser.id ? { ...f, password: updatedUser.password, passwordChanged: true } : f
    );
    saveToStorage(STORAGE_KEYS.FACULTY, updatedFacultyList);
    
    // Also update in AppState
    if (window.AppState) {
      const facultyIndex = window.AppState.faculty.findIndex(f => f.id === updatedUser.id);
      if (facultyIndex !== -1) {
        window.AppState.faculty[facultyIndex].password = updatedUser.password;
        window.AppState.faculty[facultyIndex].passwordChanged = true;
      }
    }
    
    window.dispatchEvent(new Event('storage'));
  };

  // Function to get all users (for login page)
  const getAllUsers = () => {
    return allUsers;
  };

  // Function to check if user has a specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Function to check if user has any of the given roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      error, 
      loading, 
      login, 
      logout, 
      updateUser,
      getAllUsers,
      hasRole,
      hasAnyRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}