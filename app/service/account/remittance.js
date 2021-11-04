const send = (req, res) => {
    const accountNumber = req.params.accountNumber;
    res.status(200).json(accountNumber);
}

module.exports = send;