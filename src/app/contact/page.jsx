'use client'
import styles from './contact.module.css'
import Image from 'next/image';



const ContactPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const mailData = {
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: `
        <h3>New message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.jpg" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" placeholder="Name and Surname" name="name" required />
          <input type="email" placeholder="Email Address" name="email" required />
          <input type="text" placeholder="Phone Number (Optional)" name="phone" />
          <textarea name="message" cols="30" rows="10" placeholder="Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
