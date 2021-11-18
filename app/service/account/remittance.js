const send = (req, res) => {
    try {
        const accountNumber = req.params.accountNumber;
        res.status(200).json(accountNumber);
    } catch (e) {
        console.log(e);
        res.status(400).json({msg : e});
    }
}

module.exports = send;