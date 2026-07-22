# 🧪 Complete Testing Guide

## Quick Start Testing

### Prerequisites
1. Backend running on port 7000
2. Frontend running on port 3000
3. MongoDB connected

---

## 🔐 Authentication Testing

### Test 1: Registration Flow
1. Open http://localhost:3000
2. Click **✨ Sign Up** button (navbar or hero)
3. Fill form:
   - Username: `testuser`
   - Password: `test123`
   - Confirm: `test123`
4. Click "Create Account"
5. ✅ **Expected:** Redirects to Login page with green success message "Account created! Please sign in."

### Test 2: Login Flow
1. On Login page, enter:
   - Username: `testuser`
   - Password: `test123`
2. Click "Sign In"
3. ✅ **Expected:** 
   - Redirects to Dashboard
   - Navbar shows profile avatar with "TE" initials
   - No login/signup buttons visible

### Test 3: Logout Flow
1. Click profile avatar (navbar)
2. Click "🚪 Sign Out"
3. ✅ **Expected:**
   - Redirects to Home page
   - Navbar shows "🔑 Login" and "✨ Sign Up" buttons
   - Profile avatar hidden

### Test 4: Protected Routes
1. Logout if logged in
2. Try to visit: http://localhost:3000/dashboard
3. ✅ **Expected:** Automatically redirects to Login page

### Test 5: Session Persistence
1. Login
2. Refresh page (F5)
3. ✅ **Expected:** Still logged in, no redirect

---

## 🗺️ Navigation Testing

### Test 6: Navbar Links (Logged In)
Click each link and verify it loads:
- Home → Hero section with search
- Dashboard → Stats and upcoming trips
- Explore → Destination grid
- Bookings → Trip bookings list
- Itinerary → Calendar view
- Weather → Weather forecast
- Checklist → Pre-trip checklist
- Reviews → Destination reviews

### Test 7: Profile Dropdown
1. Click profile avatar
2. Verify dropdown shows:
   - Username and "Wanderlust Explorer"
   - 👤 My Profile
   - 🗺️ Dashboard
   - 🎫 My Bookings
   - ⚙️ Settings
   - 🚪 Sign Out
3. Click each link
4. ✅ **Expected:** Navigates correctly, dropdown closes

### Test 8: Mobile Menu
1. Resize browser to mobile (< 768px)
2. Click hamburger menu (☰)
3. ✅ **Expected:** 
   - Menu slides in
   - All nav links visible
   - Profile dropdown works
   - Clicking link closes menu

### Test 9: Footer Links
1. Scroll to bottom
2. Click links in each column:
   - Plan Your Trip
   - Discover
   - Account
3. ✅ **Expected:** All links navigate correctly

### Test 10: Social Links
1. Click social media icons in footer
2. ✅ **Expected:** Opens in new tab (Instagram, Twitter, Facebook)

---

## 🌍 Explorer Testing

### Test 11: Destination Search
1. Go to Explorer page
2. Type "paris" in search box
3. ✅ **Expected:** 
   - Autocomplete shows Paris with image
   - Shows rating and category
   - Click suggestion → fills search

### Test 12: Category Filters
1. Click "Beach & Coastal" filter
2. ✅ **Expected:** Shows only beach destinations
3. Click "Cultural"
4. ✅ **Expected:** Shows only cultural destinations
5. Click "All"
6. ✅ **Expected:** Shows all 22 destinations

### Test 13: Sort Functionality
1. Select "Sort: A–Z"
2. ✅ **Expected:** Destinations sorted alphabetically
3. Select "Sort: Top Rated"
4. ✅ **Expected:** Destinations sorted by rating (highest first)

### Test 14: Destination Detail View
1. Click any destination card
2. ✅ **Expected:**
   - Detail panel slides in from right
   - Shows image, description, weather, visa, season
   - Shows all tags
   - "✈️ Book This Destination" button visible

### Test 15: Book Destination
1. Open destination detail (e.g., Kyoto)
2. Click "✈️ Book This Destination"
3. ✅ **Expected:**
   - Redirects to Bookings page
   - Shows 5 new bookings:
     - ✈️ Outbound flight (JFK → Destination)
     - ✈️ Return flight (Destination → JFK)
     - 🏨 Hotel (5 nights)
     - 🚗 Airport transfer (arrival)
     - 🚗 Hotel transfer (departure)
   - All have realistic dates (2 months from now)
   - All have random but realistic prices
   - Status: "Pending"

---

## 🎫 Bookings Testing

### Test 16: View Bookings
1. Go to Bookings page
2. ✅ **Expected:**
   - Default Amalfi Coast bookings visible
   - Stats show totals (flights, hotels, transfers, cost)
   - "💳 Proceed to Checkout" button if confirmed bookings exist

### Test 17: Filter by Type
1. Click "✈️ Flights" tab
2. ✅ **Expected:** Shows only flights
3. Click "🏨 Hotels" tab
4. ✅ **Expected:** Shows only hotels
5. Click "🚗 Transfers" tab
6. ✅ **Expected:** Shows only transfers
7. Click "All" tab
8. ✅ **Expected:** Shows everything

### Test 18: Booking Detail View
1. Click any booking card
2. ✅ **Expected:**
   - Detail panel opens on right
   - Shows all booking information
   - Edit, Status dropdown, Delete buttons visible

### Test 19: Add New Flight
1. Click "✈️ Add Flight" button
2. Fill form:
   - Airline: "Delta"
   - Flight No: "DL 123"
   - From: "Los Angeles (LAX)"
   - To: "London (LHR)"
   - Departure: (select date/time)
   - Price: 850
3. Click Save
4. ✅ **Expected:**
   - Modal shows "Saved!" briefly
   - New flight appears in list
   - Detail view opens automatically

### Test 20: Edit Booking
1. Click any booking to open detail
2. Click "✏️ Edit"
3. Change price to 999
4. Click Save
5. ✅ **Expected:**
   - Modal closes
   - Price updated in card and detail view

### Test 21: Change Status
1. Open booking detail
2. Change status dropdown from "Pending" to "Confirmed"
3. ✅ **Expected:**
   - Badge color changes (yellow → green)
   - Badge text updates
   - Stats update if needed

### Test 22: Delete Booking
1. Open booking detail
2. Click "🗑️ Delete"
3. ✅ **Expected:**
   - Booking removed from list
   - Detail panel closes
   - Stats update

### Test 23: Add Hotel
1. Click "🏨 Add Hotel"
2. Fill form with hotel details
3. Add amenities (type and click +)
4. ✅ **Expected:**
   - Amenity chips appear
   - Can remove amenities
   - Form saves successfully

### Test 24: Add Transfer
1. Click "🚗 Add Transfer"
2. Fill form with transfer details
3. Save
4. ✅ **Expected:** Transfer appears with route visualization

---

## 💳 Checkout Testing

### Test 25: Checkout Flow
1. Ensure you have confirmed bookings
2. Click "💳 Proceed to Checkout"
3. ✅ **Expected:**
   - Redirects to Checkout page
   - Shows booking summary
   - Shows total amount
   - Payment form visible

### Test 26: Payment Form Validation
1. Click "Complete Payment" without filling
2. ✅ **Expected:** Browser validation errors
3. Fill only card number
4. ✅ **Expected:** Still shows validation errors
5. Fill all fields
6. ✅ **Expected:** No validation errors

### Test 27: Complete Payment
1. Fill payment form:
   - Card: 4111 1111 1111 1111
   - Expiry: 12/25
   - CVV: 123
   - Name: Test User
   - Billing address
2. Click "Complete Payment"
3. ✅ **Expected:**
   - Shows processing state
   - Redirects to Payment Success page
   - Shows confirmation message
   - Shows booking references

---

## 📅 Itinerary Testing

### Test 28: Add Itinerary Day
1. Go to Itinerary page
2. Click "➕ Add Day"
3. Fill form:
   - Date: (select date)
   - Title: "Explore Amalfi"
4. Save
5. ✅ **Expected:** New day card appears

### Test 29: Add Activity
1. Open a day card
2. Click "Add Activity"
3. Fill activity details
4. ✅ **Expected:** Activity appears in timeline

### Test 30: Drag and Drop (if implemented)
1. Try dragging activities
2. ✅ **Expected:** Reorder works smoothly

---

## 🌤️ Weather Testing

### Test 31: Search City
1. Go to Weather page
2. Type "London" in search
3. ✅ **Expected:**
   - Shows current weather
   - Shows 5-day forecast
   - Shows UV index, humidity, wind

### Test 32: Switch Units
1. Click Fahrenheit/Celsius toggle
2. ✅ **Expected:** Temperatures convert

---

## ✅ Checklist Testing

### Test 33: Add Checklist Item
1. Go to Checklist page
2. Find a category (e.g., Documents)
3. Type new item "Travel Insurance"
4. Press Enter
5. ✅ **Expected:** Item added to list

### Test 34: Toggle Item
1. Click checkbox on any item
2. ✅ **Expected:**
   - Item marked as complete
   - Strikethrough applied
   - Progress bar updates

### Test 35: Delete Item
1. Click delete button on item
2. ✅ **Expected:**
   - Item removed
   - Progress updates

---

## ⭐ Reviews Testing

### Test 36: Write Review
1. Go to Reviews page
2. Click "Write a Review"
3. Fill form:
   - Destination: Select from dropdown
   - Rating: 5 stars
   - Title: "Amazing experience!"
   - Review text
4. Submit
5. ✅ **Expected:** Review appears in list

### Test 37: Filter Reviews
1. Select destination filter
2. ✅ **Expected:** Shows only that destination's reviews
3. Select rating filter
4. ✅ **Expected:** Shows only matching ratings

---

## 👤 Profile Testing

### Test 38: View Profile
1. Go to Profile page
2. ✅ **Expected:**
   - Shows username
   - Shows badges earned
   - Shows stats (trips, countries, etc.)
   - Shows activity log

### Test 39: Edit Profile (if implemented)
1. Click "Edit Profile"
2. Change bio
3. Save
4. ✅ **Expected:** Changes persist

---

## ⚙️ Settings Testing

### Test 40: Change Theme
1. Go to Settings page
2. Toggle "Dark Mode" (if available)
3. ✅ **Expected:** Theme changes across all pages

### Test 41: Change Preferences
1. Change currency
2. Change units
3. Save
4. ✅ **Expected:** Changes reflected in bookings/weather

---

## 📱 Responsive Testing

### Test 42: Mobile View (320px - 768px)
1. Resize browser to 375px width
2. Test:
   - Hamburger menu works
   - All pages scroll properly
   - Forms are usable
   - Buttons are tappable
   - No horizontal scroll

### Test 43: Tablet View (768px - 1024px)
1. Resize to 768px
2. ✅ **Expected:**
   - Layout adjusts gracefully
   - 2-column grids where appropriate
   - Touch targets adequate

### Test 44: Desktop View (1024px+)
1. Resize to 1920px
2. ✅ **Expected:**
   - Content centered with max-width
   - Multi-column layouts
   - Hover effects work

---

## ⚡ Performance Testing

### Test 45: Page Load Speed
1. Open DevTools → Network
2. Hard refresh (Ctrl+Shift+R)
3. ✅ **Expected:** Page loads in < 3 seconds

### Test 46: Image Loading
1. Scroll through destinations
2. ✅ **Expected:** Images lazy load as you scroll

### Test 47: LocalStorage Persistence
1. Add bookings
2. Close browser completely
3. Open again
4. ✅ **Expected:** Bookings still there

---

## 🔒 Security Testing

### Test 48: XSS Prevention
1. Try entering `<script>alert('XSS')</script>` in form
2. ✅ **Expected:** Rendered as text, not executed

### Test 49: Token Expiry
1. Login
2. Wait 1 hour
3. Try to access protected route
4. ✅ **Expected:** Redirects to login

### Test 50: SQL Injection Prevention (N/A - MongoDB)
1. Try entering `' OR '1'='1` in login
2. ✅ **Expected:** Treated as username, login fails safely

---

## 🌐 Backend Testing

### Test 51: API Endpoints
Use Postman or curl:

```bash
# Register
curl -X POST http://localhost:7000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"apitest","password":"test123"}'

# Login
curl -X POST http://localhost:7000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"apitest","password":"test123"}'

# Get Destinations
curl http://localhost:7000/destinations
```

✅ **Expected:** Proper JSON responses

### Test 52: MongoDB Connection
1. Check backend console
2. ✅ **Expected:** "Connected to MongoDB successfully!"

### Test 53: CORS
1. Try accessing API from frontend
2. ✅ **Expected:** No CORS errors in console

---

## 🐛 Error Handling Testing

### Test 54: Network Offline
1. Disconnect internet
2. Try to login
3. ✅ **Expected:** 
   - Falls back to demo mode
   - Shows error message

### Test 55: Invalid Credentials
1. Enter wrong password
2. ✅ **Expected:** "Invalid password" error message

### Test 56: Empty Form Submit
1. Leave form fields empty
2. Try to submit
3. ✅ **Expected:** Validation errors shown

### Test 57: Server Error
1. Stop backend
2. Try to register
3. ✅ **Expected:**
   - Demo mode activated OR
   - "Server unavailable" message

---

## 🎨 UI/UX Testing

### Test 58: Button Hover Effects
1. Hover over all buttons
2. ✅ **Expected:** 
   - Color changes
   - Shadow increases
   - Smooth transitions

### Test 59: Form Focus States
1. Tab through forms
2. ✅ **Expected:** Clear focus indicators

### Test 60: Loading States
1. Submit forms
2. ✅ **Expected:** Loading spinners or text ("Signing in...")

---

## 🔄 State Management Testing

### Test 61: Multi-Tab Sync
1. Open in two tabs
2. Login in one
3. ✅ **Expected:** Other tab should detect (on interaction)

### Test 62: Browser Back Button
1. Navigate: Home → Explorer → Bookings
2. Click back button twice
3. ✅ **Expected:** Returns to Home

---

## ✅ Test Summary Template

After completing tests, fill this out:

```
Total Tests: 62
Passed: __
Failed: __
Skipped: __

Critical Issues: __
Minor Issues: __
Enhancements: __

Status: [ ] Ready for Production [ ] Needs Work
```

---

## 🚀 Deployment Testing (Before Going Live)

1. [ ] Build completes without errors
2. [ ] All environment variables set
3. [ ] HTTPS enabled
4. [ ] Database secured
5. [ ] API rate limiting enabled
6. [ ] Error logging configured
7. [ ] Analytics integrated
8. [ ] SEO meta tags added
9. [ ] Sitemap generated
10. [ ] 404 page works

---

**Happy Testing! 🎉**
