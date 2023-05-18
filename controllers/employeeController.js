const getAllEmployees = async (req, res) => {
    throw new Error('employees not found!');
    res.status(200).json({ msg: 'employees...' });
}

module.exports = { getAllEmployees };