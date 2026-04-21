// export const C = {
//   bg: "#f8fafc",
//   surface: "#ffffff",
//   card: "#ffffff",
//   cardHover: "#f1f5f9",
//   border: "#e2e8f0",
//   borderHover: "#cbd5e1",
//   nav: "#ffffff",
//   navBorder: "#f1f5f9",
  
//   primary: "#0f172a",
//   primaryLight: "#334155",
//   primaryDark: "#020617",
  
//   accent: {
//     blue: "#2563eb",
//     blueLight: "#3b82f6",
//     blueBg: "#eff6ff",
//     gold: "#b45309",
//     goldLight: "#d97706",
//     goldBg: "#fffbeb",
//     green: "#059669",
//     greenLight: "#10b981",
//     greenBg: "#ecfdf5",
//     red: "#b91c1c",
//     redLight: "#dc2626",
//     redBg: "#fef2f2",
//     purple: "#7c3aed",
//     purpleLight: "#8b5cf6",
//     purpleBg: "#f5f3ff",
//   },
  
//   text: {
//     primary: "#0f172a",
//     secondary: "#334155",
//     tertiary: "#64748b",
//     disabled: "#94a3b8",
//   },
  
//   gradient: {
//     blue: "linear-gradient(135deg, #2563eb, #1e40af)",
//     gold: "linear-gradient(135deg, #b45309, #92400e)",
//     green: "linear-gradient(135deg, #059669, #047857)",
//     red: "linear-gradient(135deg, #b91c1c, #991b1b)",
//     purple: "linear-gradient(135deg, #7c3aed, #6d28d9)",
//   },
  
//   shadow: {
//     sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
//     md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
//     lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
//     xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
//   },
// };

// src/styles/theme.js

export const C = {
  // Base colors - Dark Teal Theme
  bg: "#1F2D34",        // Dark Teal background
  surface: "#2A3A42",   // Slightly lighter teal for surfaces
  card: "#2A3A42",      // Card background
  cardHover: "#33464F", // Hover state for cards
  border: "#3A4D57",    // Border color
  borderHover: "#4A5F6A", // Hover state for borders
  nav: "#1F2D34",       // Navigation background (matches bg)
  navBorder: "#2A3A42", // Navigation border
  
  // Primary colors - Gold
  primary: "#B9A572",    // Gold for primary elements
  primaryLight: "#C9B98A", // Lighter gold
  primaryDark: "#A39160",   // Darker gold
  
  // Accent colors (Gold based)
  accent: {
    blue: "#5B8FB9",     // Softer blue that works with dark teal
    blueLight: "#7BA8CC",
    blueBg: "#2A3A48",
    gold: "#B9A572",     // Main gold color
    goldLight: "#C9B98A",
    goldBg: "rgba(185, 165, 114, 0.15)", // Gold with transparency
    green: "#6B9E7A",    // Muted green for dark theme
    greenLight: "#8BB89A",
    greenBg: "#2A3A30",
    red: "#B86B6B",      // Muted red for dark theme
    redLight: "#D88B8B",
    redBg: "#3A2A2A",
    purple: "#9B7BB9",   // Muted purple for dark theme
    purpleLight: "#BB9BD9",
    purpleBg: "#2A2A3A",
  },
  
  // Text colors - ALL WHITE for maximum readability
  text: {
    primary: "#FFFFFF",     // Pure white for primary text
    secondary: "#F5F5F5",   // Off-white for secondary text
    tertiary: "#E0E0E0",    // Light gray-white for tertiary text
    disabled: "#A0A0A0",    // Grayish for disabled state
    inverse: "#1F2D34",     // Dark teal for text on light backgrounds
  },
  
  // Gradient definitions using gold and teal
  gradient: {
    blue: "linear-gradient(135deg, #5B8FB9, #3A6D8F)",
    gold: "linear-gradient(135deg, #B9A572, #9B8558)",
    goldLight: "linear-gradient(135deg, #C9B98A, #B9A572)",
    green: "linear-gradient(135deg, #6B9E7A, #4B7A5A)",
    red: "linear-gradient(135deg, #B86B6B, #984B4B)",
    purple: "linear-gradient(135deg, #9B7BB9, #7B5B99)",
    teal: "linear-gradient(135deg, #2A3A42, #1F2D34)",
  },
  
  // Shadow definitions for dark theme (adjusted opacity)
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
    glow: "0 0 10px rgba(185, 165, 114, 0.3)", // Gold glow effect
    glowStrong: "0 0 20px rgba(185, 165, 114, 0.5)", // Stronger gold glow
  },
  
  // Additional theme-specific variables
  overlay: "rgba(0, 0, 0, 0.6)",      // For modals and overlays
  highlight: "rgba(185, 165, 114, 0.1)", // Gold highlight
  success: "#6B9E7A",
  warning: "#B9A572",  // Gold as warning color
  error: "#B86B6B",
  info: "#5B8FB9",
  
  // Gold specific variables
  gold: {
    main: "#B9A572",
    light: "#C9B98A",
    dark: "#A39160",
    gradient: "linear-gradient(135deg, #B9A572, #9B8558)",
    glow: "0 0 10px rgba(185, 165, 114, 0.3)",
  }
};

// Optional: Export a light theme variant if needed
export const lightTheme = {
  bg: "#f8fafc",
  surface: "#ffffff",
  card: "#ffffff",
  cardHover: "#f1f5f9",
  border: "#e2e8f0",
  borderHover: "#cbd5e1",
  nav: "#ffffff",
  navBorder: "#f1f5f9",
  
  primary: "#B9A572",
  primaryLight: "#C9B98A",
  primaryDark: "#9B8558",
  
  accent: {
    blue: "#2563eb",
    blueLight: "#3b82f6",
    blueBg: "#eff6ff",
    gold: "#B9A572",
    goldLight: "#C9B98A",
    goldBg: "#fffbeb",
    green: "#059669",
    greenLight: "#10b981",
    greenBg: "#ecfdf5",
    red: "#b91c1c",
    redLight: "#dc2626",
    redBg: "#fef2f2",
    purple: "#7c3aed",
    purpleLight: "#8b5cf6",
    purpleBg: "#f5f3ff",
  },
  
  text: {
    primary: "#1F2D34",    // Dark teal for text on light background
    secondary: "#334155",
    tertiary: "#64748b",
    disabled: "#94a3b8",
    inverse: "#FFFFFF",
  },
  
  gradient: {
    blue: "linear-gradient(135deg, #2563eb, #1e40af)",
    gold: "linear-gradient(135deg, #B9A572, #9B8558)",
    green: "linear-gradient(135deg, #059669, #047857)",
    red: "linear-gradient(135deg, #b91c1c, #991b1b)",
    purple: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    teal: "linear-gradient(135deg, #2A3A42, #1F2D34)",
  },
  
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  
  overlay: "rgba(0, 0, 0, 0.5)",
  highlight: "rgba(185, 165, 114, 0.1)",
  gold: {
    main: "#B9A572",
    light: "#C9B98A",
    dark: "#9B8558",
    gradient: "linear-gradient(135deg, #B9A572, #9B8558)",
    glow: "0 0 10px rgba(185, 165, 114, 0.3)",
  },
  success: "#059669",
  warning: "#B9A572",
  error: "#b91c1c",
  info: "#2563eb",
};

// Helper function to get contrast color
export const getContrastColor = (hexColor) => {
  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark colors, dark teal for light colors
  return luminance > 0.5 ? '#1F2D34' : '#FFFFFF';
};

// Helper function to get readable text color on gold background
export const getTextColorOnGold = () => {
  return '#1F2D34'; // Dark teal text on gold for better contrast
};

// CSS classes for common gold elements
export const goldStyles = {
  goldText: {
    color: "#B9A572",
  },
  goldBorder: {
    borderColor: "#B9A572",
    borderWidth: 1,
  },
  goldBackground: {
    backgroundColor: "rgba(185, 165, 114, 0.1)",
  },
  goldGlow: {
    boxShadow: "0 0 10px rgba(185, 165, 114, 0.3)",
  },
  goldGradient: {
    background: "linear-gradient(135deg, #B9A572, #9B8558)",
  },
};

// Export default theme
export default C;