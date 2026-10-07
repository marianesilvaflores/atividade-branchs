const form = document.querySelector('#weight-form');
const weightInput = document.querySelector('#weight');
const totalOutput = document.querySelector('#total');
const errorOutput = document.querySelector('#weight-error');
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const PRICE_PER_KILO_IN_CENTS = 6000;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const grams = Number(weightInput.value);
  if (!weightInput.value.trim() || !Number.isInteger(grams) || grams < 1 || grams > 5000) {
    errorOutput.textContent = 'Informe um peso inteiro entre 1 e 5.000 gramas.';
    weightInput.setAttribute('aria-invalid', 'true');
    totalOutput.value = '—';
    weightInput.focus();
    return;
  }
  errorOutput.textContent = '';
  weightInput.removeAttribute('aria-invalid');
  const cents = Math.round(grams * PRICE_PER_KILO_IN_CENTS / 1000);
  totalOutput.value = currency.format(cents / 100);
});

// Evita manter um total anterior quando o peso é alterado.
weightInput.addEventListener('input', () => {
  totalOutput.value = '—';
  errorOutput.textContent = '';
  weightInput.removeAttribute('aria-invalid');
});

const products = [...document.querySelectorAll('[data-product]')];
const menuState = { category: 'todos', search: '', favoritesOnly: false };
function updateProducts() {
  let count = 0;
  for (const card of products) {
    const matches = menuState.category === 'todos' || card.dataset.product === menuState.category;
    card.hidden = !matches;
    if (matches) count++;
  }
  const status = document.querySelector('#menu-status');
  if (status) status.textContent = count ? count + (count === 1 ? ' opção encontrada' : ' opções encontradas') : 'Nenhuma opção encontrada. Ajuste os filtros.';
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  menuState.category = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  updateProducts();
}));
