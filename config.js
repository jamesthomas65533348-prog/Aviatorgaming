var SUPABASE_URL = "https://dxoeftwjptmculayerzg.supabase.co";
var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4b2VmdHdqcHRtY3VsYXllcnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyODkwNjcsImV4cCI6MjA4NTg2NTA2N30.WUK-1zSf9P1rNJbUAhkqlP8JW0Mfr6LyCN350P8bSio";

function getClient() {
    if (typeof supabase === 'undefined') return null;
    return supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// Check role from localStorage
function isAdmin() {
    return localStorage.getItem('user_role') === 'ADMIN';
}
