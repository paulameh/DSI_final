const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

module.exports = {
    async listarProprietarios(req,res){
        try {
            const proprietarios = await prisma.proprietario.findMany();
            res.status(200).json(proprietarios);

        }catch(error){
            res.status(500).json({ error: "Erro ao listar os proprietários"})
        }
    },

    async buscaProprietario(req,res){
        try {
            const {id} = req.params;
            const proprietario = await prisma.proprietario.findUnique({
                where: { id: Number(id) }
            });
            if (!proprietario){
                return res.status(404).json( 
                    {
                        error: "Proprietário não encontrado"}
                    );
            }
            res.status(200).json(proprietario)

        }catch(error){
            res.status(500).json({ error: "Erro de acesso aos dados do proprietário" });
        }
    },

    async buscaNomeProprietario(req,res){
        try {
            const {name} = req.query;
            console.log(name)

            const proprietario = await prisma.proprietario.findMany({
                where:{
                    nome: { contains: name }
                }
            });
            
            if (!proprietario){
                return res.status(404).json( 
                    {
                        error: "Proprietário não encontrado"}
                    );
            }

            res.status(200).json(proprietario)
        }catch(error){
            res.status(500).json({ error: "Erro de acesso aos dados do proprietário" });
        }
    },

    async criarProprietarios(req,res){
        try {
            const {
                nome, email, endereco  
            } = req.body;

            const novoProprietario = await prisma.proprietario.create({
                data: {
                    nome, email, endereco
            }})

            res.status(201).json(novoProprietario);

        }catch(error){
            res.status(500).json({ error: "Erro ao criar o proprietário" });

        }
    },

    async atualizarProprietario(req,res){
        try{
            const { id } = req.params;
            const { nome, email, endereco } = req.body;
            const proprietario = await prisma.proprietario.update({
                where: { id: Number(id) },
                data: { 
                    nome, email, endereco
                }
            })
            res.status(200).json({ message: "Atualização realizada com sucesso" });

        }catch(error){
            res.status(500).json({ error: "Erro ao atualizar o proprietário" });
        }

    },

    async deletarProprietario(req,res){
        try {
            //const id = req.params.id;
            const { id } = req.params;
            await prisma.proprietario.delete(
                {
                    where: { id: Number(id) }
                }
            )
            res.status(204).json({ message: "Proprietário removido com sucesso." } )

        }catch(error){
            res.status(500).json({ error: "Erro ao remover o proprietário" });
        }
    },

    async produtoProprietario(req,res){
        try {
            const proprietario = await prisma.proprietario.findFirst(
                {
                    include: {
                        _count: {
                            select: { produto: true, },
                        },
                    },
                    orderBy: {produto: { _count: 'desc', },},
                }
            )
            res.status(200).json(proprietario)

        }catch(error){
            res.status(500).json({ error: "Erro ao encontrar o propritário com mais produtos." });
        }
    }
    
};