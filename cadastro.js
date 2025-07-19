import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { child, get, getDatabase, ref, remove, update } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRUxR9LKrY6aSTSkHEty5iMo3NTweh-Hw",
  authDomain: "prjeto01.firebaseapp.com",
  databaseURL: "https://prjeto01-default-rtdb.firebaseio.com",
  projectId: "prjeto01",
  storageBucket: "prjeto01.firebasestorage.app",
  messagingSenderId: "368752428391",
  appId: "1:368752428391:web:21f0d5aeb2719c2e549bc2",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const idProduto = document.getElementById('idProduto');
const dadoProduto = document.getElementById('dadoProduto');
const dadoCategoria = document.getElementById('dadoCategoria');
const dadoQuantidade = document.getElementById('dadoQuantidade');
const dadoValor = document.getElementById('dadoValor');

const buscarProduto = document.getElementById('buscarProduto');
const atualizarProduto = document.getElementById('atualizarProduto');
const deletarProduto = document.getElementById('deletarProduto');

function validarId() {
  if (idProduto.value.trim() === '') {
    alert('Por favor, preencha o código do produto.');
    return false;
  }
  return true;
}

function limparCampos() {
  idProduto.value = '';
  dadoProduto.value = '';
  dadoCategoria.value = '';
  dadoQuantidade.value = '';
  dadoValor.value = '';
}

function PesquisarProduto() {
  if (!validarId()) return;

  const dbRef = ref(db);
  get(child(dbRef, 'Produto/' + idProduto.value)).then((snapshot) => {
    if (snapshot.exists()) {
      dadoProduto.value = snapshot.val().produto;
      dadoCategoria.value = snapshot.val().categoria;
      dadoQuantidade.value = snapshot.val().quantidade;
      dadoValor.value = snapshot.val().valor;  // mantém valor puro para edição
      alert('Produto Localizado!');
    } else {
      alert("O produto não existe");
      limparCampos();
    }
  }).catch((e) => {
    alert('Algo deu errado!');
    console.log(e);
});
}

async function AtualizarProdutos() {
if (!validarId()) return;

const dbRef = ref(db);
const produtoRef = child(dbRef, 'Produto/' + idProduto.value);

try {
    const snapshot = await get(produtoRef);
    if (!snapshot.exists()) {
    alert('Produto não existe para atualizar!');
    return;
    }

    await update(produtoRef, {
    produto: dadoProduto.value,
    categoria: dadoCategoria.value,
    quantidade: dadoQuantidade.value,
    valor: dadoValor.value
    });

    alert('Produto Atualizado!');
} catch (e) {
    alert('Algo deu errado!');
    console.log(e);
}
}

async function DeletarProdutos() {
if (!validarId()) return;

const dbRef = ref(db);
const produtoRef = child(dbRef, 'Produto/' + idProduto.value);

try {
    const snapshot = await get(produtoRef);
    if (!snapshot.exists()) {
    alert('Produto não encontrado para deletar!');
    return;
    }

    await remove(produtoRef);

    limparCampos();
    alert('Produto Deletado!');
} catch (e) {
    alert('Algo deu errado!');
    console.log(e);
}
}

buscarProduto.addEventListener('click', PesquisarProduto);
atualizarProduto.addEventListener('click', AtualizarProdutos);
deletarProduto.addEventListener('click', DeletarProdutos);
