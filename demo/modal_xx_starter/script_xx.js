const modals = document.querySelectorAll('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelectorAll('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log('modals', modals);
console.log('show-modal', btnsOpenModal);

const openModal = (modalId) => {
  const pModal = document.querySelector(`.${modalId}`);
  console.log('modal', pModal);
  pModal.classList.remove('hidden');
  overlay.classList.remove('hidden');

};

const closeModal = (CloseModalId) => {
  const HiddenContent = document.querySelector(`.${CloseModalId}`);
  HiddenContent.classList.add('hidden');
  overlay.classList.add('hidden')
  
};

const closeAllModals = () => {
  
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const modalId = e.currentTarget.dataset.id;
    console.log('modal id',modalId);
    openModal(modalId);
  });
});

btnCloseModal.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const CloseModalId = e.currentTarget.dataset.id;
    console.log('modal id',CloseModalId);
    closeModal(CloseModalId);
  });
});

overlay.addEventListener('click', closeAllModals);
