const express = require('express')
const proprietarioController = require('../controllers/proprietario')

const router = express.Router()

router.get('/proprietarios',proprietarioController.listarProprietarios)

// router.get('/funcionario/:id',FuncionarioController.buscaFuncionario)
// router.post('/funcionario',FuncionarioController.criarFuncionarios)
// router.delete('/funcionario/:id', FuncionarioController.deletarFuncionario)
// router.put('/funcionario/:id',FuncionarioController.atualizarFuncionario)

module.exports = router

