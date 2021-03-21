const title = document.querySelector("#title");

const CLICKED_CLASS = "clicked";

const handleClick = () => {
  title.classList.toggle(CLICKED_CLASS);
};

const init = () => {
  title.addEventListener("click", handleClick);
};

init();
