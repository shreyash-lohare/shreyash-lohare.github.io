'use strict';

// Analytics tracking functionality
const analyticsTracker = {
  pageViews: 0,
  clickEvents: [],
  
  // Initialize tracking
  init: function() {
    this.trackPageView();
    this.setupClickTracking();
    console.log('Analytics tracking initialized');
  },

  // Track page views
  trackPageView: function() {
    this.pageViews++;
    console.log(`Page View #${this.pageViews}`);
    console.log(`URL: ${window.location.href}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('------------------------');
  },

  // Track click events
  trackClick: function(event) {
    const element = event.target;
    const eventData = {
      timestamp: new Date().toISOString(),
      elementType: element.tagName.toLowerCase(),
      elementId: element.id || 'no-id',
      elementClass: element.className || 'no-class',
      elementText: element.textContent?.trim()?.substring(0, 50) || 'no-text',
      path: this.getElementPath(element),
      coordinates: {
        x: event.clientX,
        y: event.clientY
      }
    };

    this.clickEvents.push(eventData);
    
    console.log('Click Event Detected:');
    console.log(`Element: ${eventData.elementType}`);
    console.log(`ID: ${eventData.elementId}`);
    console.log(`Class: ${eventData.elementClass}`);
    console.log(`Text: ${eventData.elementText}`);
    console.log(`Path: ${eventData.path}`);
    console.log(`Coordinates: (${eventData.coordinates.x}, ${eventData.coordinates.y})`);
    console.log(`Timestamp: ${eventData.timestamp}`);
    console.log('------------------------');
  },

  // Get element CSS path
  getElementPath: function(element) {
    let path = [];
    while (element && element.nodeType === Node.ELEMENT_NODE) {
      let selector = element.nodeName.toLowerCase();
      if (element.id) {
        selector += '#' + element.id;
      } else {
        let sibling = element;
        let siblingIndex = 1;
        while (sibling = sibling.previousElementSibling) {
          if (sibling.nodeName.toLowerCase() === selector) siblingIndex++;
        }
        if (siblingIndex !== 1) selector += `:nth-of-type(${siblingIndex})`;
      }
      path.unshift(selector);
      element = element.parentNode;
    }
    return path.join(' > ');
  },

  // Setup click tracking
  setupClickTracking: function() {
    document.addEventListener('click', (event) => this.trackClick(event), true);
  }
};

// Initialize analytics tracking
document.addEventListener('DOMContentLoaded', () => analyticsTracker.init());

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });




// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}