document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

        

            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                // Use scrollHeight to set max-height dynamically
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '-'; // Change to minus/close icon
                 // Update styles for active toggle (add CSS for this if needed)
                 toggle.style.backgroundColor = '#fee2e2';
                 toggle.style.color = '#ef4444';
                 toggle.style.borderColor = '#fecaca';
            } else {
                answer.style.maxHeight = null; // Collapse
                toggle.textContent = '+'; // Change back to plus icon
                // Reset toggle styles
                toggle.style.backgroundColor = '#fff3e0';
                toggle.style.color = '#fb923c';
                toggle.style.borderColor = '#ffe0b2';
            }
        });

         // Initialize the first item if it starts active
        if (item.classList.contains('active')) {
             answer.style.maxHeight = answer.scrollHeight + 'px';
             toggle.textContent = '-';
             toggle.style.backgroundColor = '#fee2e2';
             toggle.style.color = '#ef4444';
             toggle.style.borderColor = '#fecaca';
        } else {
             answer.style.maxHeight = null;
        }
    });
});
