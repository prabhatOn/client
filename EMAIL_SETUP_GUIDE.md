# Email & WhatsApp Integration Setup Guide

## Current Implementation

Your contact form now sends submissions to both **WhatsApp** and **Email** when users fill out the form.

## What Happens When Form is Submitted:

1. **WhatsApp Message**: Opens WhatsApp with pre-filled message to your number
2. **Email**: Opens email client with pre-filled message to your email address
3. **Success Message**: Shows confirmation to the user
4. **Form Reset**: Clears the form after successful submission

## Current Configuration:

### WhatsApp Number:
- **Current**: `919425902891`
- **Format**: Country code (91 for India) + mobile number (without + sign)

### Email Address:
- **Current**: `dpenterprises2007@gmail.com`

## To Update Contact Details:

1. **Change WhatsApp Number** (in contact.tsx):
   ```javascript
   const whatsappNumber = "919425902891" // Replace with your number
   ```

2. **Change Email Address** (in contact.tsx):
   ```javascript
   to_email: 'dpenterprises2007@gmail.com' // Replace with your email
   ```

## Advanced Email Setup (Optional - For Automatic Email Delivery):

For automatic email delivery without opening email client, you can set up **EmailJS**:

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for free account
3. Create a new service (Gmail, Outlook, etc.)
4. Create an email template

### Step 2: Get Credentials
From EmailJS dashboard, get:
- **Service ID**: `service_xxxxxxx`
- **Template ID**: `template_xxxxxxx` 
- **User ID**: `user_xxxxxxxxxxxxxxxx`

### Step 3: Update Code
In `contact.tsx`, replace these lines:
```javascript
const serviceID = 'your_service_id' // Replace with actual Service ID
const templateID = 'your_template_id' // Replace with actual Template ID  
const userID = 'your_user_id' // Replace with actual User ID
```

### Step 4: Uncomment EmailJS Code
Uncomment this line in the `sendEmail` function:
```javascript
// const result = await emailjs.send(serviceID, templateID, emailParams, userID)
```

## Email Template Variables (for EmailJS):
When creating your EmailJS template, use these variables:
- `{{to_email}}` - Your email address
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{from_mobile}}` - Customer's mobile
- `{{subject}}` - Form subject
- `{{message}}` - Customer's message
- `{{timestamp}}` - Submission timestamp

## Sample Email Template:
```
Subject: New Contact Form Submission - {{subject}}

Dear DP Enterprises Team,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Mobile: {{from_mobile}}
Subject: {{subject}}

Message:
{{message}}

Submitted on: {{timestamp}}

Best regards,
DP Enterprises Website
```

## Current Behavior:
- **Development/Testing**: Uses mailto (opens email client)
- **After EmailJS Setup**: Sends emails automatically

## Troubleshooting:
1. **WhatsApp not opening**: Check if WhatsApp is installed
2. **Email not opening**: Check default email client settings
3. **Form not submitting**: Check browser console for errors

## Security Note:
- All email credentials should be stored securely
- EmailJS provides secure email sending without exposing credentials
- Consider adding rate limiting for production use
