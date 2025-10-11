document.addEventListener('DOMContentLoaded', () => {
    console.log('Sistema WeGIA carregado.');

    const menuToggle = document.querySelector('.menu-toggle');
    const itensMenu = document.querySelector('.sidebar-nav');

    menuToggle.addEventListener("click", () => {
        itensMenu.classList.toggle('active');
        if (itensMenu.style.display === 'flex') {
            itensMenu.style.display = 'none';
        } else {
            itensMenu.style.display = 'flex';
        }
    });


    const newTaskModal = document.getElementById('new-task-modal');
    const openModalBtn = document.getElementById('open-new-task-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal-btn');

    const openModal = () => {
        if (newTaskModal) {
            newTaskModal.style.display = 'flex';
        }
    };

    const closeModal = () => {
        if (newTaskModal) {
            newTaskModal.style.display = 'none';
        }
    };

    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    if (newTaskModal) {
        newTaskModal.addEventListener('click', (event) => {
            if (event.target === newTaskModal) {
                closeModal();
            }
        });
    }
});