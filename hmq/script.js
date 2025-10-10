
{/* <script> */ }
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

// Toggle menu mobile
toggle.addEventListener('click', () => {
	navLinks.classList.toggle('show');
});

// Highlight menu aktif saat scroll
window.addEventListener('scroll', () => {
	let current = '';
	sections.forEach(section => {
		const sectionTop = section.offsetTop - 100;
		if (pageYOffset >= sectionTop) {
			current = section.getAttribute('id');
		}
	});

	links.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === '#' + current) {
			link.classList.add('active');
		}
	});
});
// </script>

function initModal() {
	// <script>
	const thumbnails = document.querySelectorAll('.thumbnail');
	const modal = document.getElementById('modal');
	const modalImg = document.getElementById('modal-img');
	const closeBtn = document.querySelector('.close');

	thumbnails.forEach(img => {
		img.addEventListener('click', () => {
			modal.style.display = 'block';
			modalImg.src = img.dataset.full;
			modalImg.alt = img.alt;
		});
	});

	closeBtn.addEventListener('click', () => {
		modal.style.display = 'none';
	});

	window.addEventListener('click', (e) => {
		if (e.target === modal) {
			modal.style.display = 'none';
		}
	});
	// </script>
}
initModal();