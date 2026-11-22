/* Acceso global de retorno a la portada de la OVA principal */
(function () {
  "use strict";
  var PORTAL_URL = "https://alvaros1705-cloud.github.io/OVA-Electiva-Prof-MTE/";
  function addPortalHome() {
    if (!document.body || document.querySelector("[data-ova-main-home]")) return;
    var link = document.querySelector("a.academic-home-return") || document.createElement("a");
    link.href = PORTAL_URL;
    link.className = "ova-main-home";
    link.setAttribute("data-ova-main-home", "");
    link.setAttribute("aria-label", "Volver a la página principal de la OVA");
    link.setAttribute("title", "Volver al portal principal de Modelos de Transformación Empresarial");
    link.removeAttribute("style");
    link.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path d="m3 10 9-7 9 7"></path><path d="M5.5 9v11h13V9"></path>' +
      '<path d="M9.5 20v-6h5v6"></path></svg>' +
      '<span>Portal principal</span>';
    if (!link.isConnected) document.body.appendChild(link);
    if (!document.getElementById("ova-main-home-styles")) {
      var style = document.createElement("style");
      style.id = "ova-main-home-styles";
      style.textContent =
        ".ova-main-home{position:fixed!important;z-index:2147483000!important;left:max(16px,env(safe-area-inset-left))!important;bottom:max(16px,env(safe-area-inset-bottom))!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;min-height:48px!important;padding:0 17px!important;border:1px solid rgba(255,255,255,.28)!important;border-radius:999px!important;background:linear-gradient(115deg,#063e2c 0%,#087b5b 76%,#a77a1b 100%)!important;color:#fff!important;box-shadow:0 8px 24px rgba(4,40,27,.28)!important;font:700 13px/1.1 system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif!important;text-decoration:none!important;letter-spacing:.01em!important;cursor:pointer!important;transition:transform .2s ease,box-shadow .2s ease,filter .2s ease!important}" +
        ".ova-main-home:hover{transform:translateY(-2px)!important;box-shadow:0 12px 28px rgba(4,40,27,.34)!important;filter:brightness(1.06)!important}" +
        ".ova-main-home:focus-visible{outline:3px solid #f2cf76!important;outline-offset:4px!important}" +
        ".ova-main-home svg{display:block!important;width:20px!important;height:20px!important;flex:0 0 20px!important;fill:none!important;stroke:currentColor!important;stroke-width:1.9!important;stroke-linecap:round!important;stroke-linejoin:round!important}" +
        ".ova-main-home span{display:inline!important;white-space:nowrap!important}" +
        "@media(max-width:560px){.ova-main-home{left:max(10px,env(safe-area-inset-left))!important;bottom:max(10px,env(safe-area-inset-bottom))!important;min-height:44px!important;padding:0 13px!important;gap:7px!important;font-size:12px!important}.ova-main-home svg{width:19px!important;height:19px!important;flex-basis:19px!important}}" +
        "@media(prefers-reduced-motion:reduce){.ova-main-home{transition:none!important}}";
      document.head.appendChild(style);
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addPortalHome, { once: true });
  } else {
    addPortalHome();
  }
})();