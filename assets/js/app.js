/**
 * ASOC Client Dashboard - User Guideline Application Script
 * Features:
 * - Mobile Navigation Drawer Toggle & Backdrop
 * - Keyboard-Accessible Search Modal (Ctrl/Cmd + K) across all English pages
 * - Table of Contents (On this page) Scrollspy for current page
 * - Mode Selector Interactive Preview (Alerts vs Incidents)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initSearchDialog();
  initScrollspy();
  initModeTabs();
});

/* -------------------------------------------------------------------------
   1. Mobile Navigation Drawer
   ------------------------------------------------------------------------- */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebarLeft');
  const backdrop = document.getElementById('sidebarBackdrop');

  if (!menuBtn || !sidebar || !backdrop) return;

  function openSidebar() {
    sidebar.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  backdrop.addEventListener('click', closeSidebar);

  const navLinks = sidebar.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        closeSidebar();
      }
    });
  });
}

/* -------------------------------------------------------------------------
   2. Keyboard-Accessible Search Dialog (<dialog> + Ctrl+K)
   ------------------------------------------------------------------------- */
function initSearchDialog() {
  const searchDialog = document.getElementById('searchDialog');
  const searchTrigger = document.getElementById('searchTriggerBtn');
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('searchDialogClose');
  const resultsContainer = document.getElementById('searchResultsList');

  if (!searchDialog || !searchTrigger) return;

  const searchableItems = [
    { title: 'Introduction & Overview', snippet: 'What is ASOC Client Dashboard, Wazuh & DFIR-IRIS integration', target: 'index.html#what-is-asoc' },
    { title: 'Key Features', snippet: 'Overview of Dashboard, Incidents, Devices, Vulnerabilities, Reports', target: 'index.html#key-features' },
    
    { title: 'Authentication & Security', snippet: 'User login guide for ASOC Client Dashboard', target: 'authentication.html#login' },
    { title: 'Single Active Session', snippet: 'One account restricted to single active session preventing credential sharing', target: 'authentication.html#single-session' },
    { title: 'Inactivity Timeout', snippet: 'Automatic session termination after 15 minutes of inactivity', target: 'authentication.html#inactivity-timeout' },
    
    { title: 'Header Overview', snippet: 'Top header bar overview, navigation controls, and live status', target: 'header.html' },
    { title: 'Time Range Filter', snippet: 'Filter observations by Today, This Week, This Month, Custom calendar', target: 'header.html#time-filter' },
    { title: 'Real-Time Operational Clock', snippet: '24-hour real-time clock indicator in header bar', target: 'header.html#operational-clock' },
    { title: 'Account Profile', snippet: 'Organization name and active username (@username)', target: 'header.html#account-profile' },
    { title: 'Password Reset Menu', snippet: 'Password policy minimum 6 characters with uppercase and lowercase letters', target: 'header.html#reset-password' },
    { title: 'Logout Button', snippet: 'Secure session termination, token invalidation and cookie removal', target: 'header.html#logout' },
    
    { title: 'Dashboard Overview', snippet: 'Unified view of security posture, urgent alerts and mitigations', target: 'dashboard.html#overview' },
    { title: 'Total Severity Widget', snippet: 'Donut chart proportion for Critical, High, Medium & comparison period', target: 'dashboard.html#total-severity' },
    { title: 'Risk Score Widget (Overview)', snippet: 'Security risk index from 0 to 100 with formula modal shortcut', target: 'dashboard.html#risk-score-overview' },
    { title: 'Top 5 Incidents Widget', snippet: 'Prioritized urgent incidents list with automatic view filters', target: 'dashboard.html#top-incidents' },
    { title: 'Recommended Actions', snippet: 'Immediate mitigation steps extracted from active investigation reports', target: 'dashboard.html#recommended-actions' },
    
    { title: 'Devices Overview', snippet: 'Monitored endpoint assets, online/offline status and OS breakdown', target: 'devices.html#overview' },
    { title: 'Total Devices Widget', snippet: 'Total registered endpoints, online connectivity, offline hosts', target: 'devices.html#total-devices' },
    { title: 'Top OS Distribution', snippet: 'Proportion of Ubuntu Linux, Windows Server, Debian, macOS', target: 'devices.html#top-os' },
    { title: 'Device at Risk & Inventory Table', snippet: 'Hostname, OS version, status, severity breakdown and filters', target: 'devices.html#device-table' },
    { title: 'Device Detail Drawer', snippet: 'Hardware specs (CPU, Cores, RAM), Wazuh version, detected issues', target: 'devices.html#device-detail' },

    { title: 'Incidents Overview', snippet: 'Security alerts detected by Wazuh SIEM rules', target: 'incidents.html#overview' },
    { title: 'Group By Selector: Alerts vs Incidents', snippet: 'Individual chronological alerts vs aggregated incidents mode', target: 'incidents.html#group-by-selector' },
    { title: 'Search & Advanced Filter', snippet: 'Filter by severity, incident type, affected agent, source IP, count', target: 'incidents.html#search-filter' },
    { title: 'Incident Detail Drawer', snippet: 'Detection rule narrative, source log file, MITRE ATT&CK mapping', target: 'incidents.html#incident-detail' },
    { title: 'Full Logs Modal', snippet: 'Structured JSON log viewer, search in log, copy & download JSON', target: 'incidents.html#full-logs' },

    { title: 'Vulnerabilities Overview', snippet: 'Software vulnerability scanning metrics and CVE status', target: 'vulnerabilities.html#overview' },
    { title: 'Vulnerability Metrics', snippet: 'Total severity donut, CVE distribution, Solved vs Active status', target: 'vulnerabilities.html#vuln-metrics' },
    { title: 'Vulnerability Search & Filter', snippet: 'Search CVE, software package, agent host, Active/Solved status', target: 'vulnerabilities.html#vuln-search' },
    { title: 'Vulnerability Inventory Table', snippet: 'List of CVE IDs, severity badge, affected host, detection date', target: 'vulnerabilities.html#vuln-table' },
    { title: 'Vulnerability Detail Drawer', snippet: 'Comprehensive CVE technical description and package metadata', target: 'vulnerabilities.html#vuln-detail' },

    { title: 'Reports Overview', snippet: 'Official incident investigation reports managed via DFIR-IRIS', target: 'reports.html#overview' },
    { title: 'Reports Metrics & Filter', snippet: 'Available forensic documents and severity level filtering', target: 'reports.html#report-metrics' },
    { title: 'Reports Table', snippet: 'Report Name, Severity badge, and official generation timestamp', target: 'reports.html#report-table' },
    { title: 'Report Detail Drawer', snippet: 'Audit UUID, customer name, executive summary, recommended actions', target: 'reports.html#report-detail' },
    { title: 'View Full Report & Download PDF', snippet: 'Render full markdown document and automatic A4 PDF print dialog', target: 'reports.html#view-full-report' },

    { title: 'Risk Score Formula', snippet: 'Complete mathematical formulas for Tenant Risk Score and Agent Score', target: 'risk-score-formula.html#tenant-risk-score' },
    { title: 'Agent Score (AS) Formula', snippet: 'Severity weights accumulation per host capped at 100', target: 'risk-score-formula.html#agent-score' },
    { title: 'Severity Weight Matrix', snippet: 'Score weights: Level 15+ (+6), Level 12-14 (+3), Level 7-11 (+1)', target: 'risk-score-formula.html#severity-matrix' },
    { title: 'Risk Classification Scale', snippet: 'Risk categories: Low (0-20), Moderate (21-40), Elevated, High, Critical', target: 'risk-score-formula.html#risk-classification' },
    { title: 'Step-by-Step Simulation Example', snippet: 'Real-world calculation example across 4 endpoints and final score', target: 'risk-score-formula.html#simulation' },

    { title: 'FAQ & Troubleshooting', snippet: 'Answers to session timeouts, alerts vs incidents, offline agents', target: 'faq.html#session-faq' }
  ];

  function openModal() {
    searchDialog.showModal();
    searchInput.value = '';
    renderResults(searchableItems);
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeModal() {
    searchDialog.close();
  }

  searchTrigger.addEventListener('click', openModal);
  if (searchClose) searchClose.addEventListener('click', closeModal);

  searchDialog.addEventListener('click', (e) => {
    const dialogDimensions = searchDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (searchDialog.open) {
        closeModal();
      } else {
        openModal();
      }
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderResults(searchableItems);
      return;
    }

    const filtered = searchableItems.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.snippet.toLowerCase().includes(query)
    );
    renderResults(filtered);
  });

  function renderResults(items) {
    if (!resultsContainer) return;

    if (items.length === 0) {
      resultsContainer.innerHTML = `
        <li style="padding: 1.5rem; text-align: center; color: var(--color-text-subtle); font-size: 0.9rem;">
          No matching guide topics found.
        </li>`;
      return;
    }

    resultsContainer.innerHTML = items.map(item => `
      <li>
        <a href="${item.target}" class="search-result-item">
          <div class="search-result-title">${escapeHTML(item.title)}</div>
          <div class="search-result-snippet">${escapeHTML(item.snippet)}</div>
        </a>
      </li>
    `).join('');

    const links = resultsContainer.querySelectorAll('.search-result-item');
    links.forEach(link => {
      link.addEventListener('click', () => {
        closeModal();
      });
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}

/* -------------------------------------------------------------------------
   3. Table of Contents (On this page) Scrollspy
   ------------------------------------------------------------------------- */
function initScrollspy() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('section[id], h2[id], h3[id]');

  if (sections.length === 0 || tocLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (!id) return;

        tocLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* -------------------------------------------------------------------------
   4. Mode Switcher Interactive Preview (Alerts vs Incidents)
   ------------------------------------------------------------------------- */
function initModeTabs() {
  const alertTabBtn = document.getElementById('tabModeAlerts');
  const incidentTabBtn = document.getElementById('tabModeIncidents');
  const alertPanel = document.getElementById('panelModeAlerts');
  const incidentPanel = document.getElementById('panelModeIncidents');

  if (!alertTabBtn || !incidentTabBtn || !alertPanel || !incidentPanel) return;

  alertTabBtn.addEventListener('click', () => {
    alertTabBtn.classList.add('active');
    incidentTabBtn.classList.remove('active');
    alertPanel.style.display = 'block';
    incidentPanel.style.display = 'none';
  });

  incidentTabBtn.addEventListener('click', () => {
    incidentTabBtn.classList.add('active');
    alertTabBtn.classList.remove('active');
    incidentPanel.style.display = 'block';
    alertPanel.style.display = 'none';
  });
}
