// Click On Toggle setting Gear
document.querySelector(".toggle-setting").addEventListener("click", () => {
  // Toggle open class on the Setting Box div
  document.querySelector(".setting-box").classList.toggle("open");
  document
    .querySelector(".toggle-setting .fa-gear")
    .classList.toggle("fa-spin");
});

// Colors

// get an array of the colors inside the setting box
let colorsLis = document.querySelectorAll(".colors-list li");

// Switch Color Option
colorsLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set selected color on root

    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Add color To Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);
  });
});

const mainColor = localStorage.getItem("color-option");
// Check If mainColor exist in local storage
if (mainColor !== null) {
  // set Main Color variable in css

  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option")
  );

  colorsLis.forEach((li) => {
    li.classList.remove("active");

    // check if the color of the
    if (li.dataset.color === mainColor) {
      li.classList.add("active");
    }
  });
}

// ----------Change Image Every 10s-------------------

// Random Background Option
let backgroundOption = true;

// select random background on And Off buttons

let randomBackSpans = document.querySelectorAll(".random-background span");

// Switch Random Background Option

// Loop On All spans

randomBackSpans.forEach((span) => {
  // this.classList.remove("active");
  span.addEventListener("click", (e) => {
    // Set selected color on root

    handleActive(e);

    if (e.target.dataset.background === "on") {
      backgroundOption = true;
      localStorage.setItem("random-background", true);

      randomizeImgs();
    } else {
      backgroundOption = false;
      localStorage.setItem("random-background", false);

      randomizeImgs();
    }
  });
});

// select elements

let landingPage = document.querySelector(".landing-page");

// get Array Of images

let imgsArray = [
  "landing-1.jpg",
  "landing-2.jpg",
  "landing-3.jpg",
  "landing-4.jpg",
  "landing-5.jpg",
  "landing-6.jpg",
];
// Variable to set interval
let backgroundInterval;

// add background option to local storage

backgroundLocalItem = localStorage.getItem("random-background");

document.querySelectorAll(".random-background span").forEach((element) => {
  // element.classList.remove("active");
});

// check if random background option In local storage is not empty

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;

    document.querySelector(".random-background .on").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-background .off").classList.add("active");
  }
}

// Function To randomize background

function randomizeImgs() {
  if (backgroundOption === true) {
    // Change Background Image Every 10s

    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      landingPage.style.backgroundImage = `url(/imgs/${imgsArray[randomNumber]})`;
    }, 5000);
  } else {
    clearInterval(backgroundInterval);
  }
}
randomizeImgs();

// Increase Skills bar On Scrolling-------------------------------

// Select the progress span
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // Skills OffsetTop
  let skillsOffSetTop = ourSkills.offsetTop;
  // Skills OuterHeight
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window Scroll Top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffSetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skills-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create popUp when clcking on an image

let allImages = document.querySelectorAll(".images-box img");

// Loop On all Images
allImages.forEach((image) => {
  image.addEventListener("click", (e) => {
    // Craete overlay Element

    let overlay = document.createElement("div");
    // Add class to overlay
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // Creat popup Box

    let popUpBox = document.createElement("div");
    popUpBox.className = "popup-box";
    document.body.appendChild(popUpBox);

    if (image.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");
      // create heading text

      let imgText = document.createTextNode(image.alt);
      imgHeading.append(imgText);
      // append to popubox
      popUpBox.appendChild(imgHeading);
    }

    // Create popup img
    let innerImage = document.createElement("img");
    innerImage.src = image.src;
    popUpBox.appendChild(innerImage);

    // Create the close button

    let closeButton = document.createElement("span");

    closeButton.className = "close-button";
    closeButton.append(document.createTextNode("×"));

    popUpBox.appendChild(closeButton);
  });
});
// Remove popup whent clicking on overlay or on close button
document.addEventListener("click", function (e) {
  if (
    e.target.className === "close-button" ||
    e.target.className === "popup-overlay"
  ) {
    // Remove popup box
    document.querySelector(".popup-box").remove();
    // Remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// --------------Scroll Bullets-----------
// Select Bullets
let scrollBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select links
let allLinks = document.querySelectorAll("header .links li");

// Trigger the function on bullets and nav links
scrollToPart(allLinks);
scrollToPart(scrollBullets);
//
// handleActive(ele);

// create scroll to function
function scrollToPart(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// Handle Active Class Function

function handleActive(ele) {
  // Remove Active Class From All Colors
  ele.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add active class On the Pressed Buttom

  ele.target.classList.add("active");
}

// ----------- Show Bullets ------------
// Select the on and off button
let bulletsSpan = document.querySelectorAll(".show-bullet span");
// Select the bullet container
let navBullets = document.querySelector(".nav-bullets");

// Select the localStorage Item
let bulletsLocalItem = window.localStorage.getItem("show-bullets");

// Check if the option exist in teh local storage
if (bulletsLocalItem !== null) {
  // Loop on all Spans
  bulletsSpan.forEach((span) => {
    // remove active class from all spans
    span.classList.remove("active");

    // then add the class to the chosen span
    if (bulletsLocalItem === "block") {
      navBullets.style.display = "block";
      document.querySelector(".show-bullet .on").classList.add("active");
    } else {
      navBullets.style.display = "none";
      document.querySelector(".show-bullet .off").classList.add("active");
    }
  });
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    // trigger handle active class function
    handleActive(e);

    // if the butotn that has been clicked was on do x

    if (e.target.dataset.bullet === "on") {
      localStorage.setItem("show-bullets", "block");
      navBullets.style.display = "block";

      // if the butotn that has been clicked was on do y
    } else {
      localStorage.setItem("show-bullets", "none");
      navBullets.style.display = "none";
    }
  });
});

// Reset Options Buttons

document.querySelector(".setting-box .reset-button").onclick = () => {
  localStorage.clear();
  window.location.reload();
};

// Togel Menue On small Screens

// Select menu Button
let menuButton = document.querySelector(
  ".landing-page .links-container .toggle-menu"
);
let overlay = document.querySelector(".overlay");
let navLinks = document.querySelector(".landing-page header .links");

menuButton.onclick = () => {
  navLinks.classList.toggle("open");
};

overlay.onclick = () => {
  navLinks.classList.remove("open");
};
