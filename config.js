// Database Configuration
var SUPABASE_URL = "https://dxoeftwjptmculayerzg.supabase.co";
var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4b2VmdHdqcHRtY3VsYXllcnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyODkwNjcsImV4cCI6MjA4NTg2NTA2N30.WUK-1zSf9P1rNJbUAhkqlP8JW0Mfr6LyCN350P8bSio";

// Render Backend Configuration
// This is the URL from your Render dashboard used for payments and sync
var SERVER_URL = "https://aviator-server-dwx1.onrender.com";

/**
 * Initializes the Supabase client
 */
function getClient() {
    if (typeof supabase === 'undefined') {
        console.error("Supabase script not loaded!");
        return null;
    }
    return supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

/**
 * Security check for Admin privileges
 */
function isAdmin() {
    return localStorage.getItem('user_role') === 'ADMIN';
}

/**
 * Helper to get the correct API endpoint
 */
function getApiUrl(endpoint) {
    return `${SERVER_URL}${endpoint}`;
}
