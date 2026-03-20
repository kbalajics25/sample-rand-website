# DesignNest Studio - Interior Design Website

A completely unique, full-stack interior design website built with Flask, HTML, CSS, and JavaScript. This website offers innovative features not found in existing interior design platforms.

## 🎨 Unique Features

### What Makes DesignNest Studio Different:

1. **AI-Powered Style Quiz**
   - Interactive personality-based design matching
   - Intelligent algorithm suggests design styles based on user preferences
   - Personalized color, material, and furniture recommendations

2. **Free Site Visit with 2D Layout**
   - Complimentary professional site measurement
   - FREE 2D floor plan and layout design
   - Instant cost estimation on-site

3. **Smart Cost Calculator**
   - Real-time transparent pricing
   - Detailed breakdown by room and material quality
   - No hidden charges

4. **Eco-Score Rating System**
   - Sustainability score (0-100) for every design element
   - Carbon-neutral commitment
   - Green material recommendations

5. **Timeline Transparency**
   - Exact project completion date calculator
   - Live progress tracking (concept)
   - 45-day move-in guarantee

6. **Modern Design Aesthetic**
   - Gradient accents and smooth animations
   - Floating cards and parallax effects
   - Fully responsive mobile-first design

## 🚀 Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Icons**: Font Awesome 6.4.0
- **No Database Required**: Uses in-memory storage (easily extensible to SQLAlchemy)

## 📁 Project Structure

```
designnest-studio/
├── app.py                      # Flask application with all routes
├── requirements.txt            # Python dependencies
├── templates/
│   └── index.html             # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css          # Complete styling with animations
│   └── js/
│       └── script.js          # All interactive features
└── README.md                  # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Run the Application

```bash
python app.py
```

### Step 3: Access the Website

Open your browser and navigate to:
```
http://localhost:5000
```

## 🎯 Features Walkthrough

### 1. Homepage Hero Section
- Eye-catching gradient design
- Floating animated cards
- Trust badges (10-Year Warranty, ISO Certified, Carbon Neutral)
- Quick stats (5000+ Homes, 98% Satisfaction, 45 Days Guarantee)

### 2. How It Works
- 4-step timeline visualization
- Free site visit with 2D layout
- AI design consultation
- Smart execution with live tracking
- Move-in ready handover

### 3. Services Section
- Living Room Design
- Modular Kitchen
- Bedroom Interiors
- Bathroom Renovation
- Wardrobe Solutions
- False Ceiling
Each with Eco-Score rating

### 4. Style Quiz
- 5-question interactive quiz
- AI-powered style matching
- Personalized recommendations:
  - Color palettes
  - Material suggestions
  - Furniture styles
- Styles: Modern, Traditional, Minimalist, Eclectic, Scandinavian

### 5. Cost Calculator
- Property type selection (1 BHK to Villa)
- Carpet area input
- Quality tiers (Economy, Standard, Premium, Luxury)
- Room selection (multiple)
- Real-time cost calculation with:
  - Total cost
  - Cost per sqft
  - Timeline estimate
  - Eco-score
  - Detailed breakdown

### 6. Free Site Visit Booking
- Full form with validation
- Schedule preferred date and time
- Address and property details
- Confirmation message
- No obligation commitment

### 7. Portfolio Gallery
- Beautiful gradient backgrounds
- Project details (area, timeline, eco-score)
- Hover effects
- City-wise showcase

### 8. Testimonials
- Real client reviews
- 5-star ratings
- Location and project type

### 9. Contact Section
- Contact information
- Message form
- Social media links
- Experience center locations

### 10. Footer
- Newsletter subscription
- Quick links
- Company information
- Trust badges

## 🔧 API Endpoints

### POST /api/style-quiz
Calculate design style based on quiz answers
```json
{
  "answers": {
    "q1": "clean",
    "q2": "neutral",
    "q3": "functional"
  }
}
```

### POST /api/consultation
Book free consultation
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "property_type": "3bhk",
  "budget_range": "10-15L"
}
```

### POST /api/site-visit
Schedule free site visit
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+91 98765 43210",
  "address": "123 Main St",
  "city": "Mumbai",
  "pincode": "400001",
  "property_type": "2bhk",
  "sqft": 1200,
  "preferred_date": "2025-04-01",
  "preferred_time": "10:00 AM"
}
```

### POST /api/estimate
Calculate cost estimation
```json
{
  "sqft": 1200,
  "property_type": "2bhk",
  "quality": "standard",
  "rooms": ["living_room", "bedroom", "kitchen"]
}
```

### POST /api/newsletter
Subscribe to newsletter
```json
{
  "email": "user@example.com"
}
```

### POST /api/contact
Send contact message
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "message": "Interested in kitchen renovation"
}
```

## 🎨 Design System

### Color Palette
- Primary: #6366f1 (Indigo)
- Secondary: #10b981 (Green)
- Accent: #f59e0b (Amber)
- Text: #1f2937 (Dark Gray)

### Typography
- Headings: Playfair Display (Serif)
- Body: Inter (Sans-serif)

### Components
- Buttons with hover effects
- Cards with shadows
- Forms with validation
- Modals for confirmations
- Responsive navigation
- Animated sections

## 📱 Responsive Design

- Desktop: 1200px+ (Full layout)
- Tablet: 768px-1199px (Adapted grid)
- Mobile: 320px-767px (Stacked layout)

## 🔒 Copyright & Originality

This website is **100% original** and does not copy any existing interior design websites. All features, designs, and implementations are unique:

- **Brand Name**: DesignNest Studio (completely new)
- **Color Scheme**: Custom gradient-based palette
- **Layout**: Original grid and section designs
- **Features**: Unique AI quiz, eco-scoring, and transparent calculator
- **Content**: All text, descriptions, and copy are original
- **Images**: Using gradient placeholders (replace with your own)

## 🚀 Deployment Options

### Option 1: Local Development
```bash
python app.py
```

### Option 2: Production (Gunicorn)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Option 3: Docker
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

### Option 4: Cloud Platforms
- **Heroku**: Push to Heroku with Procfile
- **AWS**: Deploy on EC2 or Elastic Beanstalk
- **DigitalOcean**: Use App Platform
- **Vercel/Netlify**: For static hosting (need API separation)

## 📈 Future Enhancements

1. **Database Integration**
   - SQLAlchemy with PostgreSQL
   - User authentication
   - Project management dashboard

2. **Advanced Features**
   - 3D room visualization
   - AR preview (mobile)
   - Real-time chat support
   - Payment gateway integration
   - Project timeline tracking portal

3. **AI Enhancements**
   - Image recognition for style matching
   - Budget optimization algorithms
   - Material recommendation engine

4. **Admin Dashboard**
   - Manage consultations
   - Track site visits
   - Analytics and reporting
   - Lead management

## 🤝 Support

For any questions or issues:
- Email: hello@designnest.studio
- Phone: +91 98765 43210

## 📄 License

This is a custom-built website for DesignNest Studio. All rights reserved.

## 🎉 Credits

- **Design & Development**: Custom-built from scratch
- **Fonts**: Google Fonts
- **Icons**: Font Awesome
- **Framework**: Flask (Python)

---

Built with ❤️ for modern interior design experiences.
