exports.renderClinicPage = async(req, res) => {

    res.render('Services/clinic', { layout: 'layouts/sub' })
}

exports.renderOutpatientPage = async(req, res) => {

    res.render('Services/outpatient', { layout: 'layouts/sub' })
}