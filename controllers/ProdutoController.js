const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

module.exports = {
    async listarProdutos(req,res){
        try {
            const produtos = await prisma.produto.findMany();
            res.status(200).json(produtos);

        }catch(error){
            res.status(500).json({ error: "Erro ao listar os produtos"})
        }
    },

    async buscaProduto(req,res){
        try {
            const {id} = req.params;
            const produto = await prisma.produto.findUnique({
                where: { id: Number(id) }
            });
            if (!produto){
                return res.status(404).json( 
                    {
                        error: "Produto não encontrado"}
                    );
            }
            res.status(200).json(produto)

        }catch(error){
            res.status(500).json({ error: "Erro de acesso aos dados do produto" });
      
        }
    },

    async criarProdutos(req,res){
        try {
            const {
                descricao, quantidade, valor, proprietario_ID  
            } = req.body;

            const novoProduto = await prisma.produto.create({
                data: {
                    descricao, quantidade, valor, proprietario_ID
            }})

            res.status(201).json(novoProduto);

        }catch(error){
            res.status(500).json({ error: "Erro ao criar o produto" });

        }
    },

    async atualizarProduto(req,res){
        try{
            const { id } = req.params;
            const { descricao, quantidade, valor, proprietario_ID } = req.body;
            const produto = await prisma.produto.update({
                where: { id: Number(id) },
                data: { 
                    descricao, quantidade, valor, proprietario_ID
                }
            })
            res.status(200).json({ message: "Atualização realizada com sucesso" });

        }catch(error){
            res.status(500).json({ error: "Erro ao atualizar o produto" });
        }
    },

    async deletarProduto(req,res){
        try {
            //const id = req.params.id;
            const { id } = req.params;
            await prisma.produto.delete(
                {
                    where: { id: Number(id) }
                }
            )
            res.status(204).json({ message: "Produto removido com sucesso." } )

        }catch(error){
            res.status(500).json({ error: "Erro ao remover o produto" });
        }
    },

    async maiorValor(req,res){
        try {
            const maior = await prisma.produto.findFirst({
                orderBy: { valor: 'desc', },
            })

            res.status(200).json(maior);
        }catch(error){
            res.status(500).json({ error: "Erro ao encontrar o produto de maior valor" });
        }
    },
    
    async maiorQuant(req,res){
        try {
            const maior = await prisma.produto.findFirst({
                orderBy: { quantidade: 'desc', },
            })

            res.status(200).json(maior);
        }catch(error){
            res.status(500).json({ error: "Erro ao encontrar o produto de maior quantidade" });
        }
    },
    
    async maiorValorTotal(req,res){
        try {
            const listaProdutos = await prisma.produto.findMany({
                select: {
                    id: true,
                    valor: true,
                    quantidade: true,
                },
            })
            
            let haha = [];

            listaProdutos.forEach((i, index, arr) => {
                haha.push({ id: i.id, valorTotal: i.quantidade * i.valor});
            })

            let maior = 0;
            let idDoMaior = 0;

            for (let i = 1; i < haha.length; i++) {
                if (haha[i].valorTotal > maior) {
                    maior = haha[i].valorTotal;
                    idDoMaior = haha[i].id;
                }
            }

            console.log(idDoMaior);

            const produto = await prisma.produto.findUnique({
                where: {
                    id: idDoMaior,
                },
            })

            res.status(200).json(produto)
        }catch(error){
            res.status(500).json({ error: "Erro ao encontrar o produto de maior quantidade" });
        }
    }
    
};