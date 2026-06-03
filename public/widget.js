(function () {
  var script = document.currentScript;
  var slug = script.getAttribute("data-slug");
  if (!slug) return;

  // Derive the base URL from the script src so it works on any domain
  var src = script.getAttribute("src") || "";
  var baseUrl = src.substring(0, src.lastIndexOf("/")) || "http://localhost:3000";

  var WIDGET_URL = baseUrl + "/widget/" + slug;
  var BUBBLE_SIZE = 56;
  var WIDGET_W = 380;
  var WIDGET_H = 580;

  // --- Inject styles ---
  var style = document.createElement("style");
  style.textContent = [
    "#zebboy-bubble{position:fixed;bottom:24px;right:24px;width:" + BUBBLE_SIZE + "px;height:" + BUBBLE_SIZE + "px;border-radius:50%;background:#2563eb;box-shadow:0 4px 16px rgba(37,99,235,0.4);cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:999998;border:none;transition:transform 0.2s,box-shadow 0.2s;}",
    "#zebboy-bubble:hover{transform:scale(1.08);box-shadow:0 6px 20px rgba(37,99,235,0.5);}",
    "#zebboy-bubble svg{fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}",
    "#zebboy-container{position:fixed;bottom:" + (BUBBLE_SIZE + 32) + "px;right:24px;width:" + WIDGET_W + "px;height:" + WIDGET_H + "px;border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.18);z-index:999999;transition:opacity 0.2s,transform 0.2s;transform-origin:bottom right;}",
    "#zebboy-container.zebboy-hidden{opacity:0;transform:scale(0.92) translateY(8px);pointer-events:none;}",
    "#zebboy-container iframe{width:100%;height:100%;border:none;}",
  ].join("");
  document.head.appendChild(style);

  // --- Chat bubble button ---
  var bubble = document.createElement("button");
  bubble.id = "zebboy-bubble";
  bubble.setAttribute("aria-label", "Open chat");
  bubble.innerHTML = [
    '<svg width="24" height="24" viewBox="0 0 24 24">',
    '  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    "</svg>",
  ].join("");

  // --- Widget container + iframe ---
  var container = document.createElement("div");
  container.id = "zebboy-container";
  container.className = "zebboy-hidden";

  var iframe = document.createElement("iframe");
  iframe.src = WIDGET_URL;
  iframe.setAttribute("allow", "clipboard-write");
  iframe.setAttribute("title", "Zebboy chat widget");
  container.appendChild(iframe);

  document.body.appendChild(container);
  document.body.appendChild(bubble);

  // --- Toggle open/close ---
  var open = false;

  var closeIcon = [
    '<svg width="20" height="20" viewBox="0 0 24 24">',
    '  <line x1="18" y1="6" x2="6" y2="18"/>',
    '  <line x1="6" y1="6" x2="18" y2="18"/>',
    "</svg>",
  ].join("");

  var chatIcon = bubble.innerHTML;

  bubble.addEventListener("click", function () {
    open = !open;
    if (open) {
      container.classList.remove("zebboy-hidden");
      bubble.innerHTML = closeIcon;
      bubble.setAttribute("aria-label", "Close chat");
    } else {
      container.classList.add("zebboy-hidden");
      bubble.innerHTML = chatIcon;
      bubble.setAttribute("aria-label", "Open chat");
    }
  });
})();
