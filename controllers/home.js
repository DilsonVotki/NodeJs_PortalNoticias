module.exports.index = function(app, req, res) {

    var connection = app.config.bdConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connection)

    noticiasModel.getCincoUltimasNoticias(function(error, result){
        res.render('home/index', {noticias: result});
    })
}