import "./CookiePolicy.css";

const CookiesPolicy = () => {
  return (
    <div className="cookies-container">
      <h1>Cookies Policy</h1>
      <p>
        <strong>Effective Date:</strong> [Insert Date]
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files placed on your device when you
        visit a website. They are used to store information about your
        visit, such as login status, preferences, and browsing
        behavior.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>Online School uses cookies for the following purposes:</p>
      <ul>
        <li>
          <strong>Essential Cookies:</strong> Required to operate core
          features (e.g., login, account security)
        </li>
        <li>
          <strong>Functional Cookies:</strong> To remember your
          settings and preferences (like dark mode or language)
        </li>
        <li>
          <strong>Performance Cookies:</strong> Help us understand how
          users interact with the site (analytics)
        </li>
      </ul>

      <h2>
        3. Cookies We Do <em>Not</em> Use
      </h2>
      <ul>
        <li>No marketing/advertising cookies</li>
        <li>No third-party ad trackers</li>
        <li>No behavioral profiling or retargeting</li>
      </ul>

      <h2>4. Third-Party Services</h2>
      <p>
        We may use privacy-respecting services such as Google
        Analytics (in compliance with FERPA/COPPA) or similar tools to
        analyze usage patterns. These services may set their own
        cookies in your browser.
      </p>

      <h2>5. Managing Cookies</h2>
      <p>
        You can control or delete cookies through your browser
        settings. Most browsers allow you to block or remove cookies
        altogether. However, disabling essential cookies may limit
        your ability to use the platform effectively.
      </p>

      <h2>6. Do Not Track</h2>
      <p>
        We honor &quot;Do Not Track&quot; signals where supported by
        browsers, and we do not collect or share data for advertising.
      </p>

      <h2>7. Updates</h2>
      <p>
        We may update this policy as needed to remain compliant. All
        changes will be posted here, and users will be notified of
        significant updates.
      </p>

      <h2>8. Contact</h2>
      <p>
        If you have questions about our cookie usage, email us at
        [Insert Contact Email].
      </p>
    </div>
  );
};

export default CookiesPolicy;
