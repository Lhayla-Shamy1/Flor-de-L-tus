$(document).ready(function() {
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop+ section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })
});

// Função para exibir os produtos
function exibirProdutos(produtosFiltrados) {
    const section = document.getElementById('resultados-pesquisa');
    section.innerHTML = '';  // Limpa os resultados anteriores

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.gap = '20px';
    container.style.justifyContent = 'center';

    produtosFiltrados.forEach(produto => {
        const div = document.createElement('div');
        div.classList.add('dish');
        div.innerHTML = `
            <div class="dish-heart">
                <i class="fa-solid fa-heart"></i>
            </div>

            <img src="${produto.imagem}" class="dish-image" alt="${produto.nome}">

            <h3 class="dish-title">${produto.nome}</h3>

            <span class="dish-description">${produto.descricao}</span>

            <div class="dish-rate">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <span>(500+)</span>
            </div>

            <div class="dish-price">
                <h4>R$20,00</h4>
                <a href="${produto.link}" class="btn-default">
                    <i class="fa-solid fa-basket-shopping"></i>
                </a>
            </div>
        `;
        container.appendChild(div);
    });

    section.appendChild(container);
}



// Função de pesquisa
function pesquisar() {
    let section = document.getElementById('resultados-pesquisa');
    let campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase();

    if (campoPesquisa == "") {
        section.innerHTML = "Nenhum texto digitado!";
        return;
    }

    let resultados = "";
    let nome = "";
    let descricao = "";

    // Filtra os produtos
    let produtosFiltrados = dados.filter(dado => {
        nome = dado.nome.toLowerCase();
        descricao = dado.descricao.toLowerCase();
        return nome.includes(campoPesquisa) || descricao.includes(campoPesquisa);
    });

    if (!produtosFiltrados.length) {
        section.innerHTML = "<p>Resultado não Encontrado</p>";
    } else {
        exibirProdutos(produtosFiltrados);
    }
}

function redirecionarPesquisa() {
    const termo = document.getElementById("campo-pesquisa").value.trim();
    if (termo === "") {
        alert("Digite algo para pesquisar!");
        return;
    }
    // Armazena o termo no localStorage
    localStorage.setItem("termoPesquisa", termo);
    window.location.href = "resultado.html";
}
