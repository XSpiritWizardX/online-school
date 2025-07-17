import "./Footer.css";
import { NavLink } from "react-router-dom";

function FooterCard() {
  return (
    <div className="foot-container">
      <footer className="foot">
        <div className="resource-col">
          <h5>Get Connected</h5>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Connectivity
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Dashboard
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <NavLink to="/terms-of-service" className="foot-links">
              Terms of Service
            </NavLink>
          </div>

          <div to="/coming-soon" className="foot-links">
            <NavLink to="/privacy-policy" className="foot-links">
              Privacy Policy
            </NavLink>
          </div>

          <div to="/coming-soon" className="foot-links">
            <NavLink to="/cookies-policy" className="foot-links">
              Cookie Policy
            </NavLink>
          </div>
        </div>

        <div className="resource-col">
          <h5>Resources</h5>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Using Online School
            </a>
          </div>

          <a
            href="https://github.com/XSpiritWizardX/online-school/wiki"
            target="_self"
            className="foot-links"
          >
            Docs
          </a>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Support
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Supported Hardware
            </a>
          </div>
        </div>

        <div className="resource-col">
          <h5>Pricing</h5>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Pricing Overview
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Flexible Plans
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Free Version
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Subscriptions
            </a>
          </div>
        </div>

        {/* DEVELOPERS */}
        <div className="resource-col">
          <h5>Developers</h5>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Forum
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Projects
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Team Comments
            </a>
          </div>
        </div>

        {/* COMPANY */}
        <div className="resource-col">
          <h5>Company</h5>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              About Us
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Blog
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Partnerships
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Affiliate Program
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Careers
            </a>
          </div>
        </div>

        {/* SOCIAL */}

        <div className="resource-col">
          <h5>Social</h5>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Twitter
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Facebook
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Linkedin
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Github
            </a>
          </div>

          <div to="/coming-soon" className="foot-links">
            <a to="/coming-soon" className="foot-links">
              Discord
            </a>
          </div>
        </div>
      </footer>

      <p className="copyright-text">@2025 Online School</p>
    </div>
  );
}

export default FooterCard;
