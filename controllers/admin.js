module.exports.formulario_inclusao_noticia = function (app, req, res) {
    res.render('admin/form_add_noticia', { validacao: {}, noticia: {} });
}

module.exports.noticias_salvar = function (app, req, res) {
    var noticia = req.body;

    req.assert('titulo', 'Título é obrigatório.').notEmpty();
    req.assert('resumo', 'Resumo é obrigatório.').notEmpty();
    req.assert('resumo', 'Resumo deve conter de 10 até 100 caracteres.').len(10, 100);
    req.assert('autor', 'Autor é obrigatório.').notEmpty();
    req.assert('data_noticia', 'Data é obrigatória.').notEmpty().isDate({ format: 'YYYY-MM-DD' });
    req.assert('noticia', 'Notícia é obrigatório.').notEmpty();

    var erro = req.validationErrors();

    if (erro) {
        res.render('admin/form_add_noticia', { validacao: erro, noticia: noticia });
        return;
    }

    var connection = app.config.bdConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connection);

    noticiasModel.salvarNoticia(noticia, function (error, result) {
        res.redirect('/noticias')
    });
}