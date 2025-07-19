import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { 
  getDatabase, ref, set, child, get, update, remove 
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

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

// Elementos HTML
const codigo = document.getElementById('codigo');
const produto = document.getElementById('produto');
const categoria = document.getElementById('categoria');
const quantidade = document.getElementById('quantidade');
const valor = document.getElementById('valor');

const cadastrarProdutoBtn = document.getElementById('cadastrarProduto');
const buscarProdutoBtn = document.getElementById('buscarProduto');
const atualizarProdutoBtn = document.getElementById('atualizarProduto');
const deletarProdutoBtn = document.getElementById('deletarProduto');

// Validação dos campos cadastro
function validarCampos() {
  if (
    codigo.value.trim() === '' ||
    produto.value.trim() === '' ||
    categoria.value.trim() === '' ||
    quantidade.value.trim() === '' ||
    valor.value.trim() === ''
  ) {
    alert('Por favor, preencha todos os campos.');
    return false;
  }
  return true;
}

function limparCampos() {
  codigo.value = '';
  produto.value = '';
  categoria.value = '';
  quantidade.value = '';
  valor.value = '';
}

function validarId() {
  if (codigo.value.trim() === '') {
    alert('Por favor, preencha o código do produto.');
    return false;
  }
  return true;
}

// Função para cadastrar o produto
function cadastrarProduto() {
  if (!validarCampos()) return;

  const produtoRef = ref(db, 'Produto/' + codigo.value);

  set(produtoRef, {
    produto: produto.value,
    categoria: categoria.value,
    quantidade: quantidade.value,
    valor: valor.value
  })
    .then(() => {
      alert('Produto cadastrado com sucesso!');
      limparCampos();
    })
    .catch((error) => {
      alert('Erro ao cadastrar produto: ' + error);
      console.error(error);
    });
}

// Função para buscar produto (se quiser usar depois, mas NÃO ligado ao botão buscarProduto)
async function PesquisarProduto() {
  if (!validarId()) return;

  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, 'Produto/' + codigo.value));
    if (snapshot.exists()) {
      produto.value = snapshot.val().produto;
      categoria.value = snapshot.val().categoria;
      quantidade.value = snapshot.val().quantidade;
      valor.value = snapshot.val().valor;
      alert('Produto Localizado!');
    } else {
      alert("O produto não existe");
      limparCampos();
    }
  } catch(e) {
    alert('Algo deu errado!');
    console.log(e);
  }
}

// Função para atualizar produto
async function AtualizarProdutos() {
  if (!validarId()) return;

  const produtoRef = ref(db, 'Produto/' + codigo.value);

  try {
    const snapshot = await get(produtoRef);
    if (!snapshot.exists()) {
      alert('Produto não existe para atualizar!');
      return;
    }

    await update(produtoRef, {
      produto: produto.value,
      categoria: categoria.value,
      quantidade: quantidade.value,
      valor: valor.value
    });

    alert('Produto Atualizado!');
  } catch (e) {
    alert('Algo deu errado!');
    console.log(e);
  }
}

// Função para deletar produto
async function DeletarProdutos() {
  if (!validarId()) return;

  const produtoRef = ref(db, 'Produto/' + codigo.value);

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

// Listeners
cadastrarProdutoBtn.addEventListener('click', cadastrarProduto);

buscarProdutoBtn.addEventListener('click', () => {
  window.location.href = 'cadastro.html';
});

// Só ative se os botões existirem no seu HTML
if (atualizarProdutoBtn) atualizarProdutoBtn.addEventListener('click', AtualizarProdutos);
if (deletarProdutoBtn) deletarProdutoBtn.addEventListener('click', DeletarProdutos);
