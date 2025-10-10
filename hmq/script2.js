document.addEventListener("DOMContentLoaded", () => {
	console.log('content loaded');

	// year
	const y = new Date().getFullYear();
	document.getElementById("year").textContent = y;

	// mobile nav toggle
	const navToggle = document.querySelector(".nav-toggle");
	const siteNav = document.getElementById("site-nav");
	console.log('navTottle: ' + navToggle);
	console.log('siteNav: ' + siteNav);
	navToggle?.addEventListener("click", () => {
		console.log("navToggle on click");
		const open = navToggle.getAttribute("aria-expanded") === "true";
		navToggle.setAttribute("aria-expanded", String(!open));
		siteNav?.toggleAttribute("data-open");
	});

	// modal form open/close
	const modal = document.getElementById("modal");
	const openBtn = document.getElementById("open-form");
	const closeBtns = modal.querySelectorAll(".modal-close");

	function showModal() {
		modal.setAttribute("aria-hidden", "false");
		document.body.style.overflow = "hidden";
		modal.querySelector("input,select,button")?.focus();
	}
	function hideModal() {
		modal.setAttribute("aria-hidden", "true");
		document.body.style.overflow = "";
		openBtn?.focus();
	}

	openBtn?.addEventListener("click", showModal);
	closeBtns.forEach((b) => b.addEventListener("click", hideModal));
	modal.addEventListener("keydown", (e) => {
		if (e.key === "Escape") hideModal();
	});

	// simple client-side validation + submit (demo)
	const form = document.getElementById("quick-form");
	form?.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(form).entries());
		// replace with real AJAX / Action handler
		console.log("Submitting pendaftaran demo", data);
		form.querySelector('button[type="submit"]').textContent = "Mengirim...";
		setTimeout(() => {
			form.reset();
			hideModal();
			alert("Terima kasih. Data pendaftaran berhasil dikirim (demo).");
			form.querySelector('button[type="submit"]').textContent = "Kirim";
		}, 900);
	});
});
