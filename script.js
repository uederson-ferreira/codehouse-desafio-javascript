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
