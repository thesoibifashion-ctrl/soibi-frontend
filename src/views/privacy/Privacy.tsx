
const dataCategories = [
    ["Account and order data", "Name, email address, phone number, delivery and billing address, order history, size and style preferences", "You"],
    ["Measurements", "Body measurements you give us, from our size charts or the measurements box", "You"],
    ["Payment data", "We do not store your card details. Our payment processor, Paystack, collects and secures them under its own security standards. We receive confirmation of payment and a transaction reference. If you pay by bank transfer, we receive the payer’s name, bank, amount, reference and date from our bank statement and any proof of payment you send us.", "You, the payment processor and our bank"],
    ["Device and browsing data", "IP address, browser type, device identifiers, pages viewed, referring site, and approximate location derived from your IP address", "Your device, through cookies"],
    ["Communications", "Messages and information you send us by email, WhatsApp, a contact form or social media, including images you tag us in", "You"],
    ["Marketing preferences", "Whether you have opted in to receive emails, SMS or WhatsApp messages about new collections, sales or events", "You"],
  ];
  
  const processingPurposes = [
    ["Process and deliver your orders and provide customer service", "Performance of a contract", "Account and order data, measurements, communications", "Order records for six years from the order date. Measurements for three years from your last order, or until you ask us to delete them, whichever is earlier, unless the law requires us to keep them."],
    ["Take payment and prevent fraud", "Performance of a contract; legitimate interests (preventing fraud)", "Payment confirmations, device data", "Transaction records for six years. Security and fraud logs for 12 months."],
    ["Meet tax, accounting and consumer protection obligations", "Legal obligation", "Order and payment records", "Six years"],
    ["Send marketing emails, SMS or WhatsApp messages", "Consent", "Contact details, marketing preferences", "Until you withdraw consent. We then keep a record of your opt-out so that we do not contact you again."],
    ["Analytics and advertising cookies", "Consent", "Device and browsing data", "For the cookie periods in section 6.3"],
    ["Keep the Site secure and understand overall shopping trends", "Legitimate interests", "Device and browsing data", "12 months"],
    ["Handle complaints and legal claims", "Legitimate interests; legal obligation", "Communications, order data", "Six years after the matter is resolved"],
  ];
  
  const cookies = [
    ["cart_session", "Strictly necessary; first-party", "Keeps items in your shopping bag as you browse", "Session (deleted when you close your browser)"],
    ["auth_token", "Strictly necessary; first-party", "Keeps you logged in to your account", "Up to 30 days"],
    ["_soibi_pref", "Functional; first-party", "Remembers language, currency and display preferences", "Up to 12 months"],
    ["_ga", "Analytics; Google", "Measures traffic, popular products and site performance", "Up to 24 months"],
    ["_gid", "Analytics; Google", "Distinguishes visitors for traffic measurement", "24 hours"],
    ["fbp", "Marketing; Meta", "Measures advertising performance", "Up to 90 days"],
    ["fr", "Marketing; Meta", "Delivers and measures relevant SOIBI and ÉRÉME advertising", "Up to 90 days"],
    ["paystack_*", "Strictly necessary; Paystack (payment processor)", "Complete checkout securely", "Session"],
  ];
  
  const sections = [
    {
      title: "1. Introduction & Scope",
      paragraphs: [
        `1.1 The Soibi Fashion (“we,” “us,” “our,” or “SOIBI”) operates the online store at soibifashion.com, through which customers can browse and purchase items from the ÉRÉME collection and our other collections (the “Site”).`,
        `1.2 This Policy explains what personal data we collect when you visit or shop on the Site or contact us, why we collect it, how we use cookies and similar technologies, who we share data with, and the rights available to you.`,
        `1.3 We are based in Nigeria and handle personal data in accordance with the Nigeria Data Protection Act 2023 (“NDPA”) and the General Application and Implementation Directive issued by the Nigeria Data Protection Commission (“NDPC”). Section 13 gives additional information for visitors outside Nigeria.`,
      ],
    },
    {
      title: "2. Key Terms",
      definitions: [
        ["Personal Data:", "any information relating to an identified or identifiable individual, such as a name, email address, phone number, delivery address, IP address or order history."],
        ["Data Controller:", "the entity that decides why and how personal data is processed. Soibi Fashion is the Data Controller for data collected through the Site."],
        ["Data Processor:", "a third party that processes personal data on our instructions, such as our payment gateway, hosting provider or email platform."],
        ["Cookie:", "a small text file placed on your device by a website to store information such as login state or preferences. The term also covers similar technologies such as pixel tags and local storage."],
        ["Consent:", "your freely given, specific, informed and unambiguous agreement, given by a clear action. Silence, inactivity and pre-ticked boxes are not consent."],
      ],
    },
    {
      title: "3. Who We Are and How to Contact Us",
      definitions: [
        ["Controller:", "The Soibi Fashion, CAC Registration No. 6921543."],
        ["Registered address:", "Road 14, Flat 8A, Federal Housing Estate, Agip, Port Harcourt, Rivers State."],
        ["Data Protection Contact:", "The Manager"],
        ["Email:", "thesoibifashion@gmail.com"],
      ],
    },
    {
      title: "5. How and Why We Use Your Personal Data",
      paragraphs: [
        `5.1 The table below shows each purpose, the lawful basis for it under the NDPA, and how long we keep the data. Where we rely on legitimate interests, we have weighed them against your rights, and we do not use legitimate interests to override your choices about cookies or marketing.`,
        `5.2 Giving us your data. You must give us the data needed for an order (your contact and delivery details and your measurements), or we cannot fulfil it. Everything else, including marketing, is optional.`,
        `5.3 Profiling and automated decisions. We do not make decisions about you based solely on automated processing that have legal or similarly significant effects. If you consent to marketing cookies, our advertising partners (for example Meta and Google) may use them to build a profile of your interests and show you relevant advertising. You may withdraw your consent at any time, and you have the right to object to profiling for direct marketing.`,
      ],
    },
    {
      title: "6. How We Use Cookies and Similar Technologies",
      paragraphs: [
        `6.1 We use cookies to operate the Site, remember your preferences, understand how customers shop across the ÉRÉME collection and our other lines, and, where you consent, to show you relevant marketing.`,
        `6.2 Categories. Strictly necessary cookies are required for core functions such as your shopping bag, checkout and account login, and cannot be switched off. Functional cookies remember choices such as currency, language, or previously viewed items. Performance and analytics cookies help us understand traffic and site usage. Marketing and advertising cookies are used by us and our advertising partners to measure and show advertising. We use functional, analytics and marketing cookies only with your consent.`,
        `6.3 Cookies in use on soibifashion.com. The cookies and similar technologies in use at the date of this Policy are:`,
        `6.4 Managing your consent. On your first visit, a cookie banner lets you accept all, reject non-essential cookies, or customise your choices by category. No non-essential cookie is placed before you choose. You can change your preferences or withdraw consent at any time, as easily as you gave it, through the “Cookie Preferences” link in the Site footer. Continued browsing is not consent, and the banner does not use pre-ticked boxes.`,
        `6.5 Browser and device controls. Most browsers let you block or delete cookies, or alert you before a cookie is set. Blocking cookies may affect parts of the Site, such as your shopping bag. You can opt out of Google Analytics with the Google Analytics Opt-out Browser Add-on, and manage advertising personalisation through optout.aboutads.info or optout.networkadvertising.org.`,
        `6.6 Do Not Track. We do not currently respond to Do Not Track browser signals. Please use our cookie preferences to control non-essential cookies.`,
      ],
    },
    {
      title: "7. Who We Share Your Data With",
      paragraphs: [
        `We share personal data only with third parties who need it to help us run the Site and fulfil your order, under written agreements where they act on our behalf. They include:`,
      ],
      bullets: [
        "our payment processor, Paystack, to process card and online payments, and our bank, which receives bank transfers;",
        "couriers (for example DHL), who deliver your order and may use your data as independent controllers for delivery and customs purposes;",
        "website hosting and IT service providers;",
        "Resend, which sends our emails, and messaging platforms such as WhatsApp and Instagram (operated by Meta), which we use to communicate with you;",
        "analytics and advertising partners (for example Google and Meta), where you have consented to analytics or marketing cookies;",
        "our professional advisers, and regulators or law enforcement where the law requires.",
      ],
      extra: ["We do not sell your personal data to anyone."],
    },
    {
      title: "8. Transfers Outside Nigeria",
      paragraphs: [
        `8.1 Many of our service providers are based outside Nigeria, including in the United States, the United Kingdom and the European Union, and delivering an order abroad necessarily sends your delivery details to the destination country.`,
        `8.2 The NDPA allows us to transfer personal data outside Nigeria only where the recipient is subject to a law, binding rules or contract that provide an adequate level of protection, or where another lawful basis applies, such as your informed consent or the need to perform your contract. We use written data processing agreements with standard data protection clauses with our providers, we rely on your consent or the performance of your contract for delivery of your order, and we keep a record of the basis for each transfer.`,
        `8.3 You may ask us for a list of the recipients and countries involved.`,
      ],
    },
    {
      title: "9. Data Retention",
      paragraphs: [
        `We keep personal data only for as long as necessary for the purposes in section 5, including order and tax record-keeping obligations under Nigerian law. After that, we delete the data or anonymise it so that it can no longer identify you. Cookie lifespans are set out in section 6.3.`,
      ],
    },
    {
      title: "10. Your Rights",
      paragraphs: [
        `10.1 Under the NDPA you have the following rights over your personal data:`,
      ],
      bullets: [
        "Access: to ask whether we hold data about you, and to receive a copy;",
        "Correction: to have inaccurate or incomplete data corrected;",
        "Erasure: to ask us to delete your data, subject to legal retention needs;",
        "Restriction: to ask us to limit how we use your data in certain cases;",
        "Objection: to object to processing based on legitimate interests and to any processing for direct marketing, including related profiling;",
        "Withdrawal of consent: to withdraw consent at any time, without affecting earlier lawful processing;",
        "Automated decisions: not to be subject to decisions based solely on automated processing that have significant effects on you;",
        "Portability: to receive your data in a commonly used electronic format, and to have it transmitted to another provider where the law provides and it is technically possible; and",
        "Complaint: to complain to the NDPC (section 15).",
      ],
      extra: [
        `10.2 How to exercise your rights. Write to us at thesoibifashion@gmail.com and tell us what you want. We may need to verify your identity first. We will respond without undue delay and aim to do so within 30 days. We do not charge for requests unless they are clearly unfounded or excessive.`,
      ],
    },
    {
      title: "11. Data Security and Breaches",
      paragraphs: [
        `11.1 We use appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse. These include encryption in transit (HTTPS/TLS), access controls, secure hosting, and written data protection terms with our service providers. No online system is completely secure, and we encourage you to protect your own account credentials.`,
        `11.2 If a personal data breach occurs that is likely to put your rights and freedoms at risk, we will notify the NDPC within 72 hours of becoming aware of it. If the risk to you is high, we will also tell you promptly, in plain language, what has happened and what you can do to protect yourself.`,
      ],
    },
    {
      title: "12. Children’s Privacy",
      paragraphs: [
        `The Site is not directed at children. You must be at least 18 years old to place an order or create an account, and we do not knowingly collect personal data from, or direct marketing at, anyone under 18. If we learn that we hold a child’s personal data without the parental or guardian consent that the NDPA requires, we will delete it.`,
      ],
    },
    {
      title: "13. Visitors Outside Nigeria",
      paragraphs: [
        `13.1 We apply the protections in this Policy to all visitors, wherever they are located.`,
        `13.2 EU and UK visitors. If you are in the European Union or the United Kingdom, the lawful bases in section 5 apply to your data. You give your data to us directly, and we apply the protections in this Policy to it from the moment we receive it. When we in turn share your data with providers outside Nigeria, we do so on the bases described in section 8. You may complain to your local data protection authority, including the UK Information Commissioner’s Office.`,
        `13.3 Other countries. Some countries give residents further privacy rights. If you are in one of them, you may write to us at hello@soibifashion.com, and we will consider your request under the law that applies to you.`,
      ],
    },
    {
      title: "14. Changes to This Policy",
      paragraphs: [
        `We may update this Policy from time to time to reflect changes in our practices or legal requirements, including any regulations issued by the NDPC. The “Last updated” date at the top shows the most recent version. We will highlight material changes with a notice on the Site.`,
      ],
    },
    {
      title: "15. Complaints",
      paragraphs: [
        `If you are not satisfied with our response, you may complain to the Nigeria Data Protection Commission (ndpc.gov.ng). EU and UK visitors may complain to their local data protection authority.`,
      ],
    },
  ];
  
  function FormattedParagraph({ children }: { children: string }) {
    const colonIndex = children.indexOf(":");
  
    if (colonIndex > 0 && colonIndex < 100) {
      return (
        <p className="text-xl leading-9 text-black">
          <strong>{children.slice(0, colonIndex + 1)}</strong>
          {children.slice(colonIndex + 1)}
        </p>
      );
    }
  
    return <p className="text-xl leading-9 text-black">{children}</p>;
  }
  
  function LegalTable({
    headers,
    rows,
  }: {
    headers: string[];
    rows: string[][];
  }) {
    return (
      <div className="my-6 w-full overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left text-lg text-black">
          <thead>
            <tr className="border-b-2 border-[#A56423]">
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-4 font-bold text-[#A56423]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 align-top">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-4 leading-8">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  const PrivacyPolicyPage = () => {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-10">
          <header className="mb-12 border-b border-[#A56423]/20 pb-10">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[#A56423]">
              The Soibi Fashion
            </p>
  
            <h1 className="text-4xl font-bold leading-tight text-[#A56423] md:text-5xl">
              Privacy & Cookie Policy
            </h1>
  
            <p className="mt-5 text-xl leading-9 text-black">
              Covering the SOIBI catalogue, the ÉRÉME collection, and all other
              collections sold on this site.
            </p>
  
            <p className="mt-4 text-xl text-black">
              <strong>Last updated:</strong> 3rd November 2026
              <span className="mx-2">•</span>
              <strong>Version:</strong> 1.0
            </p>
          </header>
  
          <section className="mb-16 space-y-5">
            <h2 className="text-2xl font-bold text-[#A56423] md:text-3xl">
              Summary
            </h2>
  
            <p className="text-xl leading-9 text-black">
              This summary is a short guide. The full Policy follows and is the
              authoritative text.
            </p>
  
            <ul className="list-disc space-y-3 pl-7 text-xl leading-9 text-black">
              <li><strong>Who we are:</strong> Soibi Fashion is the data controller for the personal data collected through soibifashion.com, WhatsApp, email and our social media accounts.</li>
              <li><strong>What we collect:</strong> your contact and delivery details, order history, body measurements for made-to-measure items, messages you send us, and technical data from your device.</li>
              <li><strong>Why:</strong> to process and deliver your orders, to provide customer service, to meet legal obligations, to keep the Site secure, and, only if you agree, to send marketing and use analytics and advertising cookies.</li>
              <li><strong>Who sees it:</strong> payment processors, couriers, IT and hosting providers, email and messaging platforms, and, if you consent, analytics and advertising partners. We do not sell your personal data.</li>
              <li><strong>Your choices:</strong> you can accept, reject or customise non-essential cookies, change your choice at any time, and unsubscribe from marketing at any time.</li>
              <li><strong>Your rights:</strong> you may ask to see, correct, delete or restrict your data, object to its use, and complain to the Nigeria Data Protection Commission.</li>
              <li><strong>Contact:</strong> <a className="underline" href="mailto:hello@soibifashion.com">hello@soibifashion.com</a></li>
            </ul>
          </section>
  
          <div className="space-y-14">
            {sections.map((section) => (
              <section key={section.title} className="space-y-5">
                <h2 className="text-2xl font-bold leading-tight text-[#A56423] md:text-3xl">
                  {section.title}
                </h2>
  
                {section.paragraphs?.map((paragraph, index) => (
                  <FormattedParagraph key={index}>
                    {paragraph}
                  </FormattedParagraph>
                ))}
  
                {section.definitions && (
                  <div className="space-y-4">
                    {section.definitions.map(([term, definition]) => (
                      <p key={term} className="text-xl leading-9 text-black">
                        <strong>{term}</strong> {definition}
                      </p>
                    ))}
                  </div>
                )}
  
                {section.bullets && (
                  <ul className="list-disc space-y-3 pl-7 text-xl leading-9 text-black">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
  
                {section.extra?.map((paragraph, index) => (
                  <FormattedParagraph key={index}>
                    {paragraph}
                  </FormattedParagraph>
                ))}
  
                {section.title === "4. Personal Data We Collect" && (
                  <LegalTable
                    headers={["Category", "What it includes", "Where it comes from"]}
                    rows={dataCategories}
                  />
                )}
  
                {section.title === "5. How and Why We Use Your Personal Data" && (
                  <LegalTable
                    headers={["Purpose", "Lawful basis", "Data used", "How long we keep it"]}
                    rows={processingPurposes}
                  />
                )}
  
                {section.title === "6. How We Use Cookies and Similar Technologies" && (
                  <LegalTable
                    headers={["Cookie", "Category and provider", "Purpose", "Duration"]}
                    rows={cookies}
                  />
                )}
              </section>
            ))}
          </div>
  
          <footer className="mt-16 border-t border-[#A56423]/20 pt-8">
            <p className="text-xl leading-9 text-black">
              <strong>Data Protection Contact:</strong> The Manager
            </p>
            <p className="text-xl leading-9 text-black">
              <strong>Email:</strong>{" "}
              <a href="mailto:thesoibifashion@gmail.com" className="underline">
                thesoibifashion@gmail.com
              </a>
            </p>
            <p className="text-xl leading-9 text-black">
              <strong>Address:</strong> Road 14, Flat 8A, Federal Housing Estate,
              Agip, Port Harcourt, Rivers State.
            </p>
          </footer>
        </div>
      </main>
    );
  }
  export default PrivacyPolicyPage