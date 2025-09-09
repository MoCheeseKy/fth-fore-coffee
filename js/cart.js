function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price) {
  let cart = getCart();
  let item = cart.find((p) => p.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart(cart);
  alert(`${name} sudah ditambahkan ke keranjang!`);
}

function removeFromCart(name) {
  let cart = getCart();
  let item = cart.find((p) => p.name === name);

  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cart = cart.filter((p) => p.name !== name);
    }
  }

  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cartList = document.querySelector('.order-list');
  const totalElement = document.querySelector('.checkout .button-wrapper p');
  if (!cartList) return;

  cartList.innerHTML = '';
  let total = 0;
  let cart = getCart();

  cart.forEach((item) => {
    let div = document.createElement('div');
    div.classList.add('order-item');
    div.innerHTML = `
      <div class="order-desc">
        <div class="name">${item.name} ${item.quantity}x</div>
        <div class="price">Rp${(
          item.price * item.quantity
        ).toLocaleString()}</div>
      </div>
      <button onclick="removeFromCart('${item.name}')">Hapus</button>
    `;
    cartList.appendChild(div);
    total += item.price * item.quantity;
  });

  totalElement.textContent = `Total: Rp${total.toLocaleString()}`;
}

function handleCheckout(e) {
  e.preventDefault();

  let cart = getCart();
  if (cart.length === 0) {
    alert('Kamu belum memesan apapun!');
    return;
  }

  const name = document
    .querySelector("input[placeholder='Nama Lengkap']")
    .value.trim();
  const phone = document
    .querySelector("input[placeholder='Nomor Telepon']")
    .value.trim();
  const address = document
    .querySelector("textarea[placeholder='Alamat Lengkap']")
    .value.trim();
  const note = document
    .querySelector("textarea[placeholder='Note Pesanan']")
    .value.trim();

  if (!name || !phone || !address) {
    alert('Harap lengkapi data sebelum checkout');
    return;
  }

  alert('Pesanan sudah dibuat, terimakasih!!!');
  localStorage.removeItem('cart');
  window.location.href = '/home.html';
}
