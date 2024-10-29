const getUser = (req,res) => {
    res.status(200).json({message:"get-users"});
}

export {
    getUser,
}