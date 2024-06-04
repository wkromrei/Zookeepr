document.addEventListener('DOMContentLoaded', function () {
    const showAllButton = document.querySelector('.show-all-button');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const closeButton = document.querySelector('.close');

    showAllButton.addEventListener('click', async function (event) {
        event.preventDefault();

        try {
            const response = await fetch('/api/animals', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch animals: ' + response.statusText);
            }

            const animals = await response.json();
            renderAnimalList(animals);
            modal.style.display = 'block';
        } catch (error) {
            console.error('Error fetching animals:', error);
            alert('Failed to fetch animals. Please try again.');
        }
    });

    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // function renderAnimalList(animals) {
    //     modalContent.innerHTML = '<span class="close">&times;</span><h2>Animal List</h2>';
    //     const ul = document.createElement('ul');
    //     animals.forEach(animal => {
    //         const li = document.createElement('li');
    //         li.textContent = `${animal.name} - ${animal.description} (Amount: ${animal.amount})`;
    //         ul.appendChild(li);
    //     });
    //     modalContent.appendChild(ul);
    // }
});
