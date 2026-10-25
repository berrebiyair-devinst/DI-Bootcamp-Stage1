const form = document.querySelector('form');
const button = form.querySelector('button');

form.addEventListener('input', () => {
    const inputs = [...form.querySelectorAll('input')];

    button.disabled = !inputs.every(input => {
        return input.value.trim() !== '';
    });
});
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const message = document.getElementById('message');
    const data = Object.fromEntries(new FormData(form));

    const endpoint = form.id === 'registerForm'
        ? '/register'
        : '/login';

    button.disabled = true;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        message.textContent = result.message;
    } catch (error) {
        message.textContent = 'Impossible de contacter le serveur';
    } finally {
        button.disabled = ![...form.querySelectorAll('input')]
            .every(input => input.value.trim() !== '');
    }
});