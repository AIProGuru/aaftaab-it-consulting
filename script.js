const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const year = document.querySelector("[data-year]");

const services = {
  ai: {
    title: "AI and Automation",
    summary:
      "We identify repetitive workflows, customer questions, and data-heavy tasks that can be improved with practical AI and automation.",
    challenges: [
      "Teams spend too much time answering repeat questions.",
      "Manual document review slows down operations.",
      "Leadership wants AI value but needs a controlled starting point.",
    ],
    help: [
      "AI assistants for customer support and lead intake.",
      "Workflow automation for documents, messages, and approvals.",
      "Clear governance, testing, and human review paths.",
    ],
    outcomes: ["Faster response times", "Less manual work", "Better customer routing"],
  },
  web: {
    title: "Digital Experience",
    summary:
      "We create websites, portals, and digital journeys that explain your value clearly and make the next step obvious for customers.",
    challenges: [
      "The current website does not communicate trust or expertise.",
      "Visitors leave without contacting the business.",
      "Content, forms, and service pages are hard to manage.",
    ],
    help: [
      "Service pages, landing pages, and conversion-focused content structure.",
      "Responsive design for desktop and mobile visitors.",
      "CMS, forms, analytics, and performance optimization.",
    ],
    outcomes: ["Clearer customer journey", "More qualified inquiries", "Better brand credibility"],
  },
  software: {
    title: "Software Engineering",
    summary:
      "We build secure, maintainable software platforms that match how your business operates instead of forcing your team into generic tools.",
    challenges: [
      "Spreadsheets and disconnected tools create duplicated work.",
      "Existing software does not support the business process.",
      "Teams need a reliable platform that can evolve.",
    ],
    help: [
      "Custom portals, dashboards, APIs, and backend systems.",
      "Database design, authentication, permissions, and integrations.",
      "Clean architecture built for maintainability and future features.",
    ],
    outcomes: ["Centralized workflows", "Fewer manual handoffs", "Scalable foundation"],
  },
  mobile: {
    title: "Mobile Products",
    summary:
      "We design mobile-first products for customers, staff, and field teams that need reliable access away from the desk.",
    challenges: [
      "Field teams need to update work from job sites.",
      "Customers expect self-service access on mobile devices.",
      "Manual updates delay reporting and decision-making.",
    ],
    help: [
      "Mobile apps and responsive mobile workflows.",
      "Photo uploads, forms, notifications, and status updates.",
      "API integration with admin systems and dashboards.",
    ],
    outcomes: ["Faster field updates", "Better user convenience", "Real-time visibility"],
  },
  android: {
    title: "Android Security",
    summary:
      "We help teams reduce Android app risk before launch and during ongoing product improvement, with practical reviews that developers can act on.",
    challenges: [
      "The app handles customer data but security has not been reviewed deeply.",
      "Authentication, local storage, API traffic, or permissions may expose risk.",
      "The team needs a clear security checklist before production release.",
    ],
    help: [
      "Android app security reviews for storage, networking, authentication, and permissions.",
      "Practical risk reports with prioritized fixes for developers and product owners.",
      "Release-readiness checks for build configuration, API usage, and sensitive data handling.",
    ],
    outcomes: ["Reduced mobile risk", "Safer customer data", "Clear remediation plan"],
  },
  data: {
    title: "Data and Reporting",
    summary:
      "We turn scattered business information into clear dashboards, reports, and decision tools that leaders can actually use.",
    challenges: [
      "Important information lives in too many places.",
      "Reports take too long to prepare manually.",
      "Leadership lacks visibility into performance trends.",
    ],
    help: [
      "KPI dashboards and executive reporting interfaces.",
      "Data cleanup, mapping, and reporting pipelines.",
      "Role-based views for teams, managers, and leadership.",
    ],
    outcomes: ["Better visibility", "Faster reporting", "More confident decisions"],
  },
  operations: {
    title: "Modern Operations",
    summary:
      "We streamline the internal systems that keep your business moving, from CRM flows to payments, approvals, reminders, and team coordination.",
    challenges: [
      "Operations depend on manual follow-ups and duplicated entry.",
      "Customer, payment, and team updates are not synchronized.",
      "Managers need a cleaner way to track daily work.",
    ],
    help: [
      "CRM workflows, payment status, notifications, and admin panels.",
      "Internal tools for scheduling, approvals, and task management.",
      "System integrations that reduce context switching.",
    ],
    outcomes: ["Cleaner operations", "Reduced admin effort", "Improved team coordination"],
  },
};

const industries = {
  services: {
    title: "Professional Services",
    summary:
      "We help consultants, agencies, local service providers, and specialist firms create a stronger digital presence and smoother client operations.",
    list: [
      "Lead generation websites with clearer service explanations.",
      "Client portals for documents, appointments, and project updates.",
      "Dashboards for sales, delivery, team workload, and client activity.",
    ],
  },
  retail: {
    title: "Retail and Ecommerce",
    summary:
      "We help retail brands improve the online buying journey, manage product information, and connect sales channels with operations.",
    list: [
      "Online catalogs, ecommerce flows, and product landing pages.",
      "Order tracking, customer messaging, and payment integrations.",
      "Sales dashboards for product performance and customer behavior.",
    ],
  },
  health: {
    title: "Healthcare and Wellness",
    summary:
      "We support service providers that need patient-friendly digital touchpoints, secure intake workflows, and better appointment operations.",
    list: [
      "Booking experiences, intake forms, and service information pages.",
      "Reminder workflows and administrative dashboards.",
      "Privacy-conscious user experiences for sensitive customer journeys.",
    ],
  },
  field: {
    title: "Logistics and Field Teams",
    summary:
      "We build mobile and operational tools for teams that coordinate work across locations, jobs, routes, and daily status updates.",
    list: [
      "Mobile job updates, photo reporting, and issue tracking.",
      "Dispatch views, team assignments, and status dashboards.",
      "Operational reporting for supervisors and business owners.",
    ],
  },
};

if (year) {
  year.textContent = new Date().getFullYear();
}

if (header && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  header.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      header.querySelectorAll(".nav-group[open]").forEach((item) => item.removeAttribute("open"));
    });
  });
}

document.querySelectorAll(".nav-group").forEach((group) => {
  group.addEventListener("toggle", () => {
    if (!group.open) return;
    document.querySelectorAll(".nav-group[open]").forEach((item) => {
      if (item !== group) item.removeAttribute("open");
    });
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".site-nav")) return;
  document.querySelectorAll(".nav-group[open]").forEach((item) => item.removeAttribute("open"));
});

function renderList(element, items) {
  if (!element) return;
  element.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  });
}

function setService(serviceKey) {
  const service = services[serviceKey];
  if (!service) return;

  document.querySelector("[data-service-title]").textContent = service.title;
  document.querySelector("[data-service-summary]").textContent = service.summary;
  renderList(document.querySelector("[data-service-challenges]"), service.challenges);
  renderList(document.querySelector("[data-service-help]"), service.help);

  const outcomes = document.querySelectorAll("[data-service-panel] .outcome-row span");
  service.outcomes.forEach((outcome, index) => {
    if (outcomes[index]) outcomes[index].textContent = outcome;
  });

  document.querySelectorAll(".service-tab").forEach((tab) => {
    const isActive = tab.dataset.service === serviceKey;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

document.querySelectorAll(".service-tab").forEach((tab) => {
  tab.addEventListener("click", () => setService(tab.dataset.service));
});

function setIndustry(industryKey) {
  const industry = industries[industryKey];
  if (!industry) return;

  document.querySelector("[data-industry-title]").textContent = industry.title;
  document.querySelector("[data-industry-summary]").textContent = industry.summary;
  renderList(document.querySelector("[data-industry-list]"), industry.list);

  document.querySelectorAll(".industry-tab").forEach((tab) => {
    const isActive = tab.dataset.industry === industryKey;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

document.querySelectorAll(".industry-tab").forEach((tab) => {
  tab.addEventListener("click", () => setIndustry(tab.dataset.industry));
});

function activateFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (services[hash]) {
    setService(hash);
    return;
  }

  if (hash === "android-security") {
    setService("android");
    return;
  }

  const industryMatch = hash.match(/^industry-(.+)$/);
  if (industryMatch && industries[industryMatch[1]]) {
    setIndustry(industryMatch[1]);
  }
}

window.addEventListener("hashchange", activateFromHash);
activateFromHash();
