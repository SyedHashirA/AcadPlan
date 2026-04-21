// import { useState } from "react";
// import { useAuth } from "./AuthContext";
// import { useRouter } from "../../context/RouterContext";
// import { Card, Button, Input, Title, Badge } from "../common";
// import { Spinner } from "../common/Spinner";
// import { MOCK_USERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function LoginPage() {
//   const { login, error, loading } = useAuth();
//   const { navigate } = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const u = await login(email, password);
//     if (u) {
//       if (!u.passwordChanged) {
//         navigate("change-password");
//       } else {
//         const targetRoute = u.role === "admin" ? "admin" : 
//                             u.role === "coordinator" ? "coordinator" : 
//                             u.role === "faculty" ? "faculty" : 
//                             u.role === "director" ? "director" : "student";
//         navigate(targetRoute);
//       }
//     }
//   };

//   return (
//     <div style={{ 
//       minHeight: "100vh", 
//       background: C.bg,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: 20,
//     }}>
//       <div style={{ display: "flex", maxWidth: 1100, width: "100%", gap: 24 }}>
//         <div style={{ flex: 1 }}>
//           <Card padding="32px" hover={false}>
//             <div style={{ marginBottom: 24 }}>
//               <div style={{
//                 width: 64,
//                 height: 64,
//                 borderRadius: 16,
//                 background: C.gradient.blue,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 24,
//                 fontWeight: 700,
//                 color: "#ffffff",
//                 marginBottom: 20,
//                 boxShadow: C.shadow.lg,
//               }}>AP</div>
//               <Title level={2}>AcadPlan</Title>
//               <p style={{ color: C.text.tertiary, fontSize: 14 }}>School of Computer Science & Engineering</p>
//             </div>
            
//             <p style={{ color: C.accent.blue, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>Demo Credentials</p>
//             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//               {MOCK_USERS.map(u => (
//                 <div
//                   key={u.id}
//                   onClick={() => { setEmail(u.email); setPassword(u.password); }}
//                   style={{
//                     padding: "12px 16px",
//                     borderRadius: 10,
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 12,
//                     transition: "all 0.2s",
//                     border: `1px solid ${C.border}`,
//                     background: email === u.email ? `${C.accent.blue}10` : C.surface,
//                   }}
//                   onMouseEnter={e => e.currentTarget.style.background = C.cardHover}
//                   onMouseLeave={e => e.currentTarget.style.background = email === u.email ? `${C.accent.blue}10` : C.surface}
//                 >
//                   <div style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: "50%",
//                     background: u.role === "faculty" ? C.accent.blueBg : u.role === "coordinator" ? C.accent.goldBg : u.role === "admin" ? C.accent.purpleBg : C.accent.greenBg,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: 14,
//                     color: u.role === "faculty" ? C.accent.blue : u.role === "coordinator" ? C.accent.gold : u.role === "admin" ? C.accent.purple : C.accent.green,
//                     fontWeight: 600,
//                   }}>{u.avatar}</div>
//                   <div style={{ flex: 1 }}>
//                     <p style={{ color: C.text.primary, fontSize: 14, fontWeight: 600 }}>{u.name}</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{u.email}</p>
//                   </div>
//                   <Badge variant={u.role === "faculty" ? "primary" : u.role === "coordinator" ? "warning" : u.role === "admin" ? "purple" : "success"}>
//                     {u.role}
//                   </Badge>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>

//         <div style={{ flex: 0.8 }}>
//           <Card padding="40px" hover={false}>
//             <div style={{ textAlign: "center", marginBottom: 32 }}>
//               <Title level={1}>Welcome Back</Title>
//               <p style={{ color: C.text.tertiary, fontSize: 14 }}>Sign in to your account</p>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <Input
//                 label="Email"
//                 type="email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 placeholder="name@university.edu"
//                 required
//               />
              
//               <Input
//                 label="Password"
//                 type="password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 required
//               />

//               {error && (
//                 <div style={{
//                   padding: "12px",
//                   background: C.accent.redBg,
//                   border: `1px solid ${C.accent.red}`,
//                   borderRadius: 10,
//                   color: C.accent.red,
//                   fontSize: 13,
//                   marginBottom: 20,
//                 }}>
//                   {error}
//                 </div>
//               )}

//               <Button
//                 type="submit"
//                 variant="primary"
//                 disabled={loading}
//                 fullWidth
//                 size="lg"
//               >
//                 {loading ? <><Spinner /> Authenticating...</> : "Sign In"}
//               </Button>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/components/auth/LoginPage.jsx
// import { useState } from "react";
// import { useAuth } from "./AuthContext";
// import { useRouter } from "../../context/RouterContext";
// import { Card, Button, Input, Title, Badge } from "../common";
// import { Spinner } from "../common/Spinner";
// import { MOCK_USERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function LoginPage() {
//   const { login, error, loading } = useAuth();
//   const { navigate } = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const u = await login(email, password);
//     if (u) {
//       if (!u.passwordChanged) {
//         navigate("change-password");
//       } else {
//         let targetRoute;
//         switch(u.role) {
//           case "admin":
//             targetRoute = "admin";
//             break;
//           case "coordinator":
//             targetRoute = "coordinator";
//             break;
//           case "faculty":
//             targetRoute = "faculty";
//             break;
//           case "director":
//             targetRoute = "director";
//             break;
//           case "ea":
//             targetRoute = "ea";
//             break;
//           default:
//             targetRoute = "student";
//         }
//         navigate(targetRoute);
//       }
//     }
//   };

//   const getRoleColor = (role) => {
//     switch(role) {
//       case "faculty": return C.accent.blue;
//       case "coordinator": return C.accent.gold;
//       case "admin": return C.accent.purple;
//       case "director": return C.accent.green;
//       case "ea": return "#ec4899";
//       default: return C.accent.green;
//     }
//   };

//   const getRoleBg = (role) => {
//     switch(role) {
//       case "faculty": return C.accent.blueBg;
//       case "coordinator": return C.accent.goldBg;
//       case "admin": return C.accent.purpleBg;
//       case "director": return C.accent.greenBg;
//       case "ea": return "#fce7f3";
//       default: return C.accent.greenBg;
//     }
//   };

//   return (
//     <div style={{ 
//       minHeight: "100vh", 
//       background: C.bg,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: 20,
//     }}>
//       <div style={{ display: "flex", maxWidth: 1100, width: "100%", gap: 24, flexWrap: "wrap" }}>
//         <div style={{ flex: 1 }}>
//           <Card padding="32px" hover={false}>
//             <div style={{ marginBottom: 24 }}>
//               <div style={{
//                 width: 64,
//                 height: 64,
//                 borderRadius: 16,
//                 background: C.gradient.blue,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 24,
//                 fontWeight: 700,
//                 color: "#ffffff",
//                 marginBottom: 20,
//                 boxShadow: C.shadow.lg,
//               }}>AP</div>
//               <Title level={2}>AcadPlan</Title>
//               <p style={{ color: C.text.tertiary, fontSize: 14 }}>School of Computer Science & Engineering</p>
//             </div>
            
//             <p style={{ color: C.accent.blue, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>Demo Credentials</p>
//             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//               {MOCK_USERS.map(u => (
//                 <div
//                   key={u.id}
//                   onClick={() => { setEmail(u.email); setPassword(u.password); }}
//                   style={{
//                     padding: "12px 16px",
//                     borderRadius: 10,
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 12,
//                     transition: "all 0.2s",
//                     border: `1px solid ${C.border}`,
//                     background: email === u.email ? `${getRoleColor(u.role)}10` : C.surface,
//                   }}
//                   onMouseEnter={e => e.currentTarget.style.background = C.cardHover}
//                   onMouseLeave={e => e.currentTarget.style.background = email === u.email ? `${getRoleColor(u.role)}10` : C.surface}
//                 >
//                   <div style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: "50%",
//                     background: getRoleBg(u.role),
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: 14,
//                     color: getRoleColor(u.role),
//                     fontWeight: 600,
//                   }}>{u.avatar}</div>
//                   <div style={{ flex: 1 }}>
//                     <p style={{ color: C.text.primary, fontSize: 14, fontWeight: 600 }}>{u.name}</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{u.email}</p>
//                   </div>
//                   <Badge variant={u.role === "faculty" ? "primary" : u.role === "coordinator" ? "warning" : u.role === "admin" ? "purple" : u.role === "ea" ? "danger" : "success"}>
//                     {u.role === "ea" ? "EA" : u.role}
//                   </Badge>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>

//         <div style={{ flex: 0.8 }}>
//           <Card padding="40px" hover={false}>
//             <div style={{ textAlign: "center", marginBottom: 32 }}>
//               <Title level={1}>Welcome Back</Title>
//               <p style={{ color: C.text.tertiary, fontSize: 14 }}>Sign in to your account</p>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <Input
//                 label="Email"
//                 type="email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 placeholder="name@university.edu"
//                 required
//               />
              
//               <Input
//                 label="Password"
//                 type="password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 required
//               />

//               {error && (
//                 <div style={{
//                   padding: "12px",
//                   background: C.accent.redBg,
//                   border: `1px solid ${C.accent.red}`,
//                   borderRadius: 10,
//                   color: C.accent.red,
//                   fontSize: 13,
//                   marginBottom: 20,
//                 }}>
//                   {error}
//                 </div>
//               )}

//               <Button
//                 type="submit"
//                 variant="primary"
//                 disabled={loading}
//                 fullWidth
//                 size="lg"
//               >
//                 {loading ? <><Spinner /> Authenticating...</> : "Sign In"}
//               </Button>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// // src/components/auth/LoginPage.jsx
// import { useState } from "react";
// import { useAuth } from "./AuthContext";
// import { useRouter } from "../../context/RouterContext";
// import { Card, Button, Input, Title, Badge } from "../common";
// import { Spinner } from "../common/Spinner";
// import { MOCK_USERS } from "../../data/mockData";
// import { C } from "../../styles/theme";

// export function LoginPage() {
//   const { login, error, loading } = useAuth();
//   const { navigate } = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const u = await login(email, password);
//     if (u) {
//       if (!u.passwordChanged) {
//         navigate("change-password");
//       } else {
//         let targetRoute;
//         switch(u.role) {
//           case "admin":
//             targetRoute = "admin";
//             break;
//           case "coordinator":
//             targetRoute = "coordinator";
//             break;
//           case "faculty":
//             targetRoute = "faculty";
//             break;
//           case "director":
//             targetRoute = "director";
//             break;
//           case "ea":
//             targetRoute = "ea";
//             break;
//           case "visiting_faculty":
//             targetRoute = "visiting_faculty";
//             break;
//           default:
//             targetRoute = "student";
//         }
//         navigate(targetRoute);
//       }
//     }
//   };

//   const getRoleColor = (role) => {
//     switch(role) {
//       case "faculty": return C.accent.blue;
//       case "coordinator": return C.accent.gold;
//       case "admin": return C.accent.purple;
//       case "director": return C.accent.green;
//       case "ea": return "#ec4899";
//       case "visiting_faculty": return "#10b981";
//       default: return C.accent.green;
//     }
//   };

//   const getRoleBg = (role) => {
//     switch(role) {
//       case "faculty": return C.accent.blueBg;
//       case "coordinator": return C.accent.goldBg;
//       case "admin": return C.accent.purpleBg;
//       case "director": return C.accent.greenBg;
//       case "ea": return "#fce7f3";
//       case "visiting_faculty": return "#d1fae5";
//       default: return C.accent.greenBg;
//     }
//   };

//   const getRoleLabel = (role) => {
//     switch(role) {
//       case "faculty": return "Faculty";
//       case "coordinator": return "Coordinator";
//       case "admin": return "Dean";
//       case "director": return "Director";
//       case "ea": return "EA";
//       case "visiting_faculty": return "Visiting Faculty";
//       default: return role;
//     }
//   };

//   return (
//     <div style={{ 
//       minHeight: "100vh", 
//       background: C.bg,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: 20,
//     }}>
//       <div style={{ display: "flex", maxWidth: 1100, width: "100%", gap: 24, flexWrap: "wrap" }}>
//         <div style={{ flex: 1 }}>
//           <Card padding="32px" hover={false}>
//             <div style={{ marginBottom: 24 }}>
//               <div style={{
//                 width: 64,
//                 height: 64,
//                 borderRadius: 16,
//                 background: C.gradient.blue,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: 24,
//                 fontWeight: 700,
//                 color: "#ffffff",
//                 marginBottom: 20,
//                 boxShadow: C.shadow.lg,
//               }}>AP</div>
//               <Title level={2}>AcadPlan</Title>
//               <p style={{ color: C.text.tertiary, fontSize: 14 }}>School of Computer Science & Engineering</p>
//             </div>
            
//             <p style={{ color: C.accent.blue, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>Demo Credentials</p>
//             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//               {MOCK_USERS.map(u => (
//                 <div
//                   key={u.id}
//                   onClick={() => { setEmail(u.email); setPassword(u.password); }}
//                   style={{
//                     padding: "12px 16px",
//                     borderRadius: 10,
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 12,
//                     transition: "all 0.2s",
//                     border: `1px solid ${C.border}`,
//                     background: email === u.email ? `${getRoleColor(u.role)}10` : C.surface,
//                   }}
//                   onMouseEnter={e => e.currentTarget.style.background = C.cardHover}
//                   onMouseLeave={e => e.currentTarget.style.background = email === u.email ? `${getRoleColor(u.role)}10` : C.surface}
//                 >
//                   <div style={{
//                     width: 36,
//                     height: 36,
//                     borderRadius: "50%",
//                     background: getRoleBg(u.role),
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: 14,
//                     color: getRoleColor(u.role),
//                     fontWeight: 600,
//                   }}>{u.avatar}</div>
//                   <div style={{ flex: 1 }}>
//                     <p style={{ color: C.text.primary, fontSize: 14, fontWeight: 600 }}>{u.name}</p>
//                     <p style={{ color: C.text.tertiary, fontSize: 12 }}>{u.email}</p>
//                   </div>
//                   <Badge variant={
//                     u.role === "faculty" ? "primary" : 
//                     u.role === "coordinator" ? "warning" : 
//                     u.role === "admin" ? "purple" : 
//                     u.role === "ea" ? "danger" : 
//                     u.role === "visiting_faculty" ? "success" : "success"
//                   }>
//                     {getRoleLabel(u.role)}
//                   </Badge>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>

//         <div style={{ flex: 0.8 }}>
//           <Card padding="40px" hover={false}>
//             <div style={{ textAlign: "center", marginBottom: 32 }}>
//               <Title level={1}>Welcome Back</Title>
//               <p style={{ color: C.text.tertiary, fontSize: 14 }}>Sign in to your account</p>
//             </div>

//             <form onSubmit={handleSubmit}>
//               <Input
//                 label="Email"
//                 type="email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 placeholder="name@university.edu"
//                 required
//               />
              
//               <Input
//                 label="Password"
//                 type="password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 required
//               />

//               {error && (
//                 <div style={{
//                   padding: "12px",
//                   background: C.accent.redBg,
//                   border: `1px solid ${C.accent.red}`,
//                   borderRadius: 10,
//                   color: C.accent.red,
//                   fontSize: 13,
//                   marginBottom: 20,
//                 }}>
//                   {error}
//                 </div>
//               )}

//               <Button
//                 type="submit"
//                 variant="primary"
//                 disabled={loading}
//                 fullWidth
//                 size="lg"
//               >
//                 {loading ? <><Spinner /> Authenticating...</> : "Sign In"}
//               </Button>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/auth/LoginPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "../../context/RouterContext";
import { Card, Button, Input, Title, Badge } from "../common";
import { Spinner } from "../common/Spinner";
import { MOCK_USERS } from "../../data/mockData";
import { loadFromStorage, STORAGE_KEYS } from "../../utils/storage";
import { C } from "../../styles/theme";

export function LoginPage() {
  const { login, error, loading } = useAuth();
  const { navigate } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [visitingFaculty, setVisitingFaculty] = useState([]);

  useEffect(() => {
    loadAllUsers();
    
    // Listen for storage changes (when new visiting faculty are added)
    const handleStorageChange = () => {
      loadAllUsers();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadAllUsers = () => {
    // Get all faculty from AppState (including visiting faculty)
    const faculty = loadFromStorage(STORAGE_KEYS.FACULTY, []);
    
    // Filter visiting faculty
    const visiting = faculty.filter(f => 
      f.designation?.toLowerCase().includes("visiting") || 
      f.designation === "Guest Faculty" ||
      f.designation === "Industry Expert" ||
      f.role === "visiting_faculty"
    );
    
    setVisitingFaculty(visiting);
    
    // Combine mock users with visiting faculty for display
    const allUsersList = [...MOCK_USERS];
    
    // Add visiting faculty to the list for display
    visiting.forEach(vf => {
      if (!allUsersList.some(u => u.email === vf.email)) {
        allUsersList.push({
          id: vf.id,
          email: vf.email,
          password: "visiting123",
          role: "visiting_faculty",
          name: vf.name,
          avatar: vf.avatar || vf.name.charAt(0),
          designation: vf.designation,
          course: vf.course,
          passwordChanged: vf.passwordChanged || false
        });
      }
    });
    
    setAllUsers(allUsersList);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const u = await login(email, password);
    if (u) {
      if (!u.passwordChanged) {
        navigate("change-password");
      } else {
        let targetRoute;
        switch(u.role) {
          case "admin":
            targetRoute = "admin";
            break;
          case "coordinator":
            targetRoute = "coordinator";
            break;
          case "faculty":
            targetRoute = "faculty";
            break;
          case "director":
            targetRoute = "director";
            break;
          case "ea":
            targetRoute = "ea";
            break;
          case "visiting_faculty":
            targetRoute = "visiting_faculty";
            break;
          default:
            targetRoute = "student";
        }
        navigate(targetRoute);
      }
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case "faculty": return C.accent.blue;
      case "coordinator": return C.accent.gold;
      case "admin": return C.accent.purple;
      case "director": return C.accent.green;
      case "ea": return "#ec4899";
      case "visiting_faculty": return "#10b981";
      default: return C.accent.green;
    }
  };

  const getRoleBg = (role) => {
    switch(role) {
      case "faculty": return C.accent.blueBg;
      case "coordinator": return C.accent.goldBg;
      case "admin": return C.accent.purpleBg;
      case "director": return C.accent.greenBg;
      case "ea": return "#fce7f3";
      case "visiting_faculty": return "#d1fae5";
      default: return C.accent.greenBg;
    }
  };

  const getRoleLabel = (role) => {
    switch(role) {
      case "faculty": return "Faculty";
      case "coordinator": return "Coordinator";
      case "admin": return "Dean";
      case "director": return "Director";
      case "ea": return "EA";
      case "visiting_faculty": return "Visiting Faculty";
      default: return role;
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: C.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}>
      <div style={{ display: "flex", maxWidth: 1100, width: "100%", gap: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <Card padding="32px" hover={false}>
            <div style={{ marginBottom: 24 }}>
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
                marginBottom: 20,
                boxShadow: C.shadow.lg,
              }}>AP</div>
              <Title level={2}>AcadPlan</Title>
              <p style={{ color: C.text.tertiary, fontSize: 14 }}>School of Computer Science & Engineering</p>
            </div>
            
            <p style={{ color: C.accent.blue, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>Demo Credentials</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 400, overflowY: "auto" }}>
              {allUsers.map(u => (
                <div
                  key={u.id}
                  onClick={() => { setEmail(u.email); setPassword(u.password || "visiting123"); }}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 10,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    transition: "all 0.2s",
                    border: `1px solid ${C.border}`,
                    background: email === u.email ? `${getRoleColor(u.role)}10` : C.surface,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = C.cardHover}
                  onMouseLeave={e => e.currentTarget.style.background = email === u.email ? `${getRoleColor(u.role)}10` : C.surface}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: getRoleBg(u.role),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    color: getRoleColor(u.role),
                    fontWeight: 600,
                  }}>{u.avatar || u.name?.charAt(0) || "VF"}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: C.text.primary, fontSize: 14, fontWeight: 600 }}>{u.name}</p>
                    <p style={{ color: C.text.tertiary, fontSize: 12 }}>{u.email}</p>
                    {u.role === "visiting_faculty" && (
                      <p style={{ color: C.accent.green, fontSize: 10, marginTop: 2 }}>
                        Password: visiting123
                      </p>
                    )}
                  </div>
                  <Badge variant={
                    u.role === "faculty" ? "primary" : 
                    u.role === "coordinator" ? "warning" : 
                    u.role === "admin" ? "purple" : 
                    u.role === "ea" ? "danger" : 
                    u.role === "visiting_faculty" ? "success" : "success"
                  }>
                    {getRoleLabel(u.role)}
                  </Badge>
                </div>
              ))}
            </div>
            
            {visitingFaculty.length > 0 && (
              <div style={{ marginTop: 16, padding: 12, background: C.accent.greenBg, borderRadius: 8 }}>
                <p style={{ color: C.accent.green, fontSize: 12, margin: 0 }}>
                  ✓ {visitingFaculty.length} Visiting Faculty member(s) added. Default password: <strong>visiting123</strong>
                </p>
              </div>
            )}
          </Card>
        </div>

        <div style={{ flex: 0.8 }}>
          <Card padding="40px" hover={false}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <Title level={1}>Welcome Back</Title>
              <p style={{ color: C.text.tertiary, fontSize: 14 }}>Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@university.edu"
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />

              {error && (
                <div style={{
                  padding: "12px",
                  background: C.accent.redBg,
                  border: `1px solid ${C.accent.red}`,
                  borderRadius: 10,
                  color: C.accent.red,
                  fontSize: 13,
                  marginBottom: 20,
                }}>
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                fullWidth
                size="lg"
              >
                {loading ? <><Spinner /> Authenticating...</> : "Sign In"}
              </Button>
            </form>
            
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <p style={{ color: C.text.tertiary, fontSize: 12 }}>
                New visiting faculty? Default password: <strong>visiting123</strong>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}