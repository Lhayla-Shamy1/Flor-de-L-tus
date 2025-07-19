import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  child,
  get,
  getDatabase,
  ref,
  remove,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

// Config Firebase
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

// Campos
const cpfCliente = document.getElementById("cpfCliente");
const emailCliente = document.getElementById("emailCliente");
const telefoneCliente = document.getElementById("telefoneCliente");

const cpfBusca = document.getElementById("cpfBusca");
const emailEncontrado = document.getElementById("emailEncontrado");
const telefoneEncontrado = document.getElementById("telefoneEncontrado");

const formCadastro = document.getElementById("formCadastro");
const formBuscarAtualizar = document.getElementById("formBuscarAtualizar");

// Flag para controlar se cliente foi localizado
let clienteLocalizado = false;

// Função para ativar/desativar campos email e telefone da busca
function setCamposBuscaHabilitados(valor) {
  emailEncontrado.readOnly = !valor;
  telefoneEncontrado.readOnly = !valor;
  emailEncontrado.disabled = !valor;
  telefoneEncontrado.disabled = !valor;
}

// Ao alterar o cpfBusca, limpa e bloqueia campos de email e telefone
cpfBusca.addEventListener("input", () => {
  emailEncontrado.value = "";
  telefoneEncontrado.value = "";
  setCamposBuscaHabilitados(false);
  clienteLocalizado = false;
});

// Cadastrar cliente
function cadastrar() {
  if (!cpfCliente.value || !emailCliente.value || !telefoneCliente.value) {
    alert("Preencha todos os campos para cadastrar.");
    return;
  }
  set(ref(db, "Clientes/" + cpfCliente.value), {
    cpf: cpfCliente.value,
    email: emailCliente.value,
    telefone: telefoneCliente.value,
  })
    .then(() => {
      alert("Cliente cadastrado com sucesso!");
      cpfCliente.value = "";
      emailCliente.value = "";
      telefoneCliente.value = "";
    })
    .catch((e) => {
      console.error(e);
      alert("Erro ao cadastrar cliente.");
    });
}

// Buscar cliente
function buscar() {
  if (!cpfBusca.value) {
    alert("Por favor, informe o CPF para busca.");
    return;
  }

  get(child(ref(db), "Clientes/" + cpfBusca.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        emailEncontrado.value = data.email;
        telefoneEncontrado.value = data.telefone;
        setCamposBuscaHabilitados(true);
        clienteLocalizado = true;
        alert("Cliente localizado!");
      } else {
        emailEncontrado.value = "";
        telefoneEncontrado.value = "";
        setCamposBuscaHabilitados(false);
        clienteLocalizado = false;
        alert("Cliente não encontrado.");
      }
    })
    .catch((e) => {
      console.error(e);
      alert("Erro na busca.");
      clienteLocalizado = false;
      setCamposBuscaHabilitados(false);
    });
}

// Atualizar cliente
function atualizar() {
  if (!clienteLocalizado) {
    alert("Nenhum cliente localizado para atualizar.");
    return;
  }
  if (!emailEncontrado.value || !telefoneEncontrado.value) {
    alert("Preencha os dados do cliente para atualizar.");
    return;
  }

  update(ref(db, "Clientes/" + cpfBusca.value), {
    email: emailEncontrado.value,
    telefone: telefoneEncontrado.value,
  })
    .then(() => {
      alert("Cliente atualizado com sucesso!");
    })
    .catch((e) => {
      console.error(e);
      alert("Erro ao atualizar cliente.");
    });
}

// Deletar cliente
function deletar() {
  if (!clienteLocalizado) {
    alert("Nenhum cliente localizado para excluir.");
    return;
  }

  remove(ref(db, "Clientes/" + cpfBusca.value))
    .then(() => {
      cpfBusca.value = "";
      emailEncontrado.value = "";
      telefoneEncontrado.value = "";
      setCamposBuscaHabilitados(false);
      clienteLocalizado = false;
      alert("Cliente excluído com sucesso!");
    })
    .catch((e) => {
      console.error(e);
      alert("Erro ao excluir cliente.");
    });
}

// Eventos submit
formCadastro.addEventListener("submit", (event) => {
  event.preventDefault();
  cadastrar();
});

formBuscarAtualizar.addEventListener("submit", (event) => {
  event.preventDefault();

  const clickedButton = event.submitter.id;

  switch (clickedButton) {
    case "buscarCliente":
      buscar();
      break;
    case "atualizarCliente":
      atualizar();
      break;
    case "deletarCliente":
      deletar();
      break;
  }
});
