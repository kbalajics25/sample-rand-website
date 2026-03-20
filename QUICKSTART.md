# 🚀 QUICK START GUIDE - DesignNest Studio

## Get Your Website Running in 3 Steps!

### Step 1: Install Python Dependencies
```bash
cd designnest-studio
pip install Flask==3.0.0
```

### Step 2: Run the Server
```bash
python app.py
```

### Step 3: Open in Browser
Navigate to: **http://localhost:5000**

That's it! Your unique interior design website is now live! 🎉

---

## 🌟 What You'll See

1. **Beautiful Hero Section** with floating cards and animations
2. **Interactive Style Quiz** - AI-powered design matching
3. **Smart Cost Calculator** - Real-time transparent pricing with eco-scores
4. **Free Site Visit Booking** - With complimentary 2D layout
5. **Portfolio Gallery** - Stunning project showcases
6. **Contact Forms** - Fully functional with success modals

---

## 🎯 Key Features to Test

### 1. Take the Style Quiz
- Click "Start Style Quiz" button
- Answer 5 questions
- Get personalized design recommendations

### 2. Calculate Your Project Cost
- Go to Calculator section
- Enter your property details
- Select quality tier
- Choose rooms to design
- Get instant estimate with eco-score!

### 3. Book Free Site Visit
- Fill out the site visit form
- Select your preferred date/time
- Get confirmation message
- **Includes FREE 2D layout plan!**

---

## 💡 Customization Tips

### Change Colors
Edit `static/css/style.css` - Line 1-15 (CSS variables)
```css
--primary-color: #6366f1;  /* Change this */
--secondary-color: #10b981; /* And this */
```

### Change Company Name
Search and replace "DesignNest Studio" in:
- `templates/index.html`
- `README.md`

### Update Contact Info
Edit in `templates/index.html` - Contact Section (line ~1450)

### Modify Pricing
Edit `app.py` - Line 105-115 (base_rates)

---

## 📱 Mobile Responsive
- Fully responsive on all devices
- Hamburger menu on mobile
- Touch-friendly interface

---

## 🆘 Troubleshooting

**Port 5000 already in use?**
```bash
python app.py --port 8000
```
Or kill the process using port 5000

**Flask not found?**
```bash
pip install --upgrade Flask
```

**Static files not loading?**
- Check if `static/` folder exists
- Ensure files are in correct locations
- Clear browser cache (Ctrl+F5)

---

## 🎨 Why This Website is Unique

✅ **AI-Powered Style Quiz** - No competitor has this
✅ **Eco-Score Rating** - Sustainability-focused design
✅ **Free Site Visit + 2D Layout** - Clear value proposition
✅ **Transparent Calculator** - Real-time cost breakdown
✅ **Modern Design** - Gradients, animations, floating cards
✅ **Original Content** - 100% unique, no copyright issues

---

## 📞 Support

Need help? Check the full README.md for:
- Complete API documentation
- Deployment instructions
- Database integration guide
- Advanced features roadmap

---

**Enjoy your new interior design website! 🏠✨**
