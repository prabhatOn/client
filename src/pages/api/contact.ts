import type { NextApiRequest, NextApiResponse } from 'next'
const nodemailer = require('nodemailer')

type ContactFormData = {
  name: string
  email: string
  mobile: string
  subject: string
  message: string
}

type ProductEnquiryData = {
  email: string
  mobile: string
  company?: string
  quantity?: string
  requirements: string
  productName: string
  enquiryType: string
}

type FormData = ContactFormData | ProductEnquiryData

function isContactForm(data: FormData): data is ContactFormData {
  return 'name' in data && 'subject' in data && 'message' in data
}

function isProductEnquiry(data: FormData): data is ProductEnquiryData {
  return 'productName' in data && 'enquiryType' in data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const formData: FormData = req.body

    // Create timestamp
    const timestamp = new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    })

    if (isContactForm(formData)) {
      // Handle contact form
      const { name, email, mobile, subject, message } = formData

      // Validate required fields
      if (!name || !email || !mobile || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' })
      }

      // Send Email
      await sendContactEmail({ name, email, mobile, subject, message, timestamp })

      // Send WhatsApp notification
      await sendWhatsAppNotification({ name, email, mobile, subject, message, timestamp, type: 'contact' })

    } else if (isProductEnquiry(formData)) {
      // Handle product enquiry
      const { email, mobile, company, quantity, requirements, productName } = formData

      // Validate required fields
      if (!email || !mobile || !requirements || !productName) {
        return res.status(400).json({ message: 'Email, mobile, requirements, and product name are required' })
      }

      // Send Email
      await sendProductEnquiryEmail({ email, mobile, company, quantity, requirements, productName, timestamp })

      // Send WhatsApp notification
      await sendWhatsAppNotification({ 
        name: company || 'Customer', 
        email, 
        mobile, 
        subject: `Product Enquiry: ${productName}`, 
        message: requirements, 
        timestamp, 
        type: 'product-enquiry',
        productName,
        quantity
      })

    } else {
      return res.status(400).json({ message: 'Invalid form data' })
    }

    res.status(200).json({ 
      message: 'Form submitted successfully! We will contact you soon.',
      success: true 
    })

  } catch (error) {
    console.error('Error processing form:', error)
    res.status(500).json({ 
      message: 'There was an error processing your request. Please try again.',
      success: false 
    })
  }
}

// Email sending function for contact forms
async function sendContactEmail(data: ContactFormData & { timestamp: string }) {
  try {
    console.log('Starting email sending process...')
    console.log('Nodemailer object:', typeof nodemailer)
    console.log('createTransport function:', typeof nodemailer.createTransport)
    
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER, // Your Gmail address
        pass: process.env.SMTP_PASS, // Your Gmail app password
      },
    })

    console.log('Transporter created successfully')

    // Verify transporter configuration
    await transporter.verify()
    console.log('SMTP connection verified')

    // Email to you (business owner)
    const businessEmailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.BUSINESS_EMAIL || 'dpenterprises2007@gmail.com',
      subject: `🔔 New Contact Form Submission - ${data.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #11497b, #1e5a8a); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-left: 4px solid #fbbf24; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #11497b; }
            .value { background: white; padding: 10px; border-radius: 4px; margin-top: 5px; }
            .message-box { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #11497b; }
            .footer { background: #11497b; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏢 DP Enterprises - New Contact Form Submission</h1>
              <p>You have received a new inquiry through your website!</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">👤 Customer Name:</div>
                <div class="value">${data.name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email Address:</div>
                <div class="value">${data.email}</div>
              </div>
              
              <div class="field">
                <div class="label">📱 Mobile Number:</div>
                <div class="value">${data.mobile}</div>
              </div>
              
              <div class="field">
                <div class="label">📋 Subject:</div>
                <div class="value">${data.subject}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div class="field">
                <div class="label">🕐 Submitted On:</div>
                <div class="value">${data.timestamp}</div>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>DP Enterprises</strong> | Milton Roy Authorized Partner</p>
              <p>This email was automatically generated from your website contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Auto-reply email to customer
    const customerEmailOptions = {
      from: process.env.SMTP_USER,
      to: data.email,
      subject: '✅ Thank you for contacting DP Enterprises - We\'ll be in touch soon!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #11497b, #1e5a8a); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .highlight { background: #fbbf24; color: #1f2937; padding: 10px; border-radius: 4px; font-weight: bold; text-align: center; margin: 20px 0; }
            .contact-info { background: white; padding: 15px; border-radius: 4px; margin: 15px 0; }
            .footer { background: #11497b; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🙏 Thank You, ${data.name}!</h1>
              <p>We've received your inquiry about: <strong>${data.subject}</strong></p>
            </div>
            
            <div class="content">
              <div class="highlight">
                ⚡ Our team will contact you within 24 hours!
              </div>
              
              <p>Dear ${data.name},</p>
              <p>Thank you for reaching out to <strong>DP Enterprises</strong>. We appreciate your interest in our Milton Roy industrial pumping solutions.</p>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>📞 Our technical expert will contact you within 24 hours</li>
                <li>💼 We'll discuss your specific industrial pumping requirements</li>
                <li>📋 Receive a customized quote and solution proposal</li>
                <li>🤝 Get ongoing support from our experienced team</li>
              </ul>
              
              <div class="contact-info">
                <h3>📞 Need immediate assistance?</h3>
                <p><strong>Phone:</strong> +91-7000901447</p>
                <p><strong>Email:</strong> Prabhatchaubey56@gmail.com</p>
                <p><strong>WhatsApp:</strong> +91-7000901447</p>
              </div>
              
              <p>We serve across <strong>Madhya Pradesh, Chhattisgarh, and Vidharbha (Nagpur)</strong> with comprehensive industrial pumping solutions.</p>
            </div>
            
            <div class="footer">
              <p><strong>DP Enterprises</strong> | Milton Roy Authorized Partner</p>
              <p>Excellence in precision pumping solutions since 2007</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Send both emails
    console.log('Sending business email...')
    await transporter.sendMail(businessEmailOptions)
    console.log('Business email sent successfully')
    
    console.log('Sending customer auto-reply...')
    await transporter.sendMail(customerEmailOptions)
    console.log('Customer auto-reply sent successfully')
    
  } catch (error) {
    console.error('Error in email setup:', error)
    throw new Error(`Email configuration error: ${error}`)
  }
}

// Email sending function for product enquiries
async function sendProductEnquiryEmail(data: Omit<ProductEnquiryData, 'enquiryType'> & { timestamp: string }) {
  try {
    console.log('Starting product enquiry email sending process...')
    
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Verify transporter configuration
    await transporter.verify()
    console.log('SMTP connection verified')

    // Email to business owner
    const businessEmailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.BUSINESS_EMAIL || 'dpenterprises2007@gmail.com',
      subject: `🛒 New Product Enquiry - ${data.productName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #11497b, #1e5a8a); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-left: 4px solid #fbbf24; }
            .product-highlight { background: #fbbf24; color: #1f2937; padding: 15px; border-radius: 4px; font-weight: bold; text-align: center; margin: 20px 0; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #11497b; }
            .value { background: white; padding: 10px; border-radius: 4px; margin-top: 5px; }
            .requirements-box { background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #11497b; }
            .footer { background: #11497b; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛒 New Product Enquiry</h1>
              <p>Someone is interested in your products!</p>
            </div>
            
            <div class="content">
              <div class="product-highlight">
                Product: ${data.productName}
              </div>
              
              <div class="field">
                <div class="label">📧 Email Address:</div>
                <div class="value">${data.email}</div>
              </div>
              
              <div class="field">
                <div class="label">📱 Mobile Number:</div>
                <div class="value">${data.mobile}</div>
              </div>
              
              ${data.company ? `
              <div class="field">
                <div class="label">🏢 Company:</div>
                <div class="value">${data.company}</div>
              </div>
              ` : ''}
              
              ${data.quantity ? `
              <div class="field">
                <div class="label">📦 Required Quantity:</div>
                <div class="value">${data.quantity}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">📝 Detailed Requirements:</div>
                <div class="requirements-box">${data.requirements.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div class="field">
                <div class="label">⏰ Submitted On:</div>
                <div class="value">${data.timestamp}</div>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>DP Enterprises</strong> | Milton Roy Authorized Partner</p>
              <p>Please respond to this enquiry within 24 hours for best customer experience</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Auto-reply email to customer
    const customerEmailOptions = {
      from: process.env.SMTP_USER,
      to: data.email,
      subject: `✅ Thank you for your enquiry about ${data.productName} - DP Enterprises`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #11497b, #1e5a8a); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .product-highlight { background: #fbbf24; color: #1f2937; padding: 15px; border-radius: 4px; font-weight: bold; text-align: center; margin: 20px 0; }
            .contact-info { background: white; padding: 15px; border-radius: 4px; margin: 15px 0; }
            .footer { background: #11497b; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Enquiry Received Successfully!</h1>
              <p>Thank you for your interest in our products</p>
            </div>
            
            <div class="content">
              <p>Dear Valued Customer,</p>
              
              <p>Thank you for your enquiry about <strong>${data.productName}</strong>. We have received your request and our technical team will review your requirements shortly.</p>
              
              <div class="product-highlight">
                Your enquiry: ${data.productName}
              </div>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our technical expert will review your specific requirements</li>
                <li>We'll prepare a detailed quotation with specifications</li>
                <li>You'll receive our response within 24 hours</li>
                <li>We'll schedule a technical discussion if needed</li>
              </ul>
              
              <div class="contact-info">
                <h3>📞 Need immediate assistance?</h3>
                <p><strong>Call us directly:</strong> +91 98765 43210</p>
                <p><strong>Email:</strong> dpenterprises2007@gmail.com</p>
                <p><strong>Business Hours:</strong> Mon-Sat, 9:00 AM - 6:00 PM</p>
              </div>
              
              <p>As authorized partners of Milton Roy, we ensure you receive genuine products with full technical support and warranty.</p>
            </div>
            
            <div class="footer">
              <p><strong>DP Enterprises</strong> | Milton Roy Authorized Partner</p>
              <p>Excellence in precision pumping solutions since 2007</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Send both emails
    console.log('Sending business enquiry email...')
    await transporter.sendMail(businessEmailOptions)
    console.log('Business enquiry email sent successfully')
    
    console.log('Sending customer auto-reply...')
    await transporter.sendMail(customerEmailOptions)
    console.log('Customer auto-reply sent successfully')
    
  } catch (error) {
    console.error('Error in product enquiry email setup:', error)
    throw new Error(`Email configuration error: ${error}`)
  }
}

// WhatsApp notification function
async function sendWhatsAppNotification(data: any) {
  try {
    let whatsappMessage = ''

    if (data.type === 'contact') {
      whatsappMessage = `🔔 *NEW CONTACT FORM SUBMISSION*

*DP Enterprises Website Inquiry*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Mobile:* ${data.mobile}
📋 *Subject:* ${data.subject}

💬 *Message:*
${data.message}

🕐 *Submitted:* ${data.timestamp}

---
Reply to this customer promptly! 🚀`

    } else if (data.type === 'product-enquiry') {
      whatsappMessage = `🛒 *NEW PRODUCT ENQUIRY*

*DP Enterprises Website*

🏷️ *Product:* ${data.productName}
📧 *Email:* ${data.email}
📱 *Mobile:* ${data.mobile}
${data.name && data.name !== 'Customer' ? `🏢 *Company:* ${data.name}` : ''}
${data.quantity ? `📦 *Quantity:* ${data.quantity}` : ''}

📝 *Requirements:*
${data.message}

🕐 *Submitted:* ${data.timestamp}

---
Product enquiry - respond within 24 hours! ⚡`
    }

    // Option 1: Using WhatsApp Business API (requires setup)
    // You would need to set up WhatsApp Business API and get access token
    
    // Option 2: Using a third-party service like Twilio, TextLocal, etc.
    // Example with a webhook URL:
    if (process.env.WHATSAPP_WEBHOOK_URL && whatsappMessage) {
      await fetch(process.env.WHATSAPP_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: process.env.WHATSAPP_NUMBER || '917000901447',
          message: whatsappMessage
        })
      })
    }

    // Option 3: For testing, log the message (remove in production)
    if (whatsappMessage) {
      console.log('WhatsApp Message to be sent:', whatsappMessage)
    }
    
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error)
    // Don't throw error to avoid breaking the entire process
  }
}
