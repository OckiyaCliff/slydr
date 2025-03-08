import Link from "next/link"

export default function CookiesPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <h2>What are cookies?</h2>
        <p>
          Cookies are small text files that are stored on your computer or mobile device when you visit a website. They
          are widely used to make websites work more efficiently and provide information to the website owners.
        </p>

        <h2>How we use cookies</h2>
        <p>Slydr uses cookies for several purposes, including:</p>
        <ul>
          <li>
            <strong>Essential cookies:</strong> These cookies are necessary for the website to function properly. They
            enable core functionality such as security, network management, and account access. You cannot opt out of
            these cookies.
          </li>
          <li>
            <strong>Performance cookies:</strong> These cookies help us understand how visitors interact with our
            website by collecting and reporting information anonymously. This helps us improve our website.
          </li>
          <li>
            <strong>Functionality cookies:</strong> These cookies enable the website to provide enhanced functionality
            and personalization. They may be set by us or by third-party providers whose services we have added to our
            pages.
          </li>
          <li>
            <strong>Targeting cookies:</strong> These cookies may be set through our site by our advertising partners.
            They may be used by those companies to build a profile of your interests and show you relevant
            advertisements on other sites.
          </li>
          <li>
            <strong>Blockchain-related cookies:</strong> These cookies help us manage your wallet connection and
            blockchain interactions on our platform.
          </li>
        </ul>

        <h2>Cookies we use</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Cookie Name</th>
                <th className="text-left py-3 px-4">Purpose</th>
                <th className="text-left py-3 px-4">Duration</th>
                <th className="text-left py-3 px-4">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">slydr_session</td>
                <td className="py-3 px-4">Maintains your session state</td>
                <td className="py-3 px-4">Session</td>
                <td className="py-3 px-4">Essential</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">slydr_theme</td>
                <td className="py-3 px-4">Remembers your theme preference (light/dark)</td>
                <td className="py-3 px-4">1 year</td>
                <td className="py-3 px-4">Functionality</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">slydr_wallet_connected</td>
                <td className="py-3 px-4">Remembers if you've connected your wallet</td>
                <td className="py-3 px-4">30 days</td>
                <td className="py-3 px-4">Functionality</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">_ga</td>
                <td className="py-3 px-4">Google Analytics - Used to distinguish users</td>
                <td className="py-3 px-4">2 years</td>
                <td className="py-3 px-4">Performance</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">_gid</td>
                <td className="py-3 px-4">Google Analytics - Used to distinguish users</td>
                <td className="py-3 px-4">24 hours</td>
                <td className="py-3 px-4">Performance</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Managing cookies</h2>
        <p>Most web browsers allow you to manage your cookie preferences. You can:</p>
        <ul>
          <li>Delete cookies from your device</li>
          <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
          <li>Set your browser to notify you when you receive a cookie</li>
        </ul>

        <p>
          Please note that if you choose to block or delete cookies, you may not be able to access certain areas or
          features of our website, and some services may not function properly.
        </p>

        <h3>How to manage cookies in different browsers:</h3>
        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
            >
              Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h2>Third-party cookies</h2>
        <p>Some cookies are placed by third parties on our website. These third parties may include:</p>
        <ul>
          <li>Analytics providers (such as Google Analytics)</li>
          <li>Advertising networks</li>
          <li>Social media platforms</li>
          <li>Blockchain wallet providers</li>
        </ul>
        <p>
          We do not control these third-party cookies. You can manage these cookies through your browser settings or by
          visiting the relevant third-party websites.
        </p>

        <h2>Changes to our Cookie Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated
          revision date.
        </p>

        <h2>Contact us</h2>
        <p>If you have any questions about our Cookie Policy, please contact us at:</p>
        <p>
          Email: privacy@slydr.io
          <br />
          Address: 123 Blockchain Way, Web3 City, 94105
        </p>

        <p>
          For more information about how we protect your data, please see our{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

