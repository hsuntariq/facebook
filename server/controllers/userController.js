const registerUser = (req, res) => {
    const { f_name, l_name, m_number, email, password, DOB, gender } = req.body;
    res.json({
        f_name, l_name, m_number, email, password, DOB, gender
    })
}

const loginUser = (req, res) => {
    res.send('user has been logged in')
}

module.exports = {
    registerUser,
    loginUser
}