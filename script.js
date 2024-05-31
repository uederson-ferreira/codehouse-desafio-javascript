let produtosCadastrados = JSON.parse(localStorage.getItem('carrinho')) || [];
let carrinhoCompras = [];

document.getElementById('form-produto')?.addEventListener('submit', function(event) {
    event.preventDefault();
    let nome = document.getElementById('nome').value;
    let preco = parseFloat(document.getElementById('preco').value);
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let imagem = document.getElementById('imagem').files[0];

    let reader = new FileReader();
    reader.onloadend = function() {
        let produto = {
            nome: nome,
            preco: preco,
            quantidade: quantidade,
            imagem: reader.result
        };

        produtosCadastrados.push(produto);
        localStorage.setItem('carrinho', JSON.stringify(produtosCadastrados));
        renderizarProdutosCadastrados();
        document.getElementById('form-produto').reset();
    };
    reader.readAsDataURL(imagem);
});

document.getElementById('form-carrinho')?.addEventListener('submit', function(event) {
    event.preventDefault();
    let codigoProduto = parseInt(document.getElementById('codigo-produto').value);
    let quantidadeProduto = parseInt(document.getElementById('quantidade-produto').value);

    if (codigoProduto >= 1 && codigoProduto <= produtosCadastrados.length) {
        let produto = produtosCadastrados[codigoProduto - 1];
        if (quantidadeProduto <= produto.quantidade) {
            let produtoCarrinho = {
                ...produto,
                quantidade: quantidadeProduto,
                valorTotal: quantidadeProduto * produto.preco
            };
            carrinhoCompras.push(produtoCarrinho);
            renderizarCarrinho();
        } else {
            alert("Quantidade maior do que disponível em estoque.");
        }
    } else {
        alert("Código do produto inválido.");
    }
    document.getElementById('form-carrinho').reset();
});

function renderizarProdutosCadastrados() {
    let listaProdutosDiv = document.getElementById('lista-produtos');
    listaProdutosDiv.innerHTML = "<h2>Produtos Cadastrados:</h2>";
    if (produtosCadastrados.length > 0) {
        listaProdutosDiv.innerHTML += `
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Imagem</th>
                    </tr>
                </thead>
                <tbody>
                    ${produtosCadastrados.map((produto, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${produto.nome}</td>
                            <td>${produto.preco}</td>
                            <td>${produto.quantidade}</td>
                            <td><img src="${produto.imagem}" alt="${produto.nome}"></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } else {
        listaProdutosDiv.innerHTML += "<p>Nenhum produto cadastrado.</p>";
    }
}

function renderizarCarrinho() {
    let carrinhoDiv = document.getElementById('carrinho');
    let totalDiv = document.getElementById('total');
    carrinhoDiv.innerHTML = "<h2>Produtos no Carrinho:</h2>";
    if (carrinhoCompras.length > 0) {
        carrinhoDiv.innerHTML += `
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Imagem</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    ${carrinhoCompras.map((produto, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${produto.nome}</td>
                            <td>${produto.preco}</td>
                            <td>${produto.quantidade}</td>
                            <td><img src="${produto.imagem}" alt="${produto.nome}"></td>
                            <td>${(produto.preco * produto.quantidade).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        let total = carrinhoCompras.reduce((acc, produto) => acc + (produto.preco * produto.quantidade), 0);
        totalDiv.innerHTML = `<h3>Valor Total: R$ ${total.toFixed(2)}</h3>`;
    } else {
        carrinhoDiv.innerHTML += "<p>O carrinho está vazio!</p>";
        totalDiv.innerHTML = "";
    }
}

function limparCarrinho() {
    carrinhoCompras = [];
    document.getElementById('carrinho').innerHTML = "";
    document.getElementById('total').innerHTML = "";
    alert("Carrinho limpo!");
}

if (document.getElementById('lista-produtos')) {
    renderizarProdutosCadastrados();
}

if (document.getElementById('produtos-cadastrados')) {
    renderizarCarrinho();
}
