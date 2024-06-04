document.addEventListener('DOMContentLoaded', function () {
    const showAllButton = document.querySelector('.show-all-button');

    showAllButton.addEventListener('click', function (event) {
        event.preventDefault();
        document.location.replace("/all");
    });
});
