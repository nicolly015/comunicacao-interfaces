document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.querySelector('.menu-toggle');
    const itensMenu = document.querySelector('.sidebar-nav');

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            itensMenu.classList.toggle('active');
            if (itensMenu.style.display === 'flex') {
                itensMenu.style.display = 'none';
            } else {
                itensMenu.style.display = 'flex';
            }
        });
    }

    const openModalBtn = document.getElementById('open-new-task-modal');
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            const newTaskModal = document.getElementById('new-task-modal');
            if (newTaskModal) {
                newTaskModal.style.display = 'flex';
            }
        });
    }

    const openEventModalBtn = document.getElementById('open-new-event-modal');
    if (openEventModalBtn) {
        openEventModalBtn.addEventListener('click', () => {
            const newEventModal = document.getElementById('new-event-modal');
            if (newEventModal) {
                newEventModal.style.display = 'flex';
            }
        });
    }

    const closeModalBtns = document.querySelectorAll('.close-modal-btn');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    const viewTaskModal = document.getElementById('view-task-modal');
    const taskCards = document.querySelectorAll('.task-card');

    const modalTaskTitle = document.getElementById('modal-task-title');
    const modalTaskDescription = document.getElementById('modal-task-description');
    const modalTaskResponsible = document.getElementById('modal-task-responsible');
    const modalTaskDeadline = document.getElementById('modal-task-deadline');

    taskCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!viewTaskModal) return; 
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            const responsible = card.getAttribute('data-responsible');
            const deadline = card.getAttribute('data-deadline');
            
            if (modalTaskTitle) modalTaskTitle.textContent = title;
            if (modalTaskDescription) modalTaskDescription.textContent = description || "Nenhuma descrição fornecida.";
            if (modalTaskResponsible) modalTaskResponsible.textContent = responsible;
            if (modalTaskDeadline) modalTaskDeadline.textContent = deadline;
            
            viewTaskModal.style.display = 'flex';
        });
    });

    const columns = document.querySelectorAll('.kanban-column');

    taskCards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            card.classList.add('is-dragging');
            e.stopPropagation(); 
        });
        card.addEventListener('dragend', (e) => {
            card.classList.remove('is-dragging');
            e.stopPropagation();
        });
    });

    columns.forEach(column => {
        column.addEventListener('dragover', (event) => {
            event.preventDefault(); 
        });
        column.addEventListener('drop', (event) => {
            event.preventDefault();
            const draggingCard = document.querySelector('.is-dragging');
            const columnTitle = column.querySelector('h3');
            if (draggingCard) {
                columnTitle.insertAdjacentElement('afterend', draggingCard);
            }
        });
    });

    const btnFilterAll = document.getElementById('btn-filter-all');
    const btnFilterMine = document.getElementById('btn-filter-mine');
    const kanbanBoard = document.querySelector('.kanban-board');
    
    if (btnFilterAll && btnFilterMine && kanbanBoard) {
        const currentUser = kanbanBoard.dataset.currentUser; 
        const allTaskCards = kanbanBoard.querySelectorAll('.task-card'); 
        
        btnFilterMine.addEventListener('click', () => {
            btnFilterMine.classList.add('active');
            btnFilterAll.classList.remove('active');
            allTaskCards.forEach(card => {
                if (card.dataset.responsible !== currentUser) {
                    card.classList.add('is-hidden');
                } else {
                    card.classList.remove('is-hidden');
                }
            });
        });
        
        btnFilterAll.addEventListener('click', () => {
            btnFilterAll.classList.add('active');
            btnFilterMine.classList.remove('active');
            allTaskCards.forEach(card => {
                card.classList.remove('is-hidden');
            });
        });
    }

    const btnCalAll = document.getElementById('btn-cal-all');
    const btnCalPublic = document.getElementById('btn-cal-public');
    const btnCalPrivate = document.getElementById('btn-cal-private');
    const allCalendarEvents = document.querySelectorAll('.calendar-event');

    if (btnCalAll && btnCalPublic && btnCalPrivate) {
        btnCalPublic.addEventListener('click', () => {
            btnCalPublic.classList.add('active');
            btnCalAll.classList.remove('active');
            btnCalPrivate.classList.remove('active');
            allCalendarEvents.forEach(event => {
                if (event.classList.contains('event-private')) {
                    event.classList.add('is-hidden');
                } else {
                    event.classList.remove('is-hidden');
                }
            });
        });

        btnCalPrivate.addEventListener('click', () => {
            btnCalPrivate.classList.add('active');
            btnCalAll.classList.remove('active');
            btnCalPublic.classList.remove('active');
            allCalendarEvents.forEach(event => {
                if (event.classList.contains('event-public')) {
                    event.classList.add('is-hidden');
                } else {
                    event.classList.remove('is-hidden');
                }
            });
        });

        btnCalAll.addEventListener('click', () => {
            btnCalAll.classList.add('active');
            btnCalPublic.classList.remove('active');
            btnCalPrivate.classList.remove('active');
            allCalendarEvents.forEach(event => {
                event.classList.remove('is-hidden');
            });
        });
    }

});