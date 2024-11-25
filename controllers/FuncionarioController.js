const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

module.exports = {
    async listarFuncionarios(req,res){
        try {
            const funcionarios = await prisma.funcionario.findMany();
            res.status(200).json(funcionarios);

        }catch(error){
            res.status(500).json({ error: "Erro ao listar os funcionarios"})
        }
    },

    async buscaFuncionario(req,res){
        try {
            const {id} = req.params;
            const funcionario = await prisma.funcionario.findUnique({
                where: { id: Number(id) }
            });
            if (!funcionario){
                return res.status(404).json( 
                    {
                        error: "Funcionario não encontrado"}
                    );
            }
            res.status(200).json(funcionario)

        }catch(error){
            res.status(500).json({ error: "Erro de acesso aos dados do funcionário" });
      
        }
    },

    async criarFuncionarios(req,res){
        try {
            const {
                matricula, nome, email, salario_bruto  
            } = req.body;

            const novoFuncionario = await prisma.funcionario.create({
                data: {
                    matricula, nome, email, salario_bruto
            }})

            res.status(201).json(novoFuncionario);

        }catch(error){
            res.status(500).json({ error: "Erro ao criar o funcionário" });

        }
    },

    async atualizarFuncionario(req,res){
        try{
            const { id } = req.params;
            //const matricula = req.body.matricula;
            const { matricula, nome, email, salario_bruto } = req.body;
            const funcionario = await prisma.funcionario.update({
                where: { id: Number(id) },
                data: { 
                    matricula, 
                    nome,
                    email,
                    salario_bruto
                }
            })
            res.status(200).json({ message: "Atualização realizada com sucesso" });

        }catch(error){
            res.status(500).json({ error: "Erro ao atualizar o funcionário" });
        }

    },

    async deletarFuncionario(req,res){
        try {
            //const id = req.params.id;
            const { id } = req.params;
            await prisma.funcionario.delete(

                {
                    where: { id: Number(id) }


                }


            )
            res.status(204).json({ message: "Funcionário removido com sucesso." } )

        }catch(error){
            res.status(500).json({ error: "Erro ao remover o funcionário" });
        }
    }



};