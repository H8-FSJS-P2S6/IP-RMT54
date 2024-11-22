class Controller {
    static welcomePage(req, res){
        res.json({ message: 'Bekasi Slayer'})
    }
}

module.exports = Controller